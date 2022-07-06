import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    Chip,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import Slider from 'react-slick';
import MediaCard from './MediaCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Footer from './Footer';
import {getAllProperties} from './Api'
import _ from 'lodash';
import {Link, useNavigate} from "react-router-dom";
import UnstyledTabsCustomized from './homepage/headers';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import UserBlock from './signin/UserBlock';
import {useTracking} from "react-tracking";


const HomePage = (props) => {

    const [editorPicks, setEditorPickes] = useState([]);
    const [tags, setTags] = useState([]);
    const {trackEvent} = useTracking();
    const getProperties = () => {
        getAllProperties().then(res => {
            setEditorPickes(res.data.listProperties.items);
            const tempTags = [];
            _.forEach(res.data.listProperties.items, e => {
                _.forEach(e.tags, x => {
                    tempTags.push({'value': x, 'label': x});
                })
            })
            setTags(tempTags);
        }, err => {

        });
    }

    useEffect(() => {
        getProperties();
    }, []);

    const handleChipClicked = (chip) => {
        trackEvent({
            event: 'Chip Clicked',
            chipName: chip
        })
    }
    const searchAppartment = (data) => {
        trackEvent({
            event: 'Home Page Search Button Clicked',
            data: {
                location: 'Hyderabad'
            }
        })
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        adaptiveHeight: true,
        dots: false,
        slidesToScroll: 3,
        arrows: true,
        nextArrow: <KeyboardArrowRightIcon color='info' sx={{
            padding: '5px',
            background: '#073e65',
            color: 'white',
            borderRadius: '50px',
            display: {md: 'inline', sm: 'none', xs: 'none'}
        }}/>,
        prevArrow: <KeyboardArrowLeftIcon color='info' sx={{
            padding: '5px',
            background: '#073e65',
            color: 'white',
            borderRadius: '50px',
            display: {md: 'inline', sm: 'none', xs: 'none'}
        }}/>,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                initialSlide: 4
            }
        }, {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 3
            }
        }, {
            breakpoint: 830,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                arrows: false
            }
        },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: false
                }
            }]

    };
    return (
        <>
            <Box
                width="100%"
                sx={{
                    backgroundImage: 'linear-gradient(to right top, #073e65, #053355, #042845, #021e36, #001427)',
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    display: "grid",
                    height: '500px',
                    pb: {
                        xs: '18vh !important',
                        sm: '12vh !important',
                        md: '10vh !important',
                        lg: '0vh',
                        xl: '0vh'
                    }
                }}
            >
                <Container>
                    <AppBar position="static" color='transparent'>
                        {/* title={<img src="https://unsplash.it/40/40"/>} */}
                        <Toolbar>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-end"
                            >
                                <Grid item sx={{display: {md: 'none', sm: 'inline', xs: 'inline'}}}>
                                    <IconButton sx={{color: 'white'}}>
                                        <MenuOpenIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <img src='images/home_page_logo.jpg' width={'40px'}
                                         style={{backgroundColor: 'transparent'}}/>
                                </Grid>
                                <Grid item sx={{display: {md: 'inline', sm: 'none', xs: 'none'}}}>
                                    <UnstyledTabsCustomized/>
                                </Grid>
                                <Grid item>
                                    <UserBlock color={'#d4dadf'}/>
                                    {/*<Button sx={{color: 'white'}} endIcon={ <AccountCircleIcon />} onClick={logout}>*/}
                                    {/*    {UserModel.name}*/}
                                    {/*</Button>*/}
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <br/>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={5}
                    >
                        <Grid item xs={12} md={4} justifyContent={'space-around'}>
                            <Typography
                                variant="h4"
                                color="white"
                            >
                                FIND AND BUY THE PROPERTY OF YOUR DREAMS.
                            </Typography>
                            <Typography
                                variant="body1"
                                color="#4f6576"
                                textAlign="center"
                                sx={{xs: 6, lg: 12}}
                                mt={1}
                            >
                                Explore Beatiful houses, Apartment, Open Plots and many more
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{
                                borderRadius: '20px',
                                background: 'inherit',
                                margin: 'auto',
                                height: {md: '350px', sm: '250px', xs: '200px'}
                            }}>
                                <img alt="building image" style={{borderRadius: '20px'}}
                                     src="./images/homepage_background.jpg" width={'100%'} height='100%'/>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container>
                <Paper
                    sx={{
                        p: 2,
                        mb: 4,
                        margin: 'auto',
                        mt: -8,
                        minHeight: '100px',
                        placeItems: 'center',
                        backgroundColor: 'white'
                    }}
                    elevation={10}
                >
                    <Typography variant='h5' sx={{textAlign: 'center'}}>Find You Dream Property</Typography>
                    <br/>
                    <Stack direction={{md: "row", sm: 'column', xs: 'column'}}
                           justifyContent="space-around"
                           alignItems="strech"
                           spacing={2}>
                        <TextField xs={4} fullWidth label='Location' value={'Hyderabad'} disabled InputProps={{
                            endAdornment: <InputAdornment position="start"><LocationOnIcon/></InputAdornment>,
                        }}/>
                        <TextField xs={3} fullWidth label='Property Type' InputProps={{
                            endAdornment: <InputAdornment position="start"><FilterAltIcon/></InputAdornment>,
                        }}/>
                        <TextField xs={3} fullWidth label='Keywords' InputProps={{
                            endAdornment: <InputAdornment position="start"><TagIcon/></InputAdornment>,
                        }}/>
                        <Button xs={2} startIcon={<SearchIcon/>} fullWidth variant='contained' onClick={() => searchAppartment()}
                                color={'info'}>Search</Button>
                    </Stack>
                    <br/>
                    <Grid container alignItems={'center'}>
                        <Typography variant='body'>Most Searched :</Typography> &nbsp;&nbsp;&nbsp;
                        <Chip size="small" color='error' variant='outlined' icon={<TagIcon/>} onClick={() => handleChipClicked("Appartments")}
                              label="Appartments"/> &nbsp;&nbsp;
                        <Chip size="small" color='error' variant='outlined' icon={<TagIcon/>}
                              label="Villas"/>&nbsp;&nbsp;
                        <Chip size="small" color='error' variant='outlined' icon={<TagIcon/>}
                              label="PlotsInHyderabad"/>&nbsp;&nbsp;
                    </Grid>
                </Paper>
            </Container>
            <br/>
            <br/>
            <Container>
                <br/>
                <br/>
                <Stack direction={'row'} justifyContent='space-between' alignItems={'center'}>
                    <Typography variant='h6' color={"primary"} textAlign={'center'}><b>Editor's Choice</b></Typography>
                    <Button variant='link' component={Link} to={`/grid`} sx={{textTransform: 'none'}}>View All</Button>
                </Stack>
                <br/>
                <Slider {...settings} >
                    {
                        editorPicks.map((data, index) => (
                            <MediaCard property={data}/>
                        ))
                    }
                    {
                        editorPicks.map((data, index) => (
                            <MediaCard property={data}/>
                        ))
                    }
                    {
                        editorPicks.map((data, index) => (
                            <MediaCard property={data}/>
                        ))
                    }
                </Slider>
                <br/><br/>
                <Typography variant='h6' color={"primary"} textAlign={'center'}><b>Latest Properties</b></Typography>
                <br/>
                <Slider {...settings}>
                    {
                        editorPicks.map((data, index) => (
                            <MediaCard property={data}/>
                        ))
                    }
                    {
                        editorPicks.map((data, index) => (
                            <MediaCard property={data}/>
                        ))
                    }
                    {
                        editorPicks.map((data, index) => (
                            <MediaCard property={data}/>
                        ))
                    }
                </Slider>
                <br/><br/>
                <Typography variant='h6' color={"primary"} textAlign={'center'}><b>Top Picks</b></Typography>
                <br/>
                <Slider {...settings}>
                    {
                        editorPicks.map((data, index) => (
                            <MediaCard property={data}/>
                        ))
                    }
                    {
                        editorPicks.map((data, index) => (
                            <MediaCard property={data}/>
                        ))
                    }
                    {
                        editorPicks.map((data, index) => (
                            <MediaCard property={data}/>
                        ))
                    }
                </Slider>
                <br/><br/><br/>
            </Container>
            <Footer/>
        </>
    )
}

export default HomePage;