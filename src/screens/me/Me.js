import {Grid, LinearProgress} from "@mui/material";
import OneWallet from "../../components/OneWallet";
import AddWallet from "./components/AddWallet";
import {useNavigate} from "react-router-dom";
import {AXIOS_METHOD, doApiCall, useApi} from "../../hooks/useApi";
import {MODALS, useModals} from "../../hooks/useModal";

export default function MePage() {
    const navigate = useNavigate();
    const {showModal} = useModals();
    const [wallets, loading, error, refreshWallets] = useApi(AXIOS_METHOD.GET, `/wallets`);

    function onDelete(id) {
        showModal(MODALS.CONFIRM, {
            message: "Are you sure you want to delete this wallet?",
            onConfirmed: () => {
                doApiCall(AXIOS_METHOD.DELETE, `/wallet/${id}`, (_unusedDeletedItem) => {
                    refreshWallets();
                }, (message) => {
                    showModal(MODALS.ERROR, {message});
                }, {id});
            }
        })
    }

    if (loading === false && error !== false) {
        navigate('/Error');
        return null;
    }

    return ( <>
        <Grid container spacing={2}>
            <AddWallet/>
            {loading === false && wallets && wallets.map(item => {
                return (<OneWallet key={item?.id} id={item?.id}
                                       description={item?.description}
                                       name={item?.name}
                                       onDelete={() => onDelete(item?.id)}
                />);
            })}
        </Grid>
        {loading === true && <Grid item xs={12}>
            <LinearProgress/>
        </Grid>}
    </>)
}
