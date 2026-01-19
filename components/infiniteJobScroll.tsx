import InfiniteScroll from "react-infinite-scroll-component";

import JobCard from "./job-card";

import { Job } from "@/types";

type Props = {
  jobs: Job[];
  fetchMore: () => void;
  hasMore: boolean;
};

export default function InfiniteJobScroll({ jobs, fetchMore, hasMore }: Props) {
  return (
    <InfiniteScroll
      dataLength={jobs.length}
      endMessage={
        <>
          <p className="pt-12 transition-colors-opacity text-center  text-xs text-gray-500 opacity-80">
            <b> {jobs.length} Jobs geladen - Keine weiteren Jobs gefunden.</b>
          </p>
        </>
      }
      hasMore={hasMore}
      loader={
        <p className="pt-12 transition-colors-opacity text-center  text-xs text-gray-500 opacity-80">
          Lädt Jobs
        </p>
      }
      next={fetchMore}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {jobs.map((job) => (
          <div key={job.id} className="flex">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
