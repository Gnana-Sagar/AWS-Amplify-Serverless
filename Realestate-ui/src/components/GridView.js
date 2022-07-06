import React from 'react';
import {Grid} from '@mui/material';
import MediaCard from './MediaCard';

const GridView = (props) => {

    return (
        <Grid container direction={'row'} justifyContent={'flex-start'} alignItems={'flex-start'} spacing={0}>
            <br />
            {
                props.properties && props.properties.map((data, index) => (
                    <Grid md={4} sm={6} xs={12} item>
                        <MediaCard property={data} />
                    </Grid>
                ))
            }
             {
                props.properties && props.properties.map((data, index) => (
                    <Grid md={4} sm={6} xs={12} item>
                        <MediaCard property={data} />
                    </Grid>
                ))
            }
             {
                props.properties && props.properties.map((data, index) => (
                    <Grid md={4} sm={6} xs={12} item>
                        <MediaCard property={data} />
                    </Grid>
                ))
            }
             {
                props.properties && props.properties.map((data, index) => (
                    <Grid md={4} sm={6} xs={12} item>
                        <MediaCard property={data} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default GridView;