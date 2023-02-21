import axios from "axios";
import { InferGetStaticPropsType } from "next";

type Customer = {
    _id: string;
    name: string;
    industry: string;
};

export async function getStaticProps(context: any) {
    let result: any;
    try {
        result = await axios.get("http://127.0.0.1:5000/customers");
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            customers: result.data as Customer[],
        }, // will be passed to the page component as props
        revalidate: 60,
        
    };
}

function Customers({
    customers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <h1> ALL CUSTOMERS </h1>
            {customers.map((customer: Customer) => {
                return (
                    <div key={customer["_id"]}>
                        <p>{customer["_id"]}</p>
                        <p>{customer.name}</p>
                        <p>{customer.industry}</p>
                        <br></br>
                    </div>
                );
            })}
        </>
    );
}

export default Customers;
