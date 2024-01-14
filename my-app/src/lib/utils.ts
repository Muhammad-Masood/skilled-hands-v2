import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NavbarLink } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const crafterNavbarLinks: NavbarLink[] = [
  {
    name: "Profile",
    path: "/crafter/profile",
  },
  {
    name: "You",
    path: "/crafter/profile",
  }
];

export const userNavLinks: NavbarLink[] = [
  {
    name: "Post Jobs",
    path: "/jobs/create",
  },
  {
    name: "View Jobs",
    path: "/jobs",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Orders",
    path: "/orders",
  },
];
