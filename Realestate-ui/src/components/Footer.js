import React from 'react';
import {Box, Container, Link, Typography} from "@mui/material";

function Copyright() {
    return (
        <Typography variant="body2" color="text.primary">
            {'Copyright © '}
            <Link color="inherit">
                Square1
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const Footer = () => {


    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                m: 'auto',
                mt: 'auto',
                justifyItems: 'center',
                alignItems: 'center',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm" sx={{alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="body1" color={'primary'}>
                    Find And Buy The Property Of Your Dreams.
                </Typography>
                <Copyright />
            </Container>
        </Box>
    )
}

export default Footer;