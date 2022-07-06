import {Button, Chip, Container, Grid, IconButton, Typography} from '@mui/material';
import React from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import TagIcon from '@mui/icons-material/Tag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

const PropertyNameGrid = (props) => {

    return (
        <Container>
            <Grid container direction="row" justifyContent={'space-between'} alignItems={'center'} spacing={1}>
                <Grid md={12} xs={12} item>
                    <br /><br />
                    <Grid item direction={'row'} spacing={3}>

                        {
                            props.tags.map((e, index) => (
                                <Chip sx={{ml:1,mt:1}} key={index} color='error' size='small' icon={<TagIcon size="small" />} label={e} />
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Typography variant='h4' color='primary'>{props.name}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent={'space-between'} alignItems={'center'} spacing={1}>
                <Grid item>
                    <Typography variant='body2'><IconButton size='small'><PlaceIcon /></IconButton>{props.location}, {props.city}</Typography>
                </Grid>
                <Grid item>
                    <Button size="small" startIcon={<FavoriteBorderIcon />} variant='outlined'>Favorite</Button>&nbsp;&nbsp;&nbsp;
                    <Button size="small" startIcon={<ShareIcon />} variant='outlined'>Share</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PropertyNameGrid;