"use client";
import AuthGuard from "@/components/auth-guard";
import InfiniteJobScroll from "@/components/infiniteJobScroll";
import JobCard from "@/components/job-card";
import { db } from "@/lib/firebase";
import { Job } from "@/types";
import { Spacer } from "@heroui/spacer";
import { query, collection, orderBy, getDocs, DocumentData, limit, QueryDocumentSnapshot, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";

function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const PAGE_SIZE = 12;

  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // 1) Initial load (erste Seite)
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true);

        const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"), limit(PAGE_SIZE));

        const snapshot = await getDocs(q);

        const jobsData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Job
        );

        setJobs(jobsData);

        const last = snapshot.docs[snapshot.docs.length - 1] ?? null;
        setLastDoc(last);

        // Wenn weniger als PAGE_SIZE zurückkommt, gibt’s nichts mehr
        setHasMore(snapshot.docs.length === PAGE_SIZE);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  // 2) fetchMore für InfiniteScroll
  const fetchMore = async () => {
    // Schutz gegen Doppel-Calls
    if (loadingMore || !hasMore) return;

    // Wenn noch nie geladen wurde oder keine letzte Doc vorhanden ist
    if (!lastDoc) {
      setHasMore(false);
      return;
    }

    try {
      setLoadingMore(true);

      const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(PAGE_SIZE));

      const snapshot = await getDocs(q);

      const moreJobs = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Job
      );

      setJobs((prev) => [...prev, ...moreJobs]);

      const newLast = snapshot.docs[snapshot.docs.length - 1] ?? null;
      setLastDoc(newLast);

      // Wenn diese Seite leer oder kleiner als PAGE_SIZE ist -> Ende
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500 text-xs">Lädt Jobs…</p>;
  }

  return (
    <section className="flex flex-col gap-4 py-8 md:py-10">
      <h1 className="hidden md:block text-xl font-bold pb-5">Dashboard</h1>

      {jobs.length === 0 && <p className="text-gray-500">Keine Jobs gefunden.</p>}

      <InfiniteJobScroll jobs={jobs} fetchMore={fetchMore} hasMore={hasMore} />
    </section>
  );
}

export default function DashboardWrapper() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
