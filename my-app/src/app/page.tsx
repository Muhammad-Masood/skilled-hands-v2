import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      Landing Page
      <Button onClick={() => console.log("Submitted")}>Submit</Button>
    </div>
  );
}
