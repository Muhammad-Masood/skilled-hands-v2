"use client"

import { JobCard } from "@/app/components/JobCard"
import { Job } from "@/lib/types"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const page = ({id}:{id: string}) => {
    const [jobData, setJobData] = useState({} as Job);
    useEffect(() => {
        const fetchJob = async () => {
            try{
                const jobData: Job = (await axios.get(`/api/user/job?id=${id}`)).data;
                setJobData(jobData);
            } catch(error:any){
                toast.error("Error fetching job ", error);
            }
        }
        fetchJob();
    }, []);
    return (
    <div>
        <JobCard variant="large" jobData={jobData}/>
    </div>
  )
}

export default page