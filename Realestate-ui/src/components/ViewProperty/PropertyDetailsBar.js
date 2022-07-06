import React from 'react';
import {Grid, IconButton, Stack, Typography} from '@mui/material'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ConstructionIcon from '@mui/icons-material/Construction';

const PropertyDetailsBar = (props) => {
    return (
        <Grid container direction="row"
            justifyContent="space-evenly"
            alignItems="center" spacing={2}>
            <Grid item md={2} xs={6}>
                <Stack direction='column' justifyContent="space-evenly"
                    alignItems="center">
                    <IconButton color="primary"><BusinessOutlinedIcon /></IconButton>
                    <Typography variant='body2' gutterBottom>{props.propertyDetails.propertyType}</Typography>
                </Stack>
            </Grid>
            <Grid item md={2} xs={6}>
                <Stack direction='column' justifyContent="space-evenly"
                    alignItems="center">
                    <IconButton color="primary"><NavigationOutlinedIcon /></IconButton>
                    <Typography variant='body2'>{props.propertyDetails.location}</Typography>
                </Stack>
            </Grid>
            <Grid item md={2} xs={6}>
                <Stack direction='column' justifyContent="space-evenly"
                    alignItems="center">
                    <IconButton color="primary" ><LocationSearchingOutlinedIcon  /></IconButton>
                    <Typography variant='body2'>{props.propertyDetails.city}</Typography>
                </Stack>
            </Grid>
            <Grid item md={2} xs={6}>
                <Stack direction='column' justifyContent="space-evenly"
                    alignItems="center">
                    <IconButton color="primary" ><DashboardOutlinedIcon  /></IconButton>
                    <Typography variant='body2'>{props.propertyDetails.amenities.length} Amenities</Typography>
                </Stack>
            </Grid><Grid item md={2} xs={6}>
                <Stack direction='column' justifyContent="space-evenly"
                    alignItems="center">
                    <IconButton color="primary"><ListAltIcon  /></IconButton>
                    <Typography variant='body2'>{props.propertyDetails.specifications.length} Specifications</Typography>
                </Stack>
            </Grid>

            <Grid item md={2} xs={6}>
                <Stack direction='column' justifyContent="space-evenly"
                    alignItems="center" >
                    <IconButton color="primary" ><ConstructionIcon fontSize='10px' /></IconButton>
                    <Typography variant='body2' gutterBottom>{props.propertyDetails.builderName}</Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default PropertyDetailsBar;