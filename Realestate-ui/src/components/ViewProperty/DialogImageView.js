import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {IconButton, Paper, Stack} from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Carousel from 'react-material-ui-carousel';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [propertyImg, setPropertyImg] = React.useState(0);
    const [masterActive, setMasterActive] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{ zIndex: 9999999999999 }}
                >
                    <Tab label="Property Images" {...a11yProps(0)} />
                    <Tab label="Master Layouts" {...a11yProps(1)} />
                    <Tab label="Floor Plans" {...a11yProps(2)} />
                    <Tab label="Location" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Stack direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2} sx={{ display: { md: 'inline-flex', sm: 'none', xs: 'none' } }}>
                        <IconButton disabled={propertyImg === 0} color="primary" aria-label="Arrow Left" component="span" onClick={() => setPropertyImg(propertyImg - 1)} >
                            <ArrowCircleLeftIcon />
                        </IconButton>
                        <Box sx={{ maxWidth: '100%', flexGrow: 1, alignItems: 'center', }}>
                            <Box sx={{
                                alignItems: 'center',
                                pl: 2,
                                bgcolor: 'background.default'
                            }} justifyContent={'center'}>
                                <img src={`https://${props.bucketName}.s3.ap-south-1.amazonaws.com/public/${props.propertyImages[propertyImg]}`} />
                            </Box>
                            <p>{1 + propertyImg}/{props.propertyImages.length}</p>
                        </Box>
                        <IconButton disabled={propertyImg === props.propertyImages.length - 1} color="primary" aria-label="Arrow Left" component="span" onClick={() => setPropertyImg(1 + propertyImg)}>
                            <ArrowCircleRightIcon />
                        </IconButton>
                    </Stack>
                    <Paper sx={{ display: { md: 'none', sm: 'inherit', xs: 'inherit' } }}>
                        <Carousel indicators={false} navButtonsAlwaysVisible animation='slide' autoPlay={false} navButtonsProps={{
                            style: {
                                color: "green",
                                fontWeight: 'bolder',
                                opacity: 1
                            }
                        }}>
                            {
                                props.propertyImages && props.propertyImages.map((e, index) => (
                                    <img key={index} src={`https://${props.bucketName}.s3.ap-south-1.amazonaws.com/public/${e}`} alt="property images" height={'450px'} width={'100%'} />
                                ))
                            }
                        </Carousel>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} alignSelf={'center'} sx={{ display: { md: 'flex', sm: 'none', xs: 'none' } }}>
                        <IconButton disabled={masterActive === 0} color="primary" aria-label="Arrow Left" sx={{ position: 'static', height: '-webkit-fill-available' }} component="span" onClick={() => setMasterActive(masterActive - 1)} >
                            <ArrowCircleLeftIcon />
                        </IconButton>
                        <Box sx={{ maxWidth: '100%', flexGrow: 1, alignItems: 'center' }}>
                            <Box sx={{
                                alignItems: 'center',
                                height: '80vh',
                                width: '100vh',
                                pl: 2,
                                bgcolor: 'background.default'
                            }} justifyContent={'center'} alignItems={'center'}>
                                <img src={`https://${props.bucketName}.s3.ap-south-1.amazonaws.com/public/${props.masterImg[masterActive]}`} height={'100%'} width={'100%'} />
                            </Box>
                            <p>{1 + masterActive}/{props.masterImg.length}</p>
                        </Box>
                        <IconButton disabled={masterActive === props.masterImg.length - 1} sx={{ position: 'static', height: '100%' }} color="primary" aria-label="Arrow Left" component="span" onClick={() => setMasterActive(1 + masterActive)}>
                            <ArrowCircleRightIcon />
                        </IconButton>
                    </Stack>
                    <Paper sx={{ display: { md: 'none', sm: 'inherit', xs: 'inherit' } }}>
                        <Carousel indicators={false} navButtonsAlwaysVisible animation='slide' autoPlay={false} navButtonsProps={{
                            style: {
                                color: "green",
                                fontWeight: 'bolder',
                                opacity: 1
                            }
                        }}>
                            {
                                props.masterImg && props.masterImg.map((e, index) => (
                                    <img key={index} src={`https://${props.bucketName}.s3.ap-south-1.amazonaws.com/public/${e}`} alt="property images" height={'450px'} width={'100%'} />
                                ))
                            }
                        </Carousel>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}