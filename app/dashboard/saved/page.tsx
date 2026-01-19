"use client";

import { useSavedJobs } from "@/app/hook/useSavedJobs";
import AuthGuard from "@/components/auth-guard";
import JobCard from "@/components/job-card";
import { Job } from "@/types";
import { Spacer } from "@heroui/spacer";
import { useState } from "react";

function SavedJobsDashboard() {
  const { savedJobs, loading } = useSavedJobs();

  if (loading) return <p className="p-6 text-gray-500 text-xs">Gespeicherte Jobs werden geladen…</p>;

  if (savedJobs.length === 0) return <p className="p-6 text-gray-500 text-xs">Keine gespeicherten Jobs.</p>;

  return (
    <section className="flex flex-col gap-4 py-8 md:py-10">
      <h1 className="text-xl font-bold pb-5">Favourites</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {savedJobs.map((savedJob) => (
          <div key={savedJob.id} className="flex">
            <JobCard job={savedJob.job} allowUnsave />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SavedJobsPageWrapper() {
  return (
    <AuthGuard>
      <SavedJobsDashboard />
    </AuthGuard>
  );
}
