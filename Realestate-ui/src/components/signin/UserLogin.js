import React, {useEffect} from 'react';
import '@aws-amplify/ui-react/styles.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UserModel from './UserModel';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Auth} from 'aws-amplify';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import {Avatar, Divider, Stack, TextField, Typography} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const UserLogin = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.closeViewLoginModel();
    }

    const isUserLoggined = () => {
        if (UserModel.isUserLogined) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    useEffect(() => {
        isUserLoggined();
    })

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction={"row"} justifyContent={'center'}>
                        <Avatar alt="Remy Sharp" sx={{ width: 75, height: 75 }} variant="square" >
                            <img  src="./images/home_page_logo.jpg" width={70} height={70} />
                        </Avatar>
                    </Stack>
                    <br />
                    <Typography variant={'h5'} sx={{textAlign: 'center'}}>Sign In</Typography>
                    <br/>
                    <br/>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12} sx={{verticalAlign: 'center'}}>
                            <Stack direction={'column'} spacing={2} xs={12}>
                                <Button
                                    onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook })}
                                    size={'large'}
                                    variant={"outlined"} fullWidth startIcon={<FacebookIcon/>} >Login With
                                    Facebook</Button>
                                <Button
                                    onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook })}
                                    size={'large'}
                                    variant={'outlined'} fullWidth startIcon={<GoogleIcon/>}>Login With
                                    Google</Button>
                                <Button variant={'outlined'} fullWidth size={'large'}
                                        startIcon={<PersonAddAltIcon/>}>Sign Up</Button>
                            </Stack>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Stack direction={'column'} spacing={2}>
                                <TextField variant={"outlined"} label={"User Name"} />
                                <TextField variant={'outlined'} label={'Password'} type={"password"} />
                                <Button fullWidth variant={'contained'}>Sign In</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>

    )
}
export default UserLogin;