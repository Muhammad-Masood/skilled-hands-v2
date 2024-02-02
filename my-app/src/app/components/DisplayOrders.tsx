import { Order } from "@/lib/types";
import { OrderCard } from "./OrderCard";
import { OrderExtend } from "../()/orders/page";

const DisplayJobs = async ({ ordersData }: { ordersData: OrderExtend[] }) => {
  return (
    ordersData!==null?(
      <div className="space-y-8">
      <p className="text-3xl pl-5">Your Orders</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-6">
        {ordersData.length > 0 ? (
          ordersData.map((order: OrderExtend) => (
            <OrderCard order={order} key={order.id}/>
          ))
        ) : (
          <p className="text-3xl font-medium">You have no orders yet!</p>
        )}
      </div>
    </div>
    ) : <p className="text-3xl font-medium">You have no orders yet!</p>
    
  );
};

export default DisplayJobs;
