import { useRouter } from "next/router";

function Orders() {
  const router = useRouter();
  const { customerId } = router.query;
  console.log(router.query.customerId);
  return <h1>Orders from customer with id : {customerId}</h1>;
}

export default Orders;
