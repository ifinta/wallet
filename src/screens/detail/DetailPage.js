import {Grid, Typography} from "@mui/material";
import UserList from './components/UserList'
import {useNavigate, useParams} from "react-router-dom";
import {AXIOS_METHOD, useApi} from "../../hooks/useApi";
import LoadingBlock from "../../components/LoadingBlock";

function formatDate(dateString) {
    return new Date(dateString).toUTCString();
}

export default function DetailPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [wallet, loading, error, refreshWallet] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);

    if (loading === false && error !== false) {
        navigate('/404');
        return null;
    }

    if (loading === true && wallet === false) {
        return <LoadingBlock/>;
    }

    return (<Grid container spacing={2}>
        <br/>
        <Grid item xs={10}>
            <Typography variant={"h4"}>{wallet?.name}</Typography>
            <Typography variant={"h6"}>{formatDate(wallet?.created_at)}</Typography>
        </Grid>
        <Grid item xs={2}>
            <UserList users={[wallet?.created_by] || []}/>
        </Grid>
        <Grid item xs={12}>
            {wallet?.description.split("\n").map(line => {
                return <Typography variant={"body1"}>{line}</Typography>
            })}
        </Grid>
        <Grid item xs={12}>
            <Typography variant={"button"}>Access granted:</Typography>{" "}
            <UserList users={wallet?.access || []}/>
        </Grid>
    </Grid>)
}
