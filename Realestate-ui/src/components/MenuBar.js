import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {listMenuBars} from './../graphql/queries';
import {API, graphqlOperation} from "aws-amplify";
import {Link} from 'react-router-dom';
import awsmobile from '../aws-exports';
import {Fab} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {animateScroll as scroll} from 'react-scroll';
import UserBlock from './signin/UserBlock';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: 'none',
  color: theme.palette.text.primary,
}));

const MenuBar = (props) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [pages, setPages] = React.useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  React.useEffect(() => {
    API.graphql(graphqlOperation(listMenuBars)).then((res) => {
      let temp = res.data.listMenuBars.items;
      let pag = [];
      for (let t of temp) {
        pag.push(t.name);
      }
      setPages(pag);
    }, (err) => {
      console.log(err);
    })
  }, []);


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {
          pages.map((data, index) => (
            <Link to={data} key={index} style={{ textDecoration: 'none' }}><ListItem button key="Menu1">
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary={data} />
            </ListItem></Link>
          ))
        }
      </List>
    </Box>
  );


  return (
    <AppBar position="static" color="transparent">
      {/* <Container maxWidth="xl"> */}
      <Toolbar disableGutters>

        <Grid container direction="row"
          justifyContent="space-between"
          alignItems="flex-start">
          <Grid item>
            <Item>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ m: 0, display: { xs: 'none', sm: 'none', md: 'flex' } }}
              ><Link to='/'>
                  <img src="../images/home_page_logo.jpg" alt=" logo" width={40} height={40} /></Link>
                {/* <img src={`https:\\${awsmobile['aws_user_files_s3_bucket']}.s3.ap-south-1.amazonaws.com/public/logo/logo.jpg`} alt=" logo" width={125} height={30} /></Link> */}
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer('left', true)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="left"
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                >
                  {list('left')}
                </Drawer>

                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ my: 1, display: { xs: 'flex', md: 'none' } }}
                >
                  <Link to="/" style={{ textDecoration: 'none' }}><img src={`https:\\${awsmobile['aws_user_files_s3_bucket']}.s3.ap-south-1.amazonaws.com/public/logo/logo.jpg`} alt=" logo" width={50} height={50} /></Link>
                </Typography>
              </Box>
            </Item>
          </Grid>

          <Grid item>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center', textAlign: 'center' }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  sx={{ my: 1, display: 'block'}}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <UserBlock />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
      {/* </Container> */}
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top" onClick={() => scroll.scrollToTop()}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </AppBar >
  );
};

export default MenuBar;

function ScrollTop(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 999 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}
