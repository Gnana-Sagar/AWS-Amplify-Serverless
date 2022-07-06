import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const SinglePointerMap = (props) => {

    const position = props.position;

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    This Property Location
                </Popup>
            </Marker>
        </MapContainer>
    )
}
export default SinglePointerMap;