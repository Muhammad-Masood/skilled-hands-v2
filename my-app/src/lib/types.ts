export type Job = {
  id: string;
  userId: string;
  title: string;
  desc: string;
  location: string;
  contact: number;
  pay?: number;
  date: Date;
};

export type Proposal = {
  crafterId: string;
  jobId: string;
  proposal: string;
  date: Date;
};

export type NavbarLink = {
  name: string;
  path: string;
};

// This will be the profile of crafter
export type Crafter = {
  id: string;
  name: string;
  bio: string;
  domain: string;
  location: string;
  contact: string;
  reviews: Review[];
};

export type Review = {
  id: string;
  review: number;
}

export type Order = {
  id: string;
  crafterId: string;
  userId: string;
  jobId: string;
  status: "pending" | "completed";
  date: Date;
}