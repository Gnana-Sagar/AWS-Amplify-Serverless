import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material';
import awsmobile from '../aws-exports';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Carousel from 'react-material-ui-carousel';
import PinDropIcon from '@mui/icons-material/PinDrop';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import {Link} from 'react-router-dom';

const MediaCard = (props) => {

  const [bucketName, setBucketName] = useState('');

  useEffect(() => {
    setBucketName(awsmobile['aws_user_files_s3_bucket']);
  }, []);

  return (
    <Box className='hoverZoom' sx={{ height: '70%' }}>
      <Card sx={{ marginLeft: '10px', marginRight: '10px', marginBottom: '20px', borderRadius: '10px' }} elevation={3}>
        <Carousel indicators={false} navButtonsAlwaysVisible animation='slide' autoPlay={false} navButtonsProps={{
          style: {
            backgroundColor: "inherit",
            fontWeight: 'bolder',
            opacity: 1
          }
        }} >
          {
            props.property.propertyImg && props.property.propertyImg.map((e, index) => (
              <img src={`https://${bucketName}.s3.ap-south-1.amazonaws.com/public/${e}`} alt="" height={220} width={'100%'} key={index} />
            ))
          }
        </Carousel>
        <CardContent sx={{ mb: 0, pb: 0 }}>
          <Grid item container xs={12} direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>

            <Grid item xs={11}>
              <Typography gutterBottom variant="subtitle1" component="div" sx={{ WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box', fontSize: '17px', fontWeight: '700 !important' }}>
              <Link to={`/view/${props.property.id}`} style={{textDecoration: 'none', color: 'inherit'}}>{props.property.propertyName}</Link>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton color='error' size="small"><FavoriteIcon fontSize='10px' /></IconButton>
            </Grid>
            <Grid item xs={11} sx={{marginLeft: '-5px'}}>
              <Typography variant="body2" display="block" gutterBottom sx={{ lineHeight: 1, WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}><IconButton size='small' sx={{ pointerEvents: 'none', paddingLeft: '0' }} color='info'><PinDropIcon /></IconButton>  {props.property.location}</Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton color='info' size="small"><ShareIcon fontSize='10px' /></IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <Grid item container direction={'row'} justifyContent={'space-around'} alignItems={'center'} xs={12}>
          <Grid item xs={4}>
            <Typography variant="body2" display="block" gutterBottom sx={{ WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}><IconButton size='small' sx={{ pointerEvents: 'none' }} color='info'><VisibilityIcon fontSize='10px' /></IconButton> 20 Views</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" display="block" gutterBottom sx={{ WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}><IconButton size='small' sx={{ pointerEvents: 'none' }} color='info'><DashboardCustomizeIcon fontSize='10px' /></IconButton> 20 Amenities</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" display="block" gutterBottom sx={{ WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}><IconButton size='small' sx={{ pointerEvents: 'none' }} color='info'><ListAltIcon fontSize='10px' /></IconButton> 20 Features</Typography>
          </Grid>
        </Grid>
      </Card>
    </Box >
  );
}
export default MediaCard;