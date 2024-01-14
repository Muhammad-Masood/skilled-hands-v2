import { Job, Proposal } from "@/lib/types";
import React, { useEffect, useRef, useState } from "react";
import { JobCard } from "./JobCard";

const DisplayJobs = async ({ jobsData }: { jobsData: Job[] }) => {
  return (
    <div className="space-y-6">
      <p className="pl-3 text-3xl">Available Jobs</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-6">
        {jobsData.length > 0 ? (
          jobsData.map((job) => (
            <JobCard props={{job, variant: "small"}} key={job.id}/>
          ))
        ) : (
          <p>No Jobs Available</p>
        )}
      </div>
    </div>
  );
};

export default DisplayJobs;
