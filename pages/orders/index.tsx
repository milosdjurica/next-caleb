import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { getAllCustomers } from "../api/customers";
import { CustomerType } from "@/types";
import { useRouter } from "next/router";

const columns: GridColDef[] = [
    // !Just comment line below if don't want ID to be displayed
    {
        field: "id",
        headerName: "Order ID",
        width: 150,
    },
    {
        field: "customerId",
        headerName: "Customer ID",
        width: 150,
    },
    {
        field: "customerName",
        headerName: "Customer",
        width: 150,
        editable: true,
    },
    {
        field: "description",
        headerName: "Description",
        type: "string",
        width: 150,
        editable: true,
    },
    {
        field: "price",
        headerName: "Price",
        type: "string",
        width: 150,
        editable: true,
    },
];

export async function getStaticProps() {
    const data = await getAllCustomers();

    let orders = data
        .map((customer: CustomerType) => {
            return (
                {
                    ...customer.orders,
                    customerName: customer.name,
                    customerId: customer._id,
                } || null
            );
        })
        .flat(1)
        .filter((el) => el._id)
        .map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });

    return {
        props: {
            orders: orders,
        },
        revalidate: 60,
    };
}

export default function Orders(props: any) {
    const { customerId } = useRouter().query;
    return (
        <Container>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    filterModel={{
                        items: [
                            {
                                columnField: "customerId",
                                operatorValue: "equals",
                                value: customerId,
                            },
                        ],
                    }}
                    rows={props.orders}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    initialState={{
                        filter: {
                            filterModel: {
                                items: [
                                    {
                                        columnField: "customerId",
                                        operatorValue: "equals",
                                        value: customerId,
                                    },
                                ],
                            },
                        },
                    }}
                />
            </Box>
        </Container>
    );
}
