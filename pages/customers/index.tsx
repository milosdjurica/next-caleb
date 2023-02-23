import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { InferGetStaticPropsType } from "next";

export type Customer = {
    _id: ObjectId;
    name: string;
    industry: string;
};

export async function getStaticProps(context: any) {
    try {
        const mongoClient = await clientPromise;

        const data = await mongoClient
            .db()
            .collection("customers")
            .find({})
            .toArray();

        return {
            props: {
                customers: JSON.parse(JSON.stringify(data)),
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
            <h1> ALL CUSTOMERS </h1>
            {customers.map((customer: Customer) => {
                return (
                    <div key={customer["_id"].toString()}>
                        <p>{customer["_id"].toString()}</p>
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
