import {Grid, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import SubmitButton from "../../components/SubmitButton";
import {AXIOS_METHOD, doApiCall} from "../../hooks/useApi";
import {useNavigate} from "react-router-dom";

function validateName(name) {
    if (name === ''){
        return 'There should be a name!';
    }
    if (name.length > 30){
        return 'Maximum length of the name should be 30 characters!';
    }
}

function validateDescription(description){
    if (description === ''){
        return 'Wallet needs description!';
    }
}

export default function NewPage() {
    const navigate = useNavigate()
    return (<>
        <Typography variant={"h4"}>Add new wallet</Typography>
        <br/>
        <Formik initialValues={{}} onSubmit={(value, {setFieldError, setSubmitting}) => {
            setSubmitting(true);
            doApiCall(AXIOS_METHOD.PUT, '/wallet', (_unusedNewWallet) => {
                setSubmitting(false);
                navigate('/');
            }, (apiError) => {
                setFieldError('name', apiError);
                setSubmitting(false);
            }, value);
        }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="name" label="Name" type="text" fullWidth
                        validate={validateName}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="description" label="Description"
                               type="text" multiline fullWidth minRows={8} validate={validateDescription}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={SubmitButton} label={"Add wallet"}/>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    </>)
}
