import  {AppBar,Toolbar, Typography, Link} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
// import Link from "@material-ui/core/Link"
const useStyles = makeStyles((theme)=> ({
    logo: {
        fontSize: 18,
        fontWeight: "bold",
        margin: theme.spacing(0,10,0,10)
    },
    navbar: {
        listStyle: "none",
        display: "flex",
        "& li" :{
            margin: theme.spacing(0,1),
            padding: theme.spacing(0.5,1),
            position: "relative",
            "&::after": {
                position: "absolute",
                content: '""',
                width: "70%",
                bottom: 0,
                right: "50%",
                transform: "translateX(50%)",
                height: "2px",
                backgroundColor: theme.palette.warning.main,
                opacity: 0
            },
            "&:hover:after": {
                transitionDuration: 500,
                opacity: 1
            },
        }
    }
}))
const Header = () => {
    const classes = useStyles();
    const navItems = ["About Me","My Projects","My Learning","Contact Me"]
    return (
        <AppBar position={"static"}>
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.logo} variant={"h1"}>Ahmed Ben Ahmed</Typography>
                <ul className={classes.navbar}>
                    {navItems.map(navItem => <li key={navItem}>
                        <Link href={`#${navItem.split(" ").join("-")}`} color={"inherit"}>{navItem}</Link>
                    </li>)}
                </ul>
            </Toolbar>
        </AppBar>
    )
}

export default Header;