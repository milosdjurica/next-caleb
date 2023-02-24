import { ObjectId } from "mongodb";

export type CustomerType = {
    _id: ObjectId;
    name: string;
    industry: string;
    orders: OrderType[];
};

export type OrderType = {
    _id: ObjectId;
    description: string;
    price: number;
};
