import { collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const jobsRef = collection(db, "jobs");
export const savedJobsRef = collection(db, "savedJobs");
