export type Job = {
  id: string;
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
}

// Crafter Profile
export type Profile = {
    id: string;
    name: string;
    bio: string;
    domain: string;
