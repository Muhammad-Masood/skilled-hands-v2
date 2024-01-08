import * as z from "zod";

export const jobFormSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  desc: z.string().min(2, { message: "Description is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  // contact: z.coerce.number().min(11, { message: "Invalid contact" }),
  contact: z.string().min(11),
  pay: z.coerce.number().min(2, { message: "Pay is required" }),
});

export const proposalFormSchema = z.object({
  proposal: z.string().min(5),
})