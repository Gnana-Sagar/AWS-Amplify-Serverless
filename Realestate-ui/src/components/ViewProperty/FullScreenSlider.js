import React, {useState} from "react";
import Carousel, {Modal, ModalGateway} from "react-images";
import _ from 'lodash';
import {Button, Stack} from "@mui/material";
import ApartmentIcon from '@mui/icons-material/Apartment';
import ImageAspectRatioIcon from '@mui/icons-material/ImageAspectRatio';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

function FullScreenSlider(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [showImages, setShowImages] = useState([]);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const viewModal = (type) => {
        let temp = props.images[type];
        const photos = [];
        _.forEach(temp, e => {
            photos.push({ src: "https://" + props.bucketName + ".s3.ap-south-1.amazonaws.com/public/" + e });
        });
        setViewerIsOpen(true);
        setShowImages(photos);
    }

    return (
        <React.Fragment>
            <Stack direction={{ md: 'column', sm: 'column', xs: 'column' }} spacing={2}>
                <Button variant={'outlined'} startIcon={<ApartmentIcon />} fullWidth onClick={() => viewModal('property')}>Property Images</Button>
                <Button variant={'outlined'} startIcon={<ImageAspectRatioIcon />} fullWidth onClick={() => viewModal('master')}>Master Plan layouts</Button>
                <Button variant={'outlined'} startIcon={<SquareFootIcon />} fullWidth onClick={() => viewModal('floorPlan')}>Floor Pan layouts</Button>
                <Button variant={'outlined'} startIcon={<AttachFileIcon />} fullWidth href={`https://${props.bucketName}.s3.ap-south-1.amazonaws.com/public/${props.images.broucher}`}
                    target={'_blank'}>Broucher</Button>
            </Stack>
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        {/* <Grid direction={'row'} container justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={1} sx={{ background: 'white' }}>
                                <Stack direction={'column'}>
                                    <Button variant={'outlined'} startIcon={<ApartmentIcon />} fullWidth onClick={() => viewModal('property')}>Property Images</Button>
                                    <Button variant={'outlined'} startIcon={<ImageAspectRatioIcon />} fullWidth onClick={() => viewModal('master')}>Master Plan layouts</Button>
                                    <Button variant={'outlined'} startIcon={<SquareFootIcon />} fullWidth onClick={() => viewModal('floorPlan')}>Floor Pan layouts</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={11}> */}
                                <Carousel
                                    currentIndex={currentImage}
                                    views={showImages.map((x) => ({
                                        ...x,
                                        srcset: x.srcSet,
                                    }))}
                                />
                            {/* </Grid>
                        </Grid> */}
                    </Modal>
                ) : null}
            </ModalGateway>
        </React.Fragment>
    );
}
export default FullScreenSlider;
