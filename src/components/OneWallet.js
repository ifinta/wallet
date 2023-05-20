import {Button, Card, CardActions, CardContent, Grid, IconButton, Typography} from "@mui/material";
import {Delete} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";

export default function OneWallet({id, name, description, onDelete}) {
    const navigate = useNavigate();

    return (<Grid item xs={12} md={4} lg={3}>
        <Card>
            <CardContent>
                <Typography variant={"h4"}>
                    {name}
                </Typography>
                <Typography variant={"body1"}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant={"outlined"} fullWidth onClick={() => {
                    navigate(`/wallet/${id}`);
                }}>Details</Button>
                {onDelete && <IconButton onClick={onDelete}>
                    <Delete/>
                </IconButton>}
            </CardActions>
        </Card>
    </Grid>);
}
