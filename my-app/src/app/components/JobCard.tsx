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
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactElement, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { proposalFormSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import toast from "react-hot-toast";

export function JobCard({
  jobData,
  variant,
}: {
  jobData: Job;
  variant: "small" | "large";
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [proposalSent, setProposalSent] = useState(false);
  const router = useRouter();
  const { title, desc, location, pay } = jobData;

  const handleJobApply = async () => {
    const response = await axios.get(`/api/crafter/verify`);
    if (response.data.userId === null) {
      // land user on crafter registration page
      console.log("Register as a crafter");
      router.push("/crafter/profile");
      
    } else {
      // proceed with the apply process
      setIsDialogOpen(true);
      console.log("You are crafter already!");
    }
  };

  const proposalForm = useForm<z.infer<typeof proposalFormSchema>>({
    resolver: zodResolver(proposalFormSchema),
  });

  const submitProposal = async (values: z.infer<typeof proposalFormSchema>) => {
    console.log(values.proposal);
    const response = await axios.post('/api/crafter/proposal', values.proposal);
    if(response.status === 200) {
      toast.success("Proposal sent successfully.");
      toast.dismiss();
    } else {
      toast.error("Error sending proposal.");
    }
  };

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
                {desc}
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
        <Card className="w-[350px] bg-opacity-50 bg-sky-100 shadow-2xl duration-200">
          <CardHeader>
            <CardTitle className="">{title}</CardTitle>
            <CardDescription className="">{desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="">{location}</p>
            <p>Pay: {pay}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleJobApply}>Apply</Button>
          </CardFooter>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild />
        <DialogContent className="sm:max-w-[425px]">
          <Form {...proposalForm}>
            <form onSubmit={proposalForm.handleSubmit(submitProposal)}>
              <DialogHeader>
                <DialogTitle>Apply For Job</DialogTitle>
                <DialogDescription>
                  Fill the below form to send your proposal for this job.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid w-full gap-3">
                  <Label htmlFor="message-2">Your Proposal</Label>
                  <FormField
                    control={proposalForm.control}
                    name="proposal"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your proposal"
                            id="message-2"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <p className="text-sm text-muted-foreground">
                    Your proposal will be sent to the client.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={()=>{
                  setIsDialogOpen(false);
                  toast.loading("Sending proposal...");
                }
                }>Send proposal</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
