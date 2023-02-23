import clientPromise from "@/lib/mongodb";
import { Customer } from "@/pages/customers";
import { NextApiRequest, NextApiResponse } from "next";

export const getAllCustomers = async (): Promise<Customer[]> => {
    try {
        const mongoClient = await clientPromise;

        const customers = await mongoClient
            .db()
            .collection("customers")
            .find()
            .toArray();
        return JSON.parse(JSON.stringify(customers)) as Customer[];
    } catch (error) {
        return [];
    }
};

export default async (
    req: NextApiRequest,
    res: NextApiResponse<Customer[]>
) => {
    const customers = await getAllCustomers();
    res.status(200).json(customers);
};
