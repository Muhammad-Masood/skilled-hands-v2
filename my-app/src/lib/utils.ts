import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NavbarLink } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navbarLinks: NavbarLink[] = [
  {
    name: "Post Jobs",
    path: "",
  },
  {
    name: "View Jobs",
    path: "",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];
