import {Button, Grid, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material';

export function formatDate(dateString) {
    return new Date(dateString).toUTCString();
}

export default function OneTx({id, created_at, created_by_name, title, amount, onDelete}) {

    return (<Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={3}>{formatDate(created_at)}</Grid>
                <Grid item xs={12} md={2} lg={2}>{created_by_name}</Grid>
                <Grid item xs={12} md={5} lg={6}>
                    {onDelete && <IconButton onClick={onDelete}>
                        <Delete/>
                    </IconButton>}
                    {title}
                </Grid>
                <Grid item xs={12} md={1} lg={1}>{amount}</Grid>
	    </Grid>);
}
