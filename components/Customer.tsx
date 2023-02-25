import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person2";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { CustomerType } from "@/types";
import Link from "next/link";

// !props.customer destructured
// type props = {
//     customer: CustomerType;
// };

function CustomerComponent({ customer }: { customer: CustomerType }) {
    return (
        // !Grid item because it gets called under grid container
        <Grid item>
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                <Tooltip title={customer._id.toString()}>
                    <PersonIcon fontSize="small" style={{ marginRight: 5 }} />
                </Tooltip>
                {customer.name}
            </span>
            <p>{customer.industry}</p>
            <Link
                href={{
                    pathname: "/orders",
                    query: {
                        customerId: customer._id.toString(),
                    },
                }}
            >
                <Button variant="contained">View Orders</Button>
            </Link>
            <br></br>
        </Grid>
    );
}
export default CustomerComponent;
