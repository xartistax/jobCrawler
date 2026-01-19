import { Timestamp } from "firebase/firestore";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  company: string;
  createdAt: Timestamp;
  location?: [{ city?: string; country?: string }];
  url: string;
  source?: string;
};

export type SavedJob = {
  id: string;
  jobId: string;
  userId: string;
  status: "OPEN" | "INTERVIEW" | "REJECTED" | "DONE";
  notes: string;
};

export type SavedJobWithDetails = SavedJob & {
  job: Job;
};

export type NavItem = { label: string; href: string; description?: string };
export type Links = { label: string; href: string; description?: string };

export type FrontIconNavItem = {
  label: string;
  href: string;
  icon: React.FC<IconSvgProps>;
};
