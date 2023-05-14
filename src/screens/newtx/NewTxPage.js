import {Grid, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import SubmitButton from "../../components/SubmitButton";
import {AXIOS_METHOD, doApiCall} from "../../hooks/useApi";
import {useNavigate, useParams} from "react-router-dom";

function validateTitle(title) {
    if (title === '' || title === undefined){
        return 'There should be a title!';
    }
    if (title.length > 80){
        return 'Maximum length of the title should be 80 characters!';
    }
}

function validateAmount(amount){
    if (amount === "" ){
        return 'Transaction needs an amount!';
    }
}

export default function NewTxPage() {
    const {id} = useParams();
    const navigate = useNavigate()
    return (<>
        <Typography variant={"h4"}>Add new transaction</Typography>
        <br/>
        <Formik initialValues={{}} onSubmit={(value, {setFieldError, setSubmitting}) => {
            setSubmitting(true);
            doApiCall(AXIOS_METHOD.PUT, '/transactions', (_unusedNewWallet) => {
                setSubmitting(false);
                navigate(`/wallet/${id}`);
            }, (apiError) => {
                setFieldError('title', apiError);
                setSubmitting(false);
            }, {
		wallet_id: id,
		...value
	       });
        }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="title" label="Title" type="text" fullWidth
                        validate={validateTitle}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="amount" label="Amount" type="text" validate={validateAmount}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={SubmitButton} label={"Add transaction"}/>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    </>)
}
