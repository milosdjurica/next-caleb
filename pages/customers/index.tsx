import CustomerComponent from "@/components/Customer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
    const query = useQuery(
        ["customers"],
        async () => {
            const response = await axios.get("api/customers");
            return response.data as Customer[];
        },
        {
            initialData: customers,
        }
    );

    return (
        <>
            {query.data.length > 0 ? (
                <h1> ALL CUSTOMERS </h1>
            ) : (
                <h1>No customers right now, your business is not glowing!</h1>
            )}
            {query.data.map((customer: Customer) => {
                return (
                    <CustomerComponent
                        customer={customer}
                        key={customer._id.toString()}
                    />
                );
            })}
        </>
    );
}

export default Customers;
