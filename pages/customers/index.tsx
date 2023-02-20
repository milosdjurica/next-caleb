import { InferGetStaticPropsType } from "next";

type Customer = {
    id: number;
    name: string;
    industry: string;
};

export async function getStaticProps(context: any) {
    return {
        props: {
            customers: [
                {
                    id: 1,
                    name: "Proba ime",
                    industry: "Proba industry",
                },
                {
                    id: 2,
                    name: "ime2",
                    industry: "industry2",
                },
                {
                    id: 3,
                    name: "33333333",
                    industry: "33333 industry",
                },
            ] as Customer[],
        }, // will be passed to the page component as props
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
                    <div key={customer.id}>
                        <p>{customer.id}</p>
                        <p>{customer.name}</p>
                        <p>{customer.industry}</p>
                    </div>
                );
            })}
        </>
    );
}

export default Customers;
