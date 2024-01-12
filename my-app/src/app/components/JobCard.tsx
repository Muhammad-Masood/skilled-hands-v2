"use client";
import { Job, Proposal } from "@/lib/types";
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
import { useAuth } from "@clerk/nextjs";

interface JobCardProps {
  job: Job;
  isCrafterVerified?: boolean;
  isUserVerified?: boolean;
  variant: "small" | "large";
}

export function JobCard({ props }: { props: JobCardProps }) {
  const { job, variant, isCrafterVerified, isUserVerified } = props;
  const { userId } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewProposalDialogOpen, setIsViewProposalDialogOpen] =
    useState(false);
  const [proposals, setProposals] = useState<Proposal[] | undefined>(undefined);
  // const [proposalSent, setProposalSent] = useState(false);
  const router = useRouter();
  const { title, desc, location, pay } = job;

  const handleJobApply = async () => {
    if (!isCrafterVerified) {
      toast.error("You are not a crafter yet!");
      router.push("/crafter/profile");
    } else {
      setIsDialogOpen(true);
      console.log("You are crafter already!");
    }
  };

  const proposalForm = useForm<z.infer<typeof proposalFormSchema>>({
    resolver: zodResolver(proposalFormSchema),
  });

  const submitProposal = async (values: z.infer<typeof proposalFormSchema>) => {
    toast.loading("Sending proposal...");
    const response = await axios.post("/api/crafter/proposal", {
      jobId: job.id,
      crafterId: userId,
      proposal: values.proposal,
    });
    if (response.status === 200) {
      toast.success("Proposal sent successfully.");
      toast.dismiss();
    } else {
      toast.error("Error sending proposal.");
    }
  };

  const fetchProposals = async () => {
    // proposals on this job Id
    setIsViewProposalDialogOpen(true);
    const _proposals: Proposal[] = (
      await axios.get(`/api/crafter/proposal/${job.id}`)
    ).data;
    setProposals(_proposals);
    console.log(proposals);
  };

  return (
    <div>
      {variant === "small" ? (
        <Link href={`/job/${job.id}`}>
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
          <CardFooter className="flex space-x-5">
            <Button onClick={handleJobApply}>Apply</Button>
            <Button
              onClick={() => {
                fetchProposals();
              }}
            >
              View Proposals
            </Button>
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
                <Button
                  type="submit"
                  onClick={() => {
                    setIsDialogOpen(false);
                  }}
                >
                  Send proposal
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isViewProposalDialogOpen}
        onOpenChange={() => setIsViewProposalDialogOpen(false)}
      >
        <DialogTrigger asChild />
        {proposals ? (
          proposals.map((proposal: Proposal, index: number) => (
            <DialogContent key={index}>
              <DialogHeader>
                <DialogTitle>CrafterId {proposal.crafterId}</DialogTitle>
                <DialogDescription>
                  {proposal.proposal}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>date</DialogFooter>
            </DialogContent>
          ))
        ) : null}
      </Dialog>
    </div>
  );
}
