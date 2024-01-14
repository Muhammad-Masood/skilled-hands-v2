import CrafterData from "@/app/components/crafter/CrafterData";

const page = ({params}:{params:{crafterId:string}}) => {
  const {crafterId} = params;
  //const profile =
  // post
  // review
  
  const crafterDataProps = {
  //   profile: 
  //   post:
  // reviews
  }
    return (
    <div>
      <CrafterData crafterData={crafterDataProps}/>
    </div>
  )
}

export default page