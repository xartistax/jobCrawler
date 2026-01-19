"use client";

import { useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center md:py-10">
        <Spinner color="default" />
      </section>
    );
  return <>{children}</>;
}
