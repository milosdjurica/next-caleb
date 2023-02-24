import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person2";
import Button from "@mui/material/Button";
import { Customer } from "@/pages/customers";

// !props.customer destructured
function CustomerComponent({ customer }: { customer: Customer }) {
    return (
        <div style={{ marginBottom: 50 }}>
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
        </div>
    );
}
export default CustomerComponent;
