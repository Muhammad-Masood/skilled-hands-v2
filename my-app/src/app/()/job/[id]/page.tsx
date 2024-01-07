"use client";

import { JobCard } from "@/app/components/JobCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Job } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = ({ params }: { params: { id: string } }) => {
  const [jobData, setJobData] = useState({} as Job);
  const [isLoading, setIsLoading] = useState(true);
  const fetchJob = async () => {
    try {
      const jobData: Job = (await axios.get(`/api/user/job?id=${params.id}`))
        .data;
      setJobData(jobData);
    } catch (error: any) {
      toast.error("Error fetching job ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);
  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <Skeleton className="w-[350px] h-[350px]" />
      ) : (
        jobData && <JobCard jobData={jobData} variant="large" />
      )}
    </div>
  );
};

export default page;
