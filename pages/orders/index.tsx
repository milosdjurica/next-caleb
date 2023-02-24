import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { getAllCustomers } from "../api/customers";
import { CustomerType } from "@/types";

const columns: GridColDef[] = [
    // !Just comment line below if don't want ID to be displayed
    { field: "id", headerName: "ID", width: 90 },
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

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export async function getStaticProps() {
    const data = await getAllCustomers();

    let orders = data
        .map((customer: CustomerType) => {
            return { ...customer.orders, customerName: customer.name } || null;
        })
        .flat(1)
        .filter((el) => el._id)
        .map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });

    console.log(orders);
    return {
        props: {
            orders: orders,
        },
        revalidate: 60,
    };
}

export default function Orders(props: any) {
    // console.log(props);
    return (
        <Container>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={props.orders}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </Container>
    );
}
