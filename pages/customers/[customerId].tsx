import { useRouter } from "next/router";

function Customer() {
  const router = useRouter();
  const { customerId } = router.query;
  console.log(router.query.customerId);
  return <h1>Customer with id : {customerId}</h1>;
}

export default Customer;
