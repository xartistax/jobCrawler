"use client";
import { baseURL } from "@/config/constants";
import { User } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Props = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  startedAt: string;
  user: User;
};

export default function LogViewer({ active, setActive, user, startedAt }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const esRef = useRef<EventSource | null>(null);
  const uid = user.uid;

  useEffect(() => {
    if (!active) {
      esRef.current?.close();
      esRef.current = null;
      return;
    }
    const params = new URLSearchParams({ uid, startedAt });

    const es = new EventSource(`${baseURL}/api/crawler/logs?${params.toString()}`);

    esRef.current = es;

    es.addEventListener("done", () => {
      es.close();
      esRef.current = null;
      setActive(false);
    });

    es.onmessage = (e) => {
      if (!preRef.current) return;
      preRef.current.textContent += e.data + "\n";
      preRef.current.scrollTop = preRef.current.scrollHeight;
    };

    es.onerror = () => {
      es.close();
      esRef.current = null;
      setActive(false);
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [active]);

  return <pre ref={preRef} className="h-50 overflow-auto bg-black text-green-400 text-xs font-extralight p-3 rounded" />;
}
