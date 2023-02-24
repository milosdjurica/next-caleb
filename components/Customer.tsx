import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person2";
import Button from "@mui/material/Button";
import { Customer } from "@/pages/customers";
import Grid from "@mui/material/Grid";

// !props.customer destructured
// type props = {
//     customer: Customer;
// };

function CustomerComponent({ customer }: { customer: Customer }) {
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
            <Button variant="contained">View Orders</Button>
            <br></br>
        </Grid>
    );
}
export default CustomerComponent;
