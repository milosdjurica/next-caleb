import axios from "axios";
import { InferGetStaticPropsType } from "next";

export type Customer = {
    _id: string;
    name: string;
    industry: string;
};

type GetCustomersResponse = {
    data: Customer[];
};

export async function getStaticProps(context: any) {
    let result: any;
    try {
        result = await axios.get<GetCustomersResponse>(
            "http://127.0.0.1:5000/customers"
        );
        return {
            props: {
                customers: result.data as Customer[],
            },
            // how often the page is reloaded (60sec)
            revalidate: 30,
        };
    
    } catch (error) {
        return {props: { customers: []}}
    }

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
