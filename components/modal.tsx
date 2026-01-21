"use client";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { User } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "@heroui/link";

import LogViewer from "./log-viewer";

import { useUser } from "@/app/context/user";
import { useUI } from "@/app/context/scraper-modal";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

function startCrawl(setStartedAt: Dispatch<SetStateAction<string>>) {
  const ts = new Date().toISOString();

  setStartedAt(ts);
}

async function crawlJobs(user: User, startedAt: string, setActive: Dispatch<SetStateAction<boolean>>) {
  const token = await user.getIdToken();

  const uid = user.uid;

  try {
    const res = await fetch(`/api/crawler/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ uid, startedAt }),
    });

    // const text = await res.text().catch(() => "");
    // console.log("after fetch", res.status, text);

    if (!res.ok) {
      return;
    }

    setActive(true);
  } catch (e) {
    throw Error("fetch failed", e as Error);
  }
}

export default function ThemeModal({ isOpen, onOpenChange }: Props) {
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const [startedAt, setStartedAt] = useState<string>("");
  const { onOpen, onClose } = useUI();

  useEffect(() => {
    if (!startedAt) return;
    if (!user) return;

    (async () => {
      await crawlJobs(user, startedAt, setActive);
    })();
  }, [startedAt]);

  return (
    <Modal
      backdrop="blur"
      hideCloseButton={active}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      size="3xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Neue Jobs crawlen (Jobs.ch)</ModalHeader>
            <ModalBody className="text-sm">
              <p className="text-xs pb-3">
                Startet den automatischen Import aktueller Stellenangebote von Jobs.ch in die Jobübersicht. (max.{" "}
                {process.env.NEXT_PUBLIC_CLOSESPIDER_ITEMCOUNT} Jobs )
              </p>
              <LogViewer active={active} setActive={setActive} startedAt={startedAt} user={user!} />
            </ModalBody>

            <ModalFooter className="flex items-center justify-between">
              {/* Left slot (text or placeholder) */}
              <div>{!user && <p className="text-danger text-left text-xs pe-6 sm:pe-0">Um den JobCrawler zu nutzen müssen Sie eingeloggt sein</p>}</div>

              {/* Right slot (button) */}
              <div className="flex gap-2">
                {user ? (
                  <Button
                    className="text-xs"
                    color="primary"
                    isDisabled={!user || active}
                    isLoading={active}
                    size="sm"
                    onPress={() => startCrawl(setStartedAt)}
                  >
                    Start JobScraper
                  </Button>
                ) : (
                  <Button as={Link} href="/login" onPress={() => onOpenChange(false)}>
                    Anmelden
                  </Button>
                )}
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
