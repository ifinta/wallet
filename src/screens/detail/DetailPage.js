import {Button, Grid, Typography, LinearProgress} from "@mui/material";
import UserList from './components/UserList'
import NewTx from "./components/NewTx";
import {useNavigate, useParams} from "react-router-dom";
import {AXIOS_METHOD, doApiCall, useApi} from "../../hooks/useApi";
import LoadingBlock from "../../components/LoadingBlock";
import OneTx, {formatDate} from "../../components/OneTx";
import useTxs from "../../hooks/useTxs";
import {MODALS, useModals} from "../../hooks/useModal";

export default function DetailPage() {
    const {id} = useParams();
    const {showModal} = useModals();
    const navigate = useNavigate();
    const [wallet, loading, error, refreshWallet] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);
    const [txs, loadingTxs, errorTxs, onMore, hasMore, resetTxList] = useTxs(`${id}`, 4);

    function onDelete(idTxs) {
        showModal(MODALS.CONFIRM, {
            message: "Are you sure you want to delete this transaction?",
            onConfirmed: () => {
                doApiCall(AXIOS_METHOD.DELETE, `/transaction/${idTxs}`, (_unusedDeletedItem) => {
                    resetTxList();
                    refreshWallet();
                }, (message) => {
                    showModal(MODALS.ERROR, {message});
                }, {idTxs});
            }
        })
    }

    if (loading === false && error !== false) {
        navigate('/404');
        return null;
    }

    if (loadingTxs === false && errorTxs !== false) {
        navigate('/Error');
        return null;
    }

    if (loading === true && wallet === false) {
        return <LoadingBlock/>;
    }

    return (<>
     <Grid container spacing={2}>
        <br/>
        <Grid item xs={10}>
            <Typography variant={"h4"}>{wallet?.name}</Typography>
            <Typography variant={"h6"}>{formatDate(wallet?.created_at)}</Typography>
            <Typography variant={"h4"}>Balance: {wallet?.balance}</Typography>
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
     </Grid>
     <br/>
     <NewTx id={id}/>
     <br/>
     <Grid container spacing={2}>
        {txs && txs.map(item => {
            return (<OneTx key={item?.id} id={item?.id}
                                   created_at={item?.created_at}
                                   created_by_name={item?.created_by.name}
                                   title={item?.title}
                                   amount={item?.amount}
                                   onDelete={() => onDelete(item?.id)}
          />);
        })}
        {loadingTxs === true && <Grid item xs={12}>
            <LinearProgress/>
        </Grid>}
        <Grid item xs={12}>
            {hasMore && !loadingTxs && <Button onClick={onMore} fullWidth>Load more</Button>}
        </Grid>
    </Grid>
    </>)
}
