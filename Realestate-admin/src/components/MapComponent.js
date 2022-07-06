import React, { useEffect } from 'react';
import GoogleMap from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapComponent = () => {

    const _onChildClick = (key, childProps) => {
        console.log([childProps.lat, childProps.lng]);
    }
    return (
        <React.Fragment>
            <div style={{ height: '500px', width: '600px' }}>
                <GoogleMap
                    center={[59.838043, 30.337157]}
                    zoom={9}
                    onChildClick={_onChildClick}
                    libraries={["places"]}
                >
                </GoogleMap>
            </div>
        </React.Fragment>
    )
}

export default MapComponent;