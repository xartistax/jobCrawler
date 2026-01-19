"use client";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { User } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import LogViewer from "./log-viewer";

import { useUser } from "@/app/context/user";

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
                Startet den automatischen Import aktueller Stellenangebote von Jobs.ch in die Jobübersicht. (
                {process.env.NEXT_PUBLIC_CLOSESPIDER_ITEMCOUNT}{" "}
              </p>
              <LogViewer active={active} setActive={setActive} startedAt={startedAt} user={user!} />
            </ModalBody>

            <ModalFooter className="flex items-center justify-between">
              <p className="text-danger text-xs text-left">Um den JobCrawler zu nutzen müssen Sie eingeloggt sein</p>

              <div className="flex gap-2">
                <Button color="danger" isDisabled={active} variant="light" onPress={onClose}>
                  Schliessen
                </Button>
                <Button color="primary" isDisabled={!user || active} isLoading={active} onPress={() => startCrawl(setStartedAt)}>
                  Start JobScraper
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
