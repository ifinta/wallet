import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function NewTx({id}) {
    const navigate = useNavigate();
    return (<Grid item xs={12}>
        <Button variant={"outlined"} fullWidth onClick={() => {
            navigate(`/newtx/wallet/${id}`);
        }}>Add new transaction</Button>
    </Grid>);
}
