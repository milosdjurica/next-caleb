import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Customer } from ".";

type Props = {
    // optional because of try catch in getStaticProps
    customer?: Customer;
};

interface Params extends ParsedUrlQuery {
    customerId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const result = await axios.get("http://127.0.0.1:5000/customers/");

    // ! dont need this when doing lazy caching
    // const paths = result.data.map((customer: Customer) => {
    //     return { params: { customerId: customer._id } };
    // });

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
        const result = await axios.get<Customer>(
            `http://127.0.0.1:5000/customers/${params.customerId}`
        );
        return {
            props: {
                customer: result.data,
            },
            // check every 30 secs if customer is updated or something
            revalidate: 30,
        };
    } catch (error) {
        return {
            notFound: true,
            revalidate: 30,
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
            <h1>Customer with id : {props.customer!._id}</h1>
            <h1>Customer with name : {props.customer!.name}</h1>;
        </>
    );
};

export default Customer;
