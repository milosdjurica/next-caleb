import clientPromise from "@/lib/mongodb";
import { Customer } from "@/pages/customers";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

type CreateCustomerType = {
    name: string;
    industry: string;
};

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

export const createCustomer = async (
    customer: CreateCustomerType
): Promise<ObjectId | string> => {
    try {
        const mongoClient = await clientPromise;

        const newCustomer = await mongoClient
            .db()
            .collection("customers")
            .insertOne(customer);

        return newCustomer.insertedId;
    } catch (error) {
        return "Something went wrong!";
    }
};

export default async function handler(req: any, res: any) {
    try {
        if (req.method === "GET") {
            const customers = await getAllCustomers();
            res.status(200).json(customers);
        } else if (req.method === "POST") {
            if (!req.body.name || !req.body.industry) {
                return res.status(400).json("Name and industry are required!");
            }

            const customer: CreateCustomerType = {
                name: req.body.name,
                industry: req.body.industry,
            };

            const createdId = await createCustomer(customer);
            res.revalidate("/customers");
            res.revalidate(`/customers/${createdId}`);
            res.status(201).json(createdId);
        }
    } catch (error) {
        console.log("BACK ERR");
    }
}
