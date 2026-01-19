import { useState, useEffect } from "react";
import { onSnapshot, collection, query, where, doc, getDoc, orderBy } from "firebase/firestore";

import { useUser } from "../context/user";

import { db } from "@/lib/firebase";
import { Job, SavedJob } from "@/types";

export function useSavedJobs() {
  const { user } = useUser();
  const [savedJobs, setSavedJobs] = useState<(SavedJob & { job: Job })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // wenn user weg ist: reset
    if (!user) {
      setSavedJobs([]);
      setLoading(false);

      return;
    }

    setLoading(true);

    const q = query(collection(db, "savedJobs"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));

    let cancelled = false;

    const unsub = onSnapshot(q, async (snapshot) => {
      try {
        const results: (SavedJob & { job: Job })[] = [];

        for (const docSnap of snapshot.docs) {
          const savedJobData = docSnap.data() as SavedJob;

          const jobDoc = await getDoc(doc(db, "jobs", savedJobData.jobId));

          if (jobDoc.exists()) {
            const jobData = jobDoc.data() as Job;
            const { ...jobFields } = jobData;

            results.push({
              ...savedJobData,
              id: docSnap.id, // savedJobs doc id
              job: { ...jobFields, id: jobDoc.id },
            });
          }
        }

        if (!cancelled) {
          setSavedJobs(results);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          throw Error("useSavedJobs onSnapshot error:", e);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [user?.uid]);

  return { savedJobs, loading };
}
