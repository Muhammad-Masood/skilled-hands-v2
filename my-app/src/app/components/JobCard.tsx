"use client";
import { Crafter, Job, Proposal } from "@/lib/types";
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
import { useRouter, useSearchParams } from "next/navigation";
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
import { ReactElement, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { proposalFormSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { Star } from "lucide-react";

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
  const [crafterData, setCrafterData] = useState<Crafter | undefined>(
    undefined
  );
  const [crafterAvgRating, setCrafterAvgRating] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { title, desc, location, pay } = job;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

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
    const alreadySubmitted: boolean = (
      await axios.get(`/api/crafter/proposals/${userId}`)
    ).data;
    if (!alreadySubmitted) {
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
    } else {
      toast.error("You have already submitted the proposal.");
    }
  };

  const fetchProposals = async () => {
    try{
      // proposals on this job Id
    setIsViewProposalDialogOpen(true);
    const _proposals: Proposal[] = (
      await axios.get(`/api/crafter/proposal/${job.id}`)
    ).data;
    setProposals(_proposals);
    toast.dismiss();
    } catch(error){
      toast.dismiss();
      toast.error("E");
      console.log(error);
    }
    
  };

  const hireCrafter = async () => {
    try {
      toast.loading("Placing order...");
      const orderData = {
        jobId: job.id,
        userId: userId,
        crafterId: crafterData!.id,
        status: "pending",
      };
      const postOrderResponse = await axios.post(`/api/user/order`, orderData);
      console.log(postOrderResponse);
      toast.dismiss();
      toast.success("Crafter hired successfully!");
      router.replace(`/jobs`);
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Error placing order...");
    }
  };

  const fetchAndSetCrafterData = async (crafterId: string) => {
    try {
      const _crafterData = (
        await axios.get(`/api/crafter/profile?id=${crafterId}`)
      ).data;
      console.log(_crafterData);
      setCrafterData(_crafterData);

      let avgRating = 0;
      if (_crafterData && _crafterData.reviews) {
        let revSum = 0;
        crafterData!.reviews.map((rev: number) => (revSum += rev));
        avgRating = revSum / crafterData!.reviews.length;
      }
      console.log("crafter avg rating: ", avgRating);
      setCrafterAvgRating(avgRating);
    } catch (error) {
      toast.error("Error fetching crafter data");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center space-y-5">
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
                toast.loading("Getting proposals...");
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
        {proposals
          ? proposals.map((proposal: Proposal, index: number) => (
              <DialogContent key={index}>
                <DialogHeader
                  onClick={() => {
                    router.push(
                      "?" + createQueryString("hire", proposal.crafterId)
                    );
                    fetchAndSetCrafterData(proposal.crafterId);
                  }}
                  className="cursor-pointer hover:text-gray-700"
                >
                  <DialogTitle>CrafterId {proposal.crafterId}</DialogTitle>
                  <DialogDescription>{proposal.proposal}</DialogDescription>
                </DialogHeader>
                <DialogFooter>date</DialogFooter>
              </DialogContent>
            ))
          : null}
      </Dialog>

      <Dialog
        open={searchParams.has("hire") && searchParams.get("hire") !== ""}
        onOpenChange={() => router.push("?" + createQueryString("hire", ""))}
      >
        <DialogTrigger asChild />
        {crafterData && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{crafterData.name}</DialogTitle>
              <DialogDescription className="space-y-2 pt-3">
                <div>{crafterData.domain}</div>
                <div>{crafterData.location}</div>
                <div className="flex gap-x-2">
                  Rating{" "}
                  {crafterAvgRating === 0 ? "No Rating" : crafterAvgRating}
                  <Star className="w-5 h-5" />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => router.replace(`/crafter/profile/${crafterData.id}`)}
              >
                View Profile
              </Button>
              <Button onClick={hireCrafter}>Hire</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
