import DisplayJobs from "@/app/components/DisplayJobs";
import { JobCard } from "@/app/components/JobCard";
import { Job } from "@/lib/types";
import { SignIn, auth } from "@clerk/nextjs";
import axios from "axios";

export default async function page() {
  const { userId } = auth();

  return userId ? (
    <div className="pt-5 px-20">
      <DisplayJobs />
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <SignIn />
    </div>
  );
}
