import { Order } from "@/lib/types";
import { OrderCard } from "./OrderCard";

const DisplayJobs = async ({ ordersData }: { ordersData: Order[] }) => {
  return (
    <div className="space-y-8">
      <p className="text-3xl">Your Orders</p>
      <div className="grid grid-cols-3 gap-y-6">
        {ordersData.length > 0 ? (
          ordersData.map((order) => (
            <OrderCard order={order} key={order.id}/>
          ))
        ) : (
          <p className="text-3xl">You have no orders yet!</p>
        )}
      </div>
    </div>
  );
};

export default DisplayJobs;
