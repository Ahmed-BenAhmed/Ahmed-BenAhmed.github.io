import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import {Button, makeStyles, Typography} from "@material-ui/core";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme)=>({
    heroSection: {
        backgroundImage: `linear-gradient(45deg,rgba(9,166,243,0.5),rgba(13, 65, 225,0.5)),url('../Images/heroCover.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        fontWeight: "bold",
        height: "80vh"
    },
    heroImg: {
        width: "40%",
        borderRadius: "50%"
    },
    heroText1: {
        fontWeight: 500,
    },
    heroText2: {
        fontWeight: 400,
        fontSize: 36
    },
    heroBtn: {
        marginTop: theme.spacing(5)
    }
}))

const HeroSection = ({globalClasses}) => {
    const classes = useStyles();
    return (
        <Box>
            <Grid container className={classes.heroSection}>
                <Grid item xs={6}>
                    <Box className={globalClasses.centralize}>
                        <Box>
                            <Typography className={classes.heroText1} variant={"h1"}>Full Stack</Typography>
                            <Typography className={classes.heroText2} variant={"h3"}>web developer</Typography>
                            <Link href={"#My-Projects"}><Button className={classes.heroBtn} variant={"contained"} color={"secondary"}>
                                Browse Projects
                            </Button></Link>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box className={globalClasses.centralize}>
                        <img className={classes.heroImg} src={"images/my-image.jpg"} alt={"Ahmed Ben Ahmed Image"}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default HeroSection;