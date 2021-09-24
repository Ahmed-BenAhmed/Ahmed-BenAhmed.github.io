import { makeStyles } from "@material-ui/core/styles"
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import AboutMe from "./Components/AboutMe";
import Projects from "./Components/Projects";
import { data } from "./data"
import MyLearning from "./Components/MyLearning";
import ContactMe from "./Components/ContactMe";
import {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
        "& a": {
            textDecoration: "none !important"
        }
    },
    centralize: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    sectionTitle: {
        textAlign: "center",
        fontWeight: 500,
        margin: theme.spacing(2,0)
    }
}))

function App() {
    const globalClasses = useStyles();

    useEffect(()=>{
        AOS.init({duration: 1000})
    },[])
    return (
    <div className={globalClasses.root}>
        <Header />
        <HeroSection globalClasses={globalClasses}/>
        <div id={"About-Me"} data-aos={"fade-bottom"}>
            <AboutMe globalClasses={globalClasses}/>
        </div>
        <div id={"My-Projects"} data-aos={"fade-bottom"}>
            <Projects globalClasses={globalClasses} projects={data.projects}/>
        </div>
        <div id={"My-Learning"} data-aos={"fade-bottom"}>
            <MyLearning globalClasses={globalClasses} myLearning={data.myLearning} />
        </div>
        <div id={"Contact-Me"} data-aos={"fade-bottom"}>
            <ContactMe />
        </div>
    </div>
    );
}

export default App;
