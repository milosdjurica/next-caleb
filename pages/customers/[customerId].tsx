import axios, { AxiosError } from "axios";
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

    const paths = result.data.map((customer: Customer) => {
        return { params: { customerId: customer._id } };
    });
    return {
        // all _id-s from database
        paths: paths,
        // if true getStatic paths are executed just on build
        fallback: true,
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
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return {
                    notFound: true,
                };
            }
        }
        return {
            props: {},
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
