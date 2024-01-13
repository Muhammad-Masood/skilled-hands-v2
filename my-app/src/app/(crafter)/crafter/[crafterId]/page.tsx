
const page = ({params}:{params:{crafterId:string}}) => {
  const {crafterId} = params;

    return (
    <div>Crafter Id {crafterId}</div>
  )
}

export default page