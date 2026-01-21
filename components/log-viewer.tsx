"use client";
import { User } from "firebase/auth";
import { Dispatch, MutableRefObject, RefObject, SetStateAction, useEffect } from "react";

import { baseURL } from "@/config/constants";

type Props = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  startedAt: string;
  user: User;
  preRef: RefObject<HTMLPreElement>;
  esRef: MutableRefObject<EventSource | null>;
};

export default function LogViewer({ active, setActive, user, startedAt, preRef, esRef }: Props) {
  useEffect(() => {
    if (!user) return;
    const uid = user.uid;

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

    // es.onmessage = (e) => {
    //   if (!preRef.current) return;
    //   preRef.current.textContent += e.data + "\n";
    //   preRef.current.scrollTop = preRef.current.scrollHeight;
    // };

    es.onmessage = (e) => {
      if (!preRef.current) return;
      const line = e.data
        .replace(/(existiert bereits.*?dropped)/i, '<span class="text-red-400">$1</span>')
        .replace(/(gespeichert)/i, '<span class="text-green-400">$1</span>');

      preRef.current.innerHTML += line + "\n";
      preRef.current.scrollTop = preRef.current.scrollHeight;
    };

    es.onerror = () => {
      es.close();
      setActive(false);
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [active]);

  return <pre ref={preRef} className="h-50 overflow-auto bg-black text-foreground-500 text-xs font-extralight p-3 rounded" />;
}
