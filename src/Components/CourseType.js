import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Certificate from "./Certificate";
import {makeStyles} from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarOutlineIcon from "@material-ui/icons/StarOutline";


const useStyles = makeStyles((theme)=>({
    coursesType:{
        margin: theme.spacing(3,1)
    },
    courseImage: {
        maxWidth: "100%",
        height: 125,
        borderRadius: 5,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        position: "absolute"
    },
    courseImageContainer: {
        position: "relative"
    },
    courseSkills:{
        padding: theme.spacing(2,0),
        display: "flex",
        flexWrap: "wrap"
    },
    courseSkill: {
        padding: theme.spacing(0.5,1),
        margin: theme.spacing(0.5),
        fontSize: 14,
        width: "fit-content",
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    courseContainer:{
        borderRadius: 10,
        padding: theme.spacing(1),
        position: "relative",
	minHeight: 233
    },
    courseContainerCompleted: {
        backgroundColor: "#eee",
        boxShadow: "6px 3px 16px #766",
    },
    courseContainerNotCompleted: {
        backgroundColor: "#e78484",
        boxShadow: "6px 3px 16px #c63e3e",
    },
    courseButtons: {
        display: "flex",
        justifyContent: "space-between"
    },
    applyingStars: {
        display: "flex",
        marginTop: theme.spacing(1),
        // alignItems: "center",
        "& svg": {
            fontSize: 20
        }
    },
    notCompletedBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 2,
        width: "fit-content",
        padding: theme.spacing(1,2),
        fontWeight: 600,
        color: "#e9052f",
        border: "2px solid #e9052f"
    }
}))

const ApplyingStars = ({title,applyCourse,style}) => {
    const ApplyingStars = (Icon, num) => {
        return new Array(num).fill(Icon);
    }
    return(
        <Box className={style}>
            <Typography variant={"p"} style={{paddingRight: "5px"}}>
                Applying skills:
            </Typography>
            <Box>
                {ApplyingStars(StarIcon,Math.floor(applyCourse)).map((Icon,i)=>(
                    <Icon  key={title+"start"+i} />
                ))}
                {applyCourse - Math.floor(applyCourse) !== 0 ? <StarHalfIcon/> : ""}
                {ApplyingStars(StarOutlineIcon,Math.floor(5-applyCourse)).map((Icon,i)=>(
                    <Icon  key={title+"start"+i} />
                ))}
            </Box>
        </Box>
    )

}

const CourseType = ({courses, type}) => {
    const classes = useStyles();
    return(
        <Box>
            <Grid container spacing={3}>
                {courses.map(({title,imgExtension,link,certificate,offeredBy,platform,applyCourse,isCompleted,skills}) =>
                    <Grid item xs={6} key={title}>
                        <Box className={`${classes.courseContainer} 
                                        ${isCompleted ? classes.courseContainerCompleted : classes.courseContainerNotCompleted}`}
                        >
                            {isCompleted ? <></> : <Box className={classes.notCompletedBadge}>
                                Not Completed
                            </Box>}
                            <Grid container spacing={1}>
                                <Grid className={classes.courseImageContainer} item xs={4}>
                                    <img className={classes.courseImage} src={"images/Courses/"+title+imgExtension} alt={title}/>
                                </Grid>
                                <Grid item xs={8} deviders>
                                    <Typography variant={"h5"}>{title}</Typography>
                                    <Typography variant={"p"}>{offeredBy} | {platform}</Typography>
                                    <br />
                                    <ApplyingStars title={title} applyCourse={applyCourse} style={classes.applyingStars} />
                                    <Box className={classes.courseSkills}>
                                        {skills.map((skill,i) =>
                                            <Typography className={classes.courseSkill} variant={"span"} key={title+"skill"+i}>
                                                {skill}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box className={classes.courseButtons}>
                                        <Button variant={"contained"} color={"primary"}>
                                            <Link rel="noopener" target="_blank" color="inherit" href={link}>Go To Course</Link>
                                        </Button>
                                        {
                                            certificate === "" ?
                                                <></> :
                                                <Certificate source={certificate} title={title} />
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>)}
            </Grid>
        </Box>
    )
}

export default CourseType
