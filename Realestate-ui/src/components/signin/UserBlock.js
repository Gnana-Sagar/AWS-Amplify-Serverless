import React from 'react';
import UserModel from './UserModel';
import {Button, ButtonGroup, Divider, Menu, MenuItem} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Auth} from 'aws-amplify';

const UserBlock = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    const logoutUser = () => {
        Auth.signOut().then((res) => {
            window.location.reload();
        }, () => {

        })
    }


    return (
        <React.Fragment>
            {
                !UserModel.isUserLogined &&
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button sx={{my: 1, display: 'block', color: props?.color}}>SignUp</Button>
                    <Divider orientation={'vertical'} />
                    <Button sx={{my: 1, display: 'block', color: props?.color}}>SignIn</Button>
                </ButtonGroup>
            }
            {
                UserModel.isUserLogined &&
                <React.Fragment>
                    <Button sx={{color: '#1c1c1c', my: 1}} endIcon={<AccountCircleIcon/>} onClick={e => handleClick(e)}>
                        {UserModel.name}
                    </Button>
                    <Menu id="signout-menu"
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}>
                        <MenuItem onClick={() => logoutUser()}>Signout</MenuItem>
                    </Menu>

                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default UserBlock;
