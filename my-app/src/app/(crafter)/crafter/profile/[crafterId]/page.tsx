import CrafterData from "@/app/components/crafter/CrafterData";
import axios from "axios";

const page = async ({ params }: { params: { crafterId: string } }) => {
  const { crafterId } = params;
  //showing
  const profile = (
    await axios.get(
      `${process.env.PORT_URL}/api/crafter/profile?id=${crafterId}`
    )
  ).data;
  //showing post
  const posts = (
    await axios.get(`${process.env.PORT_URL}/api/crafter/post?id=${crafterId}`)
  ).data;

  return (
    <div>
      {
        profile? <CrafterData props={{profile}}/> : <p className="text-center font-medium text-2xl">Profile Not Available</p>
      }
    </div>
  );
};

export default page;
