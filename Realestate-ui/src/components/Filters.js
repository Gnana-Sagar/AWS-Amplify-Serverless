import * as React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Chip,
    MenuItem,
    Select,
    Slider,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {useFormik} from 'formik';

export default function Filters() {

    const filterFormik = useFormik({
        initialValues: {
            propertyName: '',
            price: [0, 10],
            distance: 1,
            builder: [],
            amenities: [],
            type: []
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const priceChange = (newValue) => {
        filterFormik.setFieldValue('price',newValue);
    }
    return (
        <div style={{ marginLeft: '10px', overflowY: 'auto', height: '80vh', overflowX: 'hidden' }}>
            <form onClick={filterFormik.handleSubmit}>
                <AccordionDetails sx={{ border: '1px solid #e3e3e3', borderBottom: 'none' }}>
                    <Stack direction="row" justifyContent={'space-between'}>
                        <Typography variant='body1'>Filters &nbsp;&nbsp;&nbsp; <Chip label={'2'} size="small"></Chip></Typography>
                        <Button sx={{ textTransform: 'none' }} size="small">Clear All</Button>
                    </Stack>
                    <br />
                    <Button startIcon={<FilterAltIcon />} fullWidth color='primary' variant='outlined' type="submit">Apply</Button>
                </AccordionDetails>
                <Accordion sx={{ margin: '0px !important', boxShadow: 'none', border: '1px solid #e3e3e3', borderBottom: 'none', borderTop: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography variant='body2'>Search</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField size="small" placeholder='Property Name' variant='outlined' fullWidth 
                        name="propertyName"
                        value={filterFormik.values.propertyName} 
                        onChange={filterFormik.handleChange} />
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ margin: '0px !important', boxShadow: 'none', border: '1px solid #e3e3e3', borderBottom: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="within"
                        id="within">
                        <Typography variant='body2'>Distance</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography id="non-linear-slider" gutterBottom variant='caption'>
                            Within: {filterFormik.values.distance}  KM
                        </Typography>
                        <Slider
                            size="small"
                            value={filterFormik.values.distance}
                            onChange={filterFormik.handleChange}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                            name="distance"
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ margin: '0px !important', boxShadow: 'none', border: '1px solid #e3e3e3', borderBottom: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="price"
                        id="price">
                        <Typography variant='body2'>Price</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography id="non-linear-slider" gutterBottom variant='caption'>
                            Price: {filterFormik.values.price[0]} -{filterFormik.values.price[1]} Lacks
                        </Typography>
                        <Slider
                            value={filterFormik.values.price}
                            onChange={priceChange}
                            size="small"
                            nam="price"
                            aria-label="Small"
                            valueLabelDisplay="auto"
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ margin: '0px !important', boxShadow: 'none', border: '1px solid #e3e3e3', borderBottom: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="property_type"
                        id="property_type">
                        <Typography variant='body2'>Type</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Select fullWidth name="type" size="small" placeholder="Proprty Type"  value={filterFormik.values.type} onChange={filterFormik.handleChange}>
                            <MenuItem value='Open Plot'>Open Plot</MenuItem >
                            <MenuItem value='Apartment Rent'>Apartment Rent</MenuItem >
                            <MenuItem value='Apartment Sale'>Apartment Sale</MenuItem >
                            <MenuItem value='Villa Rent'>Villa Rent</MenuItem >
                            <MenuItem value='Villa Sale'>Villa Sale</MenuItem >
                        </Select>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ margin: '0px !important', boxShadow: 'none', border: '1px solid #e3e3e3', borderBottom: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="amenities"
                        id="amenities">
                        <Typography variant='body2'>Amenities</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Select fullWidth size="small" name="amenities" placeholder="Amenities" values={filterFormik.values.amenities} onChange={filterFormik.handleChange}>
                            {
                                [1, 2, 3, 4].map(e => (
                                    <MenuItem value={e}>Amenities {e}</MenuItem>
                                ))
                            }
                        </Select>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ margin: '0px !important', boxShadow: 'none', border: '1px solid #e3e3e3' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="property_type"
                        id="builder_name">
                        <Typography variant='body2'>Builder</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Select fullWidth size="small" placeholder="Builder Name" name="builder" values={filterFormik.values.builder} onChange={filterFormik.handleChange}>
                            <MenuItem value='Builder 1'>Builder 1</MenuItem >
                            <MenuItem value='Builder 2'>Builder 2</MenuItem >
                            <MenuItem value='Builder 3'>Builder 3</MenuItem >
                            <MenuItem value='Builder 4'>Builder 4</MenuItem >
                        </Select>
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    );
}
