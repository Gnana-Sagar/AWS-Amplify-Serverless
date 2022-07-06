import {Button, Stack} from '@mui/material';
import {React, useEffect, useRef, useState} from 'react';
import {MapContainer, Marker, Popup, useMapEvents} from "react-leaflet";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Carousel from 'react-material-ui-carousel';
import awsmobile from './../aws-exports';
import {Link} from 'react-router-dom';

const position = [13.67359, 79.3482];

const LeafletMap = (props) => {

    const [bucketName, setBucketName] = useState('');
    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            setBucketName(awsmobile['aws_user_files_s3_bucket']);
            // do componentDidMount logic
            mounted.current = true;
            // getCurrentLocation();

        } else {
            // do componentDidUpdate logic
        }
    }, []);


    const getCurrentLocation = () => {
        // map.locate().on('locationfound', function(e) {
        //     map.flyTo(e.latlng, 10);
        // })
    }
    return (
    <div style={{marginRight: '10px'}}>
        <MapContainer center={position} zoom={20} scrollWheelZoom={true}>
            <ReactLeafletGoogleLayer googleMapsLoaderConf={{ KEY: 'YOUR_API_KEY' }} type={'roadmap'} />
            <MarkerClusterGroup>
                {
                    props.properties.map((marker, index) => {
                        return (
                            <Marker 
                            // icon={new L.Icon({
                            //     iconUrl: 'images/house_lite.png',
                            //     iconSize: [45, 45]
                            // })} 
                            key={index} position={[marker.lat, marker.lon]}>
                                <Popup style={{ width: '20hw' , height: '25vh'}}>
                                    <Carousel indicators={false} navButtonsAlwaysVisible animation='slide' autoPlay={false}>
                                        {
                                            marker.propertyImg.map((e, index) => (
                                                <img key={index} src={`https://${bucketName}.s3.ap-south-1.amazonaws.com/public/${e}`} alt="" height={150} width={'100%'} />
                                            ))
                                        }
                                    </Carousel>
                                    <Stack>
                                        <b>{marker.propertyName}</b>
                                        <Button  component={Link} to={`/view/${marker.id}`} fullWidth size="small" variant='outlined'>View</Button>
                                    </Stack>
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </MarkerClusterGroup>
            <LocationMarker />
        </MapContainer>
    </div>
    )
}

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        moveend(e) {
            console.log(e);
            console.log('move ended');
            console.log(map.getBounds());
            console.log(map.getCenter());
        },

    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}


export default LeafletMap;