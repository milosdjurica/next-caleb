import { ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Customer } from ".";
import { getCustomer } from "../api/customers/[customerId]";

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
        const customer = await getCustomer(new ObjectId(params.customerId));

        // !this hits when ObjectId is right format but not found
        // !maybe customer is just inserted -> revalidate to check
        if (!customer) {
            return {
                notFound: true,
                revalidate: 30,
            };
        }

        return {
            props: {
                customer: customer,
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
            <h1>Name : {props.customer!.name}</h1>
            <h1>Industry : {props.customer!.industry}</h1>
        </>
    );
};

export default Customer;
