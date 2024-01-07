"use client";
import { Job } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function JobCard({
  jobData,
  variant,
}: {
  jobData: Job;
  variant: "small" | "large";
}) {
  const { title, desc, location, pay } = jobData;
  return (
    <div>
      {variant === "small" ? (
        <Link href={`/job/${jobData.id}`}>
          <Card className="w-[350px] h-[180px] bg-opacity-50 bg-sky-100 hover:shadow-2xl duration-200">
            <CardHeader>
              <CardTitle className="text-nowrap overflow-hidden overflow-ellipsis">
                {title}
              </CardTitle>
              <CardDescription className="text-nowrap overflow-hidden overflow-ellipsis">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                aliquam laborum reiciendis laboriosam, vel eos totam?
                Reprehenderit alias voluptatum unde at explicabo porro
                accusantium consequatur, voluptas id obcaecati similique
                molestias.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-nowrap overflow-hidden overflow-ellipsis">
                {location}
              </p>
              <p>Pay: {pay}</p>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </Link>
      ) : (
        <Card className="w-[350px] h-[180px] bg-opacity-50 bg-sky-100 hover:shadow-2xl duration-200">
          <CardHeader>
            <CardTitle className="text-nowrap overflow-hidden overflow-ellipsis">
              {title}
            </CardTitle>
            <CardDescription className="text-nowrap overflow-hidden overflow-ellipsis">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              aliquam laborum reiciendis laboriosam, vel eos totam?
              Reprehenderit alias voluptatum unde at explicabo porro accusantium
              consequatur, voluptas id obcaecati similique molestias.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-nowrap overflow-hidden overflow-ellipsis">
              {location}
            </p>
            <p>Pay: {pay}</p>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      )}
    </div>
  );
}
