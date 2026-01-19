import { Job } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";
import JobCard from "./job-card";

type Props = {
  jobs: Job[];
  fetchMore: () => void;
  hasMore: boolean;
};

export default function InfiniteJobScroll({ jobs, fetchMore, hasMore }: Props) {
  return (
    <InfiniteScroll
      dataLength={jobs.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={<p className="pt-12 transition-colors-opacity text-center  text-xs text-gray-500 opacity-80">Lädt Jobs</p>}
      endMessage={
        <>
          <p className="pt-12 transition-colors-opacity text-center  text-xs text-gray-500 opacity-80">
            <b> {jobs.length} Jobs geladen - Keine weiteren Jobs gefunden.</b>
          </p>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {jobs.map((job) => (
          <div className="flex" key={job.id}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
