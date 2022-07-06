import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Chip,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    Pagination,
    Paper,
    Slide,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography,
    Zoom
} from '@mui/material';
import React, {useEffect, useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {useParams} from 'react-router-dom';
import {getAmenities, getConfigurations, getPropertyDetails, getSpecifications} from './../Api';
import awsmobile from './../../aws-exports';
import _ from 'lodash';
import {Link} from 'react-scroll';
import {Box} from '@mui/system';
import MediaCard from './../MediaCard';
import LeafletMap from './../LeafletMap';
import Slider from 'react-slick';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import FullScreenSlider from './FullScreenSlider';
import MenuBar from '../MenuBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropertyDetailsBar from './PropertyDetailsBar';
import PropertyNameGrid from './PropertyNameGrid';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';

const ViewProperty = () => {

    const [propertyDetails, setPropertyDetails] = useState({});
    const [bucketName, setBucketName] = useState('');
    const [configs, setConfis] = useState([]);
    const [specifications, setSpecifications] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const params = useParams();
    const [viewImgDialog, setViewImgDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const openViewImgDialog = () => {
        setViewImgDialog(true);
    }

    const closeViewImgDialog = () => {
        setViewImgDialog(false);
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        adaptiveHeight: true,
        dots: false,
        slidesToScroll: 3,
        arrows: true,
        nextArrow: <KeyboardArrowRightIcon color='info' sx={{ padding: '5px', background: '#073e65', color: 'white', borderRadius: '50px', display: { md: 'inline', sm: 'none', xs: 'none' } }} />,
        prevArrow: <KeyboardArrowLeftIcon color='info' sx={{ padding: '5px', background: '#073e65', color: 'white', borderRadius: '50px', display: { md: 'inline', sm: 'none', xs: 'none' } }} />,
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
            breakpoint: 850,
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

    const variableWidth = {
        className: "slider variable-width center",
        dots: false,
        centerPadding: "60px",
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: true,
        nextArrow: <ChevronRightIcon color='primary' />,
        prevArrow: <ChevronLeftIcon color='primary' />,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    variableWidth: false,
                    arrows: true,
                    centerMode: false,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    variableWidth: false,
                    arrows: true,
                    centerMode: false,
                }
            }]
    };

    const getProperty = () => {
        const { id } = params;
        if (id) {
            getPropertyDetails(id).then((res) => {
                setPropertyDetails(res.data.getProperty)
                setLoading(false);
            }, (err) => {
                setLoading(false);
            })
        }
    }

    const getAllSpecifications = () => {
        getSpecifications().then(res => {
            setSpecifications(res.data.listSpecifications.items);
        }, (err) => {

        })
    }

    const getAllAmenities = () => {
        getAmenities().then(res => {
            setAmenities(res.data.listAmenities.items);
        })
    }

    const getAllConfigurations = () => {
        getConfigurations().then(res => {
            setConfis(res.data.listConfigurations.items);
        }, err => { })
    }

    useEffect(() => {
        getProperty();
        getAllAmenities();
        getAllConfigurations();
        getAllSpecifications();
        setBucketName(awsmobile['aws_user_files_s3_bucket']);
    }, []);

    return (
        <>
            <MenuBar />
            {
                !loading && <div style={{ backgroundColor: '#fcfbfd' }}>
                    <div id="viewProperty">
                        <Slider {...variableWidth}>
                            {
                                propertyDetails.propertyImg && propertyDetails.propertyImg.map((e, index) => (
                                    <Paper key={index} elevation={10} sx={{ width: '100%', alignItems: 'center', justifyItems: 'center', marginLeft: 'auto', alignContent: 'center', justifyContent: 'center' }}>
                                        <img src={`https://${bucketName}.s3.ap-south-1.amazonaws.com/public/${e}`} style={{ overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'center', objectFit: 'cover' }} alt="" height={'450px'} width={'100%'} />
                                    </Paper>
                                ))
                            }
                        </Slider>
                    </div>
                    <Container sx={{ position: 'relative' }}>
                        <Paper sx={{ mt: -5, minHeight: '100px', borderRadius: '20px' }} elevation={4}>
                            <PropertyDetailsBar propertyDetails={propertyDetails} />
                        </Paper>
                    </Container>
                    <PropertyNameGrid name={propertyDetails.propertyName} tags={propertyDetails.tags} location={propertyDetails.location} city={propertyDetails.city} />
                    <br />
                    <Container>
                        <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'flex-start'} spacing={3}>
                            <Grid item md={8} xs={12}>
                                <Paper sx={{ padding: '30px 30px 15px 30px', boxShadow: '0 5px 70px 0 rgb(38 42 76 / 10%)' }}>
                                    <Box>
                                        <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px' }}>Description</Typography>
                                        <Typography variant="body2">
                                            <div className="content" style={{ color: '#7A7A7A !important' }} dangerouslySetInnerHTML={{ __html: propertyDetails.about }}></div>
                                        </Typography>
                                        {/* <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '16px' }}>Broucher</Typography>
                                        <Button endIcon={<DownloadIcon />} xs={12}>Broucher.pdf</Button> */}
                                    </Box>
                                </Paper>
                                <br />
                                <Paper sx={{ padding: '30px 30px 15px 30px', boxShadow: '0 5px 70px 0 rgb(38 42 76 / 10%)' }}>
                                    <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px', color: '#222' }}>Property Details</Typography>
                                    <br />
                                    <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'flex-start'} spacing={1}>
                                        {configs.length > 0 && propertyDetails.configurations &&
                                            _.map(propertyDetails.configurations, (data, index) => {
                                                const temp = (_.filter(configs, { 'id': data.id })[0]);
                                                return (
                                                    <Grid item md={6} xs={12} key={index}>
                                                        <Stack direction='row' justifyContent={'flex-start'} alignItems={'flex-start'}>
                                                            <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 700, marginTop: '2px', fontSize: '14px', color: '#222' }}>{temp.name}: </Typography>&nbsp;&nbsp;
                                                            <Typography variant='captions' gutterBottom component="div" sx={{ marginTop: '5px', fontSize: '14px', color: '#6f6f6f' }}>{data.value}</Typography>
                                                        </Stack>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Paper>
                                <br />
                                <Paper elevation={0} sx={{ padding: '30px 30px 15px 30px', boxShadow: '0 5px 70px 0 rgb(38 42 76 / 10%)' }}>
                                    <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px' }}>Unit Types</Typography>
                                    <br />
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell size='small'>Unit Type</TableCell>
                                                <TableCell size='small'>Size(sq. ft)</TableCell>
                                                <TableCell size='small'>Approx. cost</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                _.map(propertyDetails.typeAreaDetails, (data, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell sx={{ color: '#6f6f6f' }} size='small'><b>{data.unitType}</b></TableCell>
                                                        <TableCell sx={{ color: '#6f6f6f' }} size='small'><b>{data.size}</b></TableCell>
                                                        <TableCell sx={{ color: '#6f6f6f' }} size='small'><b>{data.price}</b></TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                    <br />
                                </Paper>
                                <br />
                                <div id="specifications">
                                    <Paper elevation={0} sx={{ padding: '30px 30px 15px 30px', boxShadow: '0 5px 70px 0 rgb(38 42 76 / 10%)' }}>
                                        <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px' }}>Specifications</Typography>
                                        <br />
                                        <Table>
                                            {
                                                specifications.length > 0 && propertyDetails.specifications &&
                                                _.map(propertyDetails.specifications, (data, index) => {
                                                    const temp = (_.filter(specifications, { 'id': data.id })[0]);
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                <Stack justifyContent={'center'} textAlign={'center'} alignItems={'center'} direction={{ md: 'row', sm: 'column', xs: 'column' }} spacing={2}>
                                                                    <img
                                                                        alt={temp.name}
                                                                        src={`https://${bucketName}.s3.ap-south-1.amazonaws.com/public/${temp.img}`}
                                                                        width={40} height={40}
                                                                    />
                                                                    <Typography variant="subtitle1" gutterBottom component="div" sx={{ paddingTop: '10px', fontWeight: 700, fontSize: '14px' }} alignItems={'center'}>{temp.name}</Typography>
                                                                </Stack>
                                                            </TableCell>
                                                            <TableCell style={{ backgroundColor: '#fff' }}><Typography variant='subtitle1' sx={{ color: '#6f6f6f' }}>{data.value}</Typography></TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                            <br />
                                        </Table>
                                    </Paper>
                                </div>
                                <br />
                                <Paper elevation={0} sx={{ padding: '30px 30px 15px 30px', boxShadow: '0 5px 70px 0 rgb(38 42 76 / 10%)' }}>
                                    <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px' }}>Amenities</Typography>

                                    <br />
                                    <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'flex-start'} spacing={1}>

                                        {amenities.length > 0 && propertyDetails.amenities &&
                                            _.map(propertyDetails.amenities, (data, index) => {
                                                const temp = (_.filter(amenities, { 'id': data })[0]);
                                                return (
                                                    <Grid item xs={12} sm={6} md={6} key={index}>
                                                        <Chip sx={{ border: 'none', fontSize: '15px', color: '#6f6f6f' }} size='large'
                                                            avatar={<Avatar alt="Natacha" src={`https://${bucketName}.s3.ap-south-1.amazonaws.com/public/${temp.img}`} />}
                                                            label={temp.name}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Paper>
                                <br />
                                <Paper elevation={0} sx={{ padding: '30px 30px 15px 30px', boxShadow: '0 5px 70px 0 rgb(38 42 76 / 10%)' }}>
                                    <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px' }}>Map</Typography>

                                    <br />
                                    <LeafletMap properties={[propertyDetails]} />
                                    <br />
                                </Paper>
                                <br />
                                <Paper elevation={0} sx={{ padding: '30px 30px 15px 30px', boxShadow: '0 5px 70px 0 rgb(38 42 76 / 10%)', overflow: 'hidden' }}>
                                    <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px' }}>Broucher</Typography>
                                    <br />
                                    <Document file={`https://${bucketName}.s3.ap-south-1.amazonaws.com/public/${propertyDetails.broucher}`} onLoadSuccess={onDocumentLoadSuccess}>
                                        <Page pageNumber={pageNumber} />
                                    </Document>
                                    <br />
                                    <Stack spacing={2} alignItems={'center'}>
                                        <Pagination defaultPage={pageNumber} count={numPages} color={'primary'} sx={{ justifySelf: 'center' }} onChange={(event, value) => setPageNumber(value)} />
                                    </Stack>
                                    <br />

                                </Paper>
                                <br />
                                <Paper elevation={0} sx={{ padding: '30px 30px 15px 30px', boxShadow: '0 5px 70px 0 rgb(38 42 76 / 10%)' }}>
                                    <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px', color: '#222' }}>About Builder</Typography>
                                    <br />
                                    <Typography variant='subtitle1' color={'#6f6f6f'}>
                                        {propertyDetails.aboutBuilder}
                                    </Typography>
                                    <br />
                                </Paper>
                                <br />
                                <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px' }}>FAQ</Typography>
                                {
                                    _.map(propertyDetails.faq, (data, index) => (
                                        <Accordion expanded={true} key={index}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography><b>{data.question}</b></Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography color='#6f6f6f'>
                                                    {data.answer}
                                                </Typography>
                                            </AccordionDetails>
                                            <br />
                                        </Accordion>
                                    ))
                                }
                            </Grid>
                            <Grid item md={4} sm={12} xs={12} sx={{ position: 'sticky', top: 0 }}>
                                <FullScreenSlider style={{ zIndex: '999999999999' }} images={{ 'master': propertyDetails.masterPlanImg, 'property': propertyDetails.propertyImg, 'broucher': propertyDetails.broucher, 'floorPlan': propertyDetails.floorPlan }} bucketName={bucketName} />
                                <br />
                                <Paper elevation={0}
                                    sx={{
                                        padding: '30px 30px 15px 30px',
                                        boxShadow: '0 5px 70px 0 rgb(38 42 76 / 10%)'

                                    }}>
                                    <Typography variant='body1' sx={{ fontWeight: 700, fontSize: '16px' }}>Enquiry Form</Typography>
                                    <br />
                                    <FormControl fullWidth>
                                        <Stack direction={'column'} spacing={2}>
                                            <TextField size="small" placeholder='Your Name' fullWidth />
                                            <TextField size="small" placeholder='Your Email' fullWidth />
                                            <TextField size="small" placeholder='Your Phone Number' fullWidth />
                                            <TextField multiline
                                                maxRows={4} size="small" placeholder='Your Query' fullWidth />
                                            <Button fullWidth variant='contained'> Submit </Button>
                                        </Stack>
                                    </FormControl>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    {/* </Container> */}
                    <Container style={{ backgroundColor: '#f8f9fa' }}>
                        <br />
                        <br />
                        <Typography variant='h5' color={"primary"} textAlign={'center'}>Recomended For You</Typography>
                        <br />
                        <Slider {...settings} >
                            <MediaCard property={propertyDetails} />
                            <MediaCard property={propertyDetails} />
                            <MediaCard property={propertyDetails} />
                            <MediaCard property={propertyDetails} />
                            <MediaCard property={propertyDetails} />
                        </Slider>
                        <br />
                    </Container>
                </div >
            }
            {
                loading &&
                <Box sx={{ display: 'flex', height: '50vh', justifyContent: 'center', marginTop: '25vh' }}>
                    <CircularProgress color='primary' />
                </Box>
            }

        </>
    )
}
export default ViewProperty;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MenuBarHandler() {
    const trigger = useScrollTrigger({
        target: window ? window : undefined,
        disableHysteresis: true,
        threshold: 750,
    });

    const [activeTab, setActiveTab] = useState(0);

    return (
        <Zoom in={trigger}>
            <Paper
                sx={{
                    width: '100%',
                    position: 'sticky',
                    zIndex: 999,
                    top: 0,
                    justifyContent: 'flex-end',
                    display: 'inline-grid'
                }} elevation={10}>

                <Tabs
                    // onChange={handleChange}
                    value={activeTab}
                    aria-label="Tabs where each tab needs to be selected manually"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Link to='about' spy={true} smooth={true} onSetActive={() => setActiveTab(0)}><Tab index={0} sx={{ fontWeight: '600' }} label="About" /></Link>
                    <Link to='configuration' spy={true} smooth={true} onSetActive={() => setActiveTab(1)}><Tab index={1} sx={{ fontWeight: '600' }} label="Configurations" /></Link>
                    <Link to='unitTypes' spy={true} smooth={true} onSetActive={() => setActiveTab(2)}><Tab sx={{ fontWeight: '600' }} label="Unit Types" /></Link>
                    <Link to='specifications' spy={true} smooth={true} onSetActive={() => setActiveTab(3)}><Tab sx={{ fontWeight: '600' }} label="Specifications" /></Link>
                    <Link to='amenities' spy={true} smooth={true} onSetActive={() => setActiveTab(4)}><Tab index={4} sx={{ fontWeight: '600' }} label="Amenities" /></Link>
                    <Link to='map' spy={true} smooth={true} onSetActive={() => setActiveTab(5)}><Tab sx={{ fontWeight: '600' }} label="Location" /></Link>
                    <Link to='layouts' spy={true} smooth={true} onSetActive={() => setActiveTab(6)}><Tab sx={{ fontWeight: '600' }} label="Layouts" /></Link>
                    <Link to='broucher' spy={true} smooth={true} onSetActive={() => setActiveTab(7)}><Tab sx={{ fontWeight: '600' }} label="Broucher" /></Link>
                    <Link to='video' spy={true} smooth={true} onSetActive={() => setActiveTab(8)}><Tab sx={{ fontWeight: '600' }} label="Video" /></Link>
                    <Link to='expertsOpinion' spy={true} smooth={true} onSetActive={() => setActiveTab(9)}><Tab sx={{ fontWeight: '600' }} label="Experts Opinion" /></Link>
                    <Link to='builder' spy={true} smooth={true} onSetActive={() => setActiveTab(10)}><Tab sx={{ fontWeight: '600' }} label="Builder" /></Link>
                    <Link to='faq' spy={true} smooth={true} onSetActive={() => setActiveTab(11)}><Tab sx={{ fontWeight: '600' }} label="FAQ" /></Link>
                </Tabs>
            </Paper>
        </Zoom>
    );
}