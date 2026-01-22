"use client";

import { Card, CardHeader, CardBody, CardFooter, Link, Image, Button } from "@heroui/react";
import { query, collection, where, getDocs, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import striptags from "striptags";
import TimeAgo from "react-timeago";
import germanStrings from "react-timeago/lib/language-strings/de";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { HeartIcon } from "./icons";

import { Job } from "@/types";
import { db } from "@/lib/firebase";
import { useUser } from "@/app/context/user";

type Props = {
  job: Job;
  allowUnsave?: boolean;
  showcaseItem?: boolean;
  onRemoved?: (jobId: string) => void;
};

export default function JobCard({ job, allowUnsave, onRemoved, showcaseItem }: Props) {
  const { user } = useUser();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedDocId, setSavedDocId] = useState<string | null>(null);
  const formatter = buildFormatter(germanStrings);

  const companyLine = job.company + (job.location?.[0]?.city ? ` · ${job.location[0].city}` : null);
  const createdAtDate = job.createdAt?.toDate?.() ?? null;

  function ClientTimeAgo({ date }: { date: Date }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null; // oder skeleton / absolute date

    return <TimeAgo date={date} formatter={formatter} />;
  }

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "savedJobs"), where("jobId", "==", job.id), where("userId", "==", user.uid));

    const unsub = onSnapshot(q, (snap) => {
      const first = snap.docs[0];

      setSaved(!snap.empty);
      setSavedDocId(first ? first.id : null);
    });

    return () => unsub();
  }, [user?.uid, job.id]);

  async function handleSave() {
    if (!user) return;

    setSaving(true);

    const q = query(collection(db, "savedJobs"), where("jobId", "==", job.id), where("userId", "==", user.uid));

    const snapshot = await getDocs(q);

    // Wenn existiert:
    if (!snapshot.empty) {
      if (allowUnsave) {
        if (!savedDocId) {
          setSaving(false);

          return;
        }
        await deleteDoc(doc(db, "savedJobs", savedDocId)); // ✅ savedDocId nutzen
        setSaved(false);
        onRemoved?.(job.id); // ✅ Parent soll es aus Liste entfernen
      } else {
        setSaved(true);
      }
      setSaving(false);

      return;
    }

    // Wenn nicht existiert: nur speichern
    await addDoc(collection(db, "savedJobs"), {
      jobId: job.id,
      userId: user.uid,
      status: "OPEN",
      notes: "",
      createdAt: new Date(),
    });

    setSaved(true);
    setSaving(false);
  }

  const LinkWrapper = ({ children }: { children: React.ReactNode }) =>
    showcaseItem ? (
      <Link className="block w-full" href={`/dashboard`}>
        {children}
      </Link>
    ) : (
      <>{children}</>
    );
  const CompanyWrapper = ({ children }: { children: React.ReactNode }) =>
    !showcaseItem ? (
      <Link
        isExternal
        aria-label={job.company}
        className="text-xs font-extralight cursor-pointer line-clamp-1 hover:underline"
        href={job.url}
        title={job.company}
      >
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  return (
    <LinkWrapper>
      <Card
        className={` w-full flex flex-col justify-between ${showcaseItem && "border-1 border-default-200 opacity-30 hover:opacity-100 transition-opacity duration-300"} `}
      >
        <CardHeader className="flex gap-3">
          <Image alt="heroui logo" height={40} radius="sm" src={`https://api.dicebear.com/9.x/identicon/svg?seed=${job.company}`} width={40} />
          <div className="flex items-center justify-between gap-2 sm:gap-12 w-full min-w-0">
            <div className="flex flex-col text-left min-w-0">
              <h2 className="text-xs line-clamp-1" title={job.title}>
                {job.title}
              </h2>
              <h3 className="text-xs text-default-500 line-clamp-1" title={companyLine}>
                <CompanyWrapper>{companyLine}</CompanyWrapper>
              </h3>
            </div>

            {!showcaseItem && (
              <Button
                isIconOnly
                aria-label={saved ? "Job entfernen" : "Job speichern"}
                className="group text-danger-500 bg-transparent hover:text-danger-600"
                isDisabled={saving || (saved && !allowUnsave)}
                size="sm"
                onPress={handleSave}
              >
                <HeartIcon filled={saved} />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardBody>
          <div className="text-xs text-gray-600 font-light max-h-12 overflow-hidden line-clamp-2">{striptags(job.description).trim()}</div>
        </CardBody>

        <CardFooter>
          <p className="text-xs text-gray-600 font-extralight">{createdAtDate && <ClientTimeAgo date={createdAtDate} />}</p>
        </CardFooter>
      </Card>
    </LinkWrapper>
  );
}
