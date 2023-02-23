import clientPromise from "@/lib/mongodb";
import { Customer } from "@/pages/customers";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const getCustomer = async (customerId: string): Promise<Customer> => {
    const mongoClient = await clientPromise;
    const customer = (await mongoClient
        .db()
        .collection("customers")
        .findOne({ _id: new ObjectId(customerId as string) })) as Customer;

    return JSON.parse(JSON.stringify(customer));
};

export default async (
    req: NextApiRequest,
    res: NextApiResponse<Customer | string>
) => {
    try {
        const { customerId } = req.query;
        const customer = await getCustomer(customerId as string);
        if (!customer) res.status(404).json("Customer not found!");
        res.status(200).json(customer);
    } catch (error) {
        res.status(404).json("Customer not found! Check if ID is valid");
    }
};
