import { ObjectId } from "mongodb";
import { InferGetStaticPropsType } from "next";
import { getAllCustomers } from "../api/customers";

export type Customer = {
    _id: ObjectId;
    name: string;
    industry: string;
};

export async function getStaticProps(context: any) {
    try {
        const customers = await getAllCustomers();

        return {
            props: {
                customers: customers,
            },
            // how often the page is reloaded (30sec)
            revalidate: 30,
        };
    } catch (error) {
        // empty customers array if there was some error
        return { props: { customers: [] } };
    }
}

function Customers({
    customers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            {customers.length > 0 ? (
                <h1> ALL CUSTOMERS </h1>
            ) : (
                <h1>No customers right now, your business is not glowing!</h1>
            )}
            {customers.map((customer: Customer) => {
                return (
                    <div key={customer._id.toString()}>
                        <p>{customer._id.toString()}</p>
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
