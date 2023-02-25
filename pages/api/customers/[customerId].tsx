import clientPromise from "@/lib/mongodb";
import { CustomerType, OrderType } from "@/types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

type UpdateCustomerType = {
    name?: string;
    industry?: string;
    orders?: OrderType[];
};

export const getCustomer = async (
    customerId: ObjectId
): Promise<CustomerType> => {
    const mongoClient = await clientPromise;
    const customer = (await mongoClient
        .db()
        .collection("customers")
        .findOne({ _id: customerId })) as CustomerType;

    return JSON.parse(JSON.stringify(customer));
};

export const editCustomer = async (
    customerId: ObjectId,
    updatedCustomer: UpdateCustomerType
) => {
    const mongoClient = await clientPromise;
    return await mongoClient
        .db()
        .collection("customers")
        .replaceOne({ _id: customerId }, updatedCustomer);
};

export const deleteCustomer = async (customerId: ObjectId) => {
    const mongoClient = await clientPromise;
    return await mongoClient
        .db()
        .collection("customers")
        .deleteOne({ _id: customerId });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        | CustomerType
        | { modifiedCount: number }
        | { deletedCount: number }
        | { error: string }
    >
) {
    try {
        const customerId = new ObjectId(req.query.customerId! as string);
        if (req.method === "GET") {
            const customer = await getCustomer(customerId);
            if (!customer)
                return res.status(404).json({ error: "Customer not found!" });
            res.status(200).json(customer);
        } else if (req.method === "PATCH") {
            const updateResponse = await editCustomer(customerId, {
                name: req.body.name,
                industry: req.body.industry,
                orders: req.body.orders,
            });
            res.status(200).json({
                modifiedCount: updateResponse.modifiedCount,
            });
        } else if (req.method === "DELETE") {
            const data = await deleteCustomer(customerId);
            res.status(200).json({ deletedCount: data.deletedCount });
        }
    } catch (error) {
        res.status(404).json({
            error: "Server error, customer not found! Check if ID is valid",
        });
    }
}
