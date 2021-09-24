import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {FormControl, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import Alert from "@material-ui/lab/Alert"
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    },
    formBtn: {
        float: "right"
    }
}))
const ContactMe = () => {
    const classes = useStyles();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }
    return(
        <Container>
            <Grid container>
                <Grid children xs={6}>
                    <img src={"./images/contact us.png"} alt={"contact us"} width={"100%"} />
                </Grid>
                <Grid children xs={6}>
                    <Typography variant={"h3"} align={"center"}>Contact Me</Typography>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={classes.root}
                    >
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                            placeholder={"Your Name"}
                            color="secondary"
                            {...register("name",{
                                maxLength: 20
                            })}
                        />
                        {errors.name && <Alert severity="error">Name is too long!</Alert>}
                        <TextField
                            fullWidth
                            id="email"
                            type={"email"}
                            label="Email"
                            variant="outlined"
                            placeholder={"Your Email"}
                            color="secondary"
                            {...register("email",{required:true})}
                        />
                        {errors.email && <Alert severity="error">Email is required!</Alert>}
                        <TextField
                            fullWidth
                            id="message"
                            label="Message"
                            multiline
                            variant="outlined"
                            rows={6}
                            placeholder={"Write your message"}
                            {...register("message")}
                        />
                        <Button
                            type="submit"
                            className={classes.formBtn}
                            variant={"contained"}
                            color={"primary"}
                        >Submit</Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}


export default ContactMe;