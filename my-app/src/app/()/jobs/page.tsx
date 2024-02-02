import DisplayJobs from "@/app/components/DisplayJobs";
import { JobCard } from "@/app/components/JobCard";
import { Job } from "@/lib/types";
import { SignIn, auth } from "@clerk/nextjs";
import axios from "axios";

export default async function page(request: Request) {
  console.log(request); 
  const { userId } = auth();
  
  // const jobs: Job[] = userId?(await axios.get(`${process.env.PORT_URL}/api/user/jobs`)).data:[];
  const jobs: Job[] = userId?(await axios.get(`${process.env.NEXT_PUBLIC_PORT_URL}/api/user/jobs`)).data:[];

  return userId ? (
    <div className="pt-5 px-20 ">
      <DisplayJobs jobsData={jobs} />
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <SignIn />
    </div>
  );
}
