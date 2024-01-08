"use client";

import { Job } from "@/lib/types";
import React, { useEffect, useRef, useState } from "react";
import { JobCard } from "./JobCard";
import axios from "axios";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

const DisplayJobs = () => {
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs: Job[] = (await axios.get("/api/user/jobs")).data;
        setJobsData(jobs);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error("Error fetching jobs ");
        console.log(error);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="space-y-6">
      <p>Available Jobs</p>
      <div className="grid grid-cols-3 gap-y-6">
        {isLoading ? (
          <Skeleton className="w-[350px] h-[180px]" />
        ) : jobsData && jobsData.length > 0 ? (
          jobsData.map((job) => (
            <JobCard jobData={job} key={job.id} variant="small" />
          ))
        ) : (
          !isLoading && <p>No Jobs Available</p>
        )}
      </div>
    </div>
  );
};

export default DisplayJobs;
