import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Customer } from ".";

type Props = {
    customer: Customer;
};

interface Params extends ParsedUrlQuery {
    customerId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // LAZY CACHING
        // 0 pages are cached before requested for the first time!
        paths: [],
        // !notes
        // fallback: true,
        // !blocking -> Better for SEO, worse user experience
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
    context
) => {
    // !!!! means it wont  be undefined
    const params = context.params!;

    try {
        const mongoClient = await clientPromise;

        const data = (await mongoClient
            .db()
            .collection("customers")
            .findOne({ _id: new ObjectId(params.customerId) })) as Customer;

        // !this hits when ObjectId is right format but not found
        // !maybe data is just inserted -> revalidate to check
        if (!data) {
            return {
                notFound: true,
                revalidate: 30,
            };
        }

        return {
            props: {
                customer: JSON.parse(JSON.stringify(data)),
            },
            // check every 30 secs if customer is updated/deleted
            revalidate: 30,
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

const Customer: NextPage<Props> = (props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Customer with id : {props.customer!._id.toString()}</h1>
            <h1>Customer with name : {props.customer!.name}</h1>;
        </>
    );
};

export default Customer;
