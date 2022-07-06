import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Grid';
import {Switch, Typography} from '@mui/material';


export default function SecondMenuBar(props) {

    return (
        <Box sx={{ flexGrow: 1, pt: 1, pb: 1 , height: '50px'}}>
            <Stack container direction="row" spacing={1} sx={{mt: '8px', pl: 3, pr: 3 }}
                justifyContent="space-between"
                alignItems="center">
                <Typography variant="body1">112 Properties are available</Typography>
                <Stack direction="row" sp acing={0} alignItems="center" justifyContent="space-between">
                    <span>Map</span>
                    <Switch  size="large" onChange={(event,newValue) => props.switchView(newValue)} />
                    <span>Grid</span>
                </Stack>
            </Stack>
        </Box>
    );
}
