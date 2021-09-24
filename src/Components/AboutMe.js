import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import {Link} from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    section: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5),
    },
    sectionTitle:{
        fontSize: 48,
        fontWeight: 500
    },
    sectionSubtitle: {
        margin: theme.spacing(1,0)
    },
    aboutMeImage: {
        padding: theme.spacing(2,8),
        position: "relative"
    },
    aboutMeImageBackground: {
        width: "320px",
        height: "420px",
        backgroundImage: "linear-gradient(45deg,rgba(9,166,243),rgba(13, 65, 225))",
        position:"absolute",
        left: 150,
        top: 50,
        transform: "rotateZ(5deg)"
    },
    img: {
        width: "300px",
        height: "400px",
        backgroundImage: "url('./images/aboutMeImage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 1,
        position:"absolute",
        left: 150,
        top: 50
    },
    socialMediaList: {
        listStyle: "none",
        display: "flex",
    },
    socialMediaItem: {
        marginRight: theme.spacing(4)
    }
}))
const AboutMe = ({globalClasses}) => {
    const classes = useStyles();
    const socialMediaLinks = ["https://www.facebook.com/ahmed.benahmed.3956690","https://www.instagram.com/ahmedben_36/","https://www.linkedin.com/in/ahmed-benahmed-6a64121b6/","https://github.com/Ahmed-BenAhmed"]
    return(
        <Container className={classes.section}>
            <Grid container>
                <Grid item xs={7} className={globalClasses.centralize}>
                    <Box>
                        <Typography className={classes.sectionTitle} variant={"h2"} color={"primary"}>About Me</Typography>
                        <Typography className={classes.sectionSubtitle} variant={"h5"}>Ahmed Ben Ahmed | Full Stack Web Developer</Typography>
                        <Typography variant={"p"}>
                            I am Ahmed Ben Ahmed, a 17-year-old high school student. <br/>
                            I am keen on learning new things and gain new skills. I am passionate about the computer science field, I learned web development as a Front-end developer and now I am learning about Back-end development, also I am trying to improve my problem-solving skills, besides that I am improving my level in English.<br/>
                            In order to achieve my goals, I am trying my best to organize my time, effort and develop my researching skills.<br/>
                            I have certificates with the One Million Arabe Coder initiative on those courses:<br/>
                            -Front End Development Track (participation certificate)<br/>
                            -Full Stack Development Track (participation certificate)<br/>
                            -Full Stack Development Track (Completion Certificate)<br/>
                            -Data Analysis Track (participation certificate)<br/>
                            Moreover, as a high school electrical engineering student, I have experience in the Robotic field using Arduino, I made a small stylo CNC project.<br/>
                            The majority of my acquired knowledge was by self-learning on different platforms: Youtube, Udacity, Udemy, Coursera, and ZAmericanEnglish.
                        </Typography>
                        <Typography className={classes.sectionSubtitle} variant={"h5"}>Social Media</Typography>
                        <ul className={classes.socialMediaList}>
                            <li className={classes.socialMediaItem}><Link href={socialMediaLinks[0]}><FacebookIcon /></Link></li>
                            <li className={classes.socialMediaItem}><Link href={socialMediaLinks[1]}><InstagramIcon /></Link></li>
                            <li className={classes.socialMediaItem}><Link href={socialMediaLinks[2]}><LinkedInIcon /></Link></li>
                            <li className={classes.socialMediaItem}><Link href={socialMediaLinks[3]}><GitHubIcon /></Link></li>
                        </ul>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Box className={classes.aboutMeImage}>
                        <Box className={classes.aboutMeImageBackground}></Box>
                        <Box className={classes.img}/>
                    </Box>
                </Grid>

            </Grid>
        </Container>
    )
}

export default AboutMe;