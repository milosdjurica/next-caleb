import { useRouter } from "next/router";

function Orders() {
  const router = useRouter();
  const { customerId, orderId } = router.query;
  
  return <h1>Orders with id: {orderId} from customer with id: {customerId}</h1>;
}

export default Orders;
