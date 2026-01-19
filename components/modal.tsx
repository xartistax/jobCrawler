"use client";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { useUser } from "@/app/context/user";
import { User } from "firebase/auth";
import LogViewer from "./log-viewer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { baseURL } from "@/config/constants";

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
      console.log(res);
      return;
    }

    setActive(true);
  } catch (e) {
    console.error("fetch failed", e);
  }
}

export default function ThemeModal({ isOpen, onOpenChange }: Props) {
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const [startedAt, setStartedAt] = useState<string>("");

  useEffect(() => {
    if (!startedAt) return;
    if (!user) return;

    (async () => {
      await crawlJobs(user, startedAt, setActive);
    })();
  }, [startedAt]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      backdrop="blur"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={active}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Neue Jobs crawlen (Jobs.ch)</ModalHeader>
            <ModalBody className="text-sm">
              <p className="text-xs pb-3">
                Startet den automatischen Import aktueller Stellenangebote von Jobs.ch in die Jobübersicht. ({process.env.NEXT_PUBLIC_CLOSESPIDER_ITEMCOUNT}{" "}
                Stellen maximal) <br />
              </p>
              <LogViewer active={active} setActive={setActive} startedAt={startedAt} user={user!} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} isDisabled={active}>
                Schliessen
              </Button>
              <Button isDisabled={!user || active} isLoading={active} color="primary" onPress={() => startCrawl(setStartedAt)}>
                Start JobScraper
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
