import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import CourseType from "./CourseType";
import Paper from "@material-ui/core/Paper";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: "fit-content",
        margin: "auto",
    },
}));

const MyLearning = ({globalClasses,myLearning}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <Container>
            <Typography className={globalClasses.sectionTitle} variant={"h3"} color={"primary"}>My Learning</Typography>
            <div>
                <Paper square className={classes.root}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab
                            value="one"
                            label="English"
                            wrapped
                            {...a11yProps('one')}
                        />
                        <Tab value="two" label="Web Development" {...a11yProps('two')} />
                        <Tab value="three" label="Computer Science" {...a11yProps('three')} />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index="one">
                    <div data-aos={"fade-right"}>
                        <CourseType  courses={myLearning.english} type={"English"} />
                    </div>
                </TabPanel>
                <TabPanel value={value} index="two">
                    <div data-aos={"fade-left"}>
                        <CourseType courses={myLearning.webDevelopment} type={"Web Development"} />
                    </div>
                </TabPanel>
                <TabPanel value={value} index="three">
                    <div data-aos={"fade-right"}>
                        <CourseType courses={myLearning.computerScience} type={"Computer Science"} />
                    </div>
                </TabPanel>
            </div>
        </Container>
    )
}

export default MyLearning;