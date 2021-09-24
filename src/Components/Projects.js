import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {Link, Slide} from "@material-ui/core";
import {useState} from "react";
const useStyles = makeStyles((theme)=> ({
    card: {
        position: "relative",
    },
    websiteDetails: {
        backgroundColor: "rgba(0,0,0,.5)",
        position: "absolute",
        zIndex: 2,
        width: "100%",
        height: "100%",
        paddingLeft: theme.spacing(1)

    },
    technologies: {
      marginRight: theme.spacing(2)
    },
    parent:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center"
    },
    onHoverTitle: {
        margin: theme.spacing(1,0),
        color: "#fff"
    },
    categories: {
        marginRight: theme.spacing(2),
        padding: theme.spacing(.5,1),
        backgroundColor: theme.palette.primary.light,
        color: "#fff",
        borderRadius: 7,
        width: "fit-content",
        fontSize: 14
    },
    categoriesContaienr: {
        display: "flex",
        flexWrap: "wrap",
        margin: theme.spacing(2,0)
    },
    websiteLink: {
        position: "absolute",
        bottom: theme.spacing(3)
    },
    extCard: {
        boxShadow: "4px 5px 15px #8080808a"
    }
}))
const Project = ({title,image,link,categories,technologies}) => {
    const classes = useStyles();
    const [isHovering, setIsHovering] = useState(false);
    return (
        <Card className={classes.card} onMouseOver={()=>{
            setIsHovering(true)
        }} onMouseOut={()=>{
            setIsHovering(false)
        }}>
            <Slide direction="up" in={isHovering} mountOnEnter unmountOnExit>
                <Box className={classes.websiteDetails}>
                    <Box className={classes.parent}>
                        <Typography  className={classes.onHoverTitle} align={"center"} variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Box className={classes.categoriesContaienr}>
                            {categories.map(category =>
                                <Typography className={classes.categories} gutterBottom={true} key={title+category} component={"p"}>
                                    {category}
                                </Typography>)}
                        </Box>
                        <Box>
                            {technologies.map(tech => (
                                <img className={classes.technologies} src={`./images/Icons/${tech}` + `${tech == "g-code" ? ".png" : ".svg"}`} width={36} alt={tech} />
                            ))}
                        </Box>
                        <Link rel="noopener" target="_blank" color="inherit" href={link} className={classes.websiteLink}>
                            <Button variant={"contained"} color={"secondary"}>Visit The Website</Button>
                        </Link>
                    </Box>
                </Box>
            </Slide>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={title}
                    height="220"
                    image={"./images/My projects/"+image}
                    title={title}
                />
                <CardContent>
                    <Typography  gutterBottom align={"center"} variant="h5" component="h2">
                        {isHovering ? "-" : title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
const Projects = ({globalClasses,projects}) => {

    return(
        <Container>
            <Typography className={globalClasses.sectionTitle} variant={"h3"} color={"primary"}>Projects</Typography>
            <Typography variant={"body2"} component={"p"} align={"center"} gutterBottom={true}>
                I loose access to some of my projects because they were in a damaged hard disk, I just put their pictures
            </Typography>
            <Grid container spacing={3}>
                {projects.map(({title, img, link, technologies, categories}) =>
                    <Grid item xs={4} key={title}>
                        <Project title={title} link={link} image={img} categories={categories} technologies={technologies}/>
                    </Grid>)}
            </Grid>
        </Container>
    )
}

export default Projects
