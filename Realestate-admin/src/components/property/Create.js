// import React, { useEffect, useState } from "react";
// import { Grid, Typography, Stack, Button, TextField, Chip, InputLabel, Autocomplete, Divider, Alert, Snackbar, Select, MenuItem, FormControl, IconButton } from "@mui/material";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useFormik } from "formik";
// import { getAllConfigurationApi } from './../api/ConfigurationsApi';
// import { getAllApi } from './../api/SpecificationsApi';
// import { getAllAmenitiesApi } from './../api/AmenitiesApi';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import _ from "lodash";
// import { Editor } from '@jeremyling/react-material-ui-rich-text-editor';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { createPropertyApi, getPropertyApi, updatePropertyApi } from './../api/PropertyApi';
// import { Link, useParams } from 'react-router-dom';
// import { Storage } from 'aws-amplify';
// import { v4 as uuidv4 } from 'uuid';
// import { publishImage, deleteImage } from './../api/StorageApi'
// import Dropzone from 'react-dropzone'
// import { CloudUpload } from "@mui/icons-material";
// import AttachmentIcon from '@mui/icons-material/Attachment';
// import awsmobile from "../../aws-exports";
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useConfirm } from 'material-ui-confirm';


// const Create = (props) => {

//     const [allConfigs, setAllConfigs] = useState([]);
//     const [allSpec, setAllSpec] = useState([]);
//     const [allAmenities, setAllAmenities] = useState([]);
//     const [snackBarToggle, setSnackBarToggle] = useState({});
//     const [s3Url, setS3Url] = useState('');
//     const [uuid, setUUID] = useState('');
//     const [formAmenities, setFormAmenities] = useState([]);
//     const [filesToDelete, setFilesToDelete] = useState([]);

//     const confirm = useConfirm();

//     const formik = useFormik({
//         initialValues: {
//             propertyName: '',
//             location: '',
//             city: '',
//             viewCount: 0,
//             commentCount: 0,
//             videoLink: '',
//             price: 0,
//             projectPriceInclusion: '',
//             builderName: '',
//             aboutBuilder: '',
//             about: '',
//             // expertsOpinion: {
//             //     positives: [''],
//             //     negatives: ['']
//             // },
//             // promotionalImg: '',
//             masterPlanImg: [],
//             offersImg: '',
//             // howToBook: '',
//             floorPlan: [],
//             tags: [],
//             amenities: [],
//             lat: '',
//             lon: '',
//             s3Uuid: '',
//             propertyImg: [],
//             configurations: [{
//                 id: '',
//                 value: ''
//             }],
//             specifications: [{
//                 id: '',
//                 value: ''
//             }],
//             faq: [{
//                 question: '',
//                 answer: ''
//             }],
//             typeAreaDetails: [{
//                 unitType: '',
//                 size: '',
//                 price: ''
//             }],
//             broucher: ''
//         },
//         // validationSchema: validationSchemaYup,
//         onSubmit: (values) => {
//             console.log(values);
//             delete values.updatedAt;
//             delete values.createdAt;

//             if (Object.keys(values).includes('id')) {
                // updatePropertyApi(values).then(() => {
                //     setSnackBarToggle({ open: true, type: 'success', msg: 'Property updated successfully' });
                // }, () => {

                // })
//             } else {
                // createPropertyApi(values).then((res) => {
                //     setFilesToDelete([]);
                //     formik.setFieldValue('id', res.data.createProperty.id);
                //     setSnackBarToggle({ open: true, type: 'success', msg: 'Property created successfully' });
                // }, (err) => {
                //     setSnackBarToggle({ open: true, type: 'error', msg: 'Property creation failed reason' + err.errors[0].message });
                // });
//             }
//         }
//     });


//     const updateProperty = () => {
//         const values = formik.values;
//         delete values.updatedAt;
//         delete values.createdAt;

//         updatePropertyApi(values).then(() => {
//             // setSnackBarToggle({ open: true, type: 'success', msg: 'Property updated successfully' });
//         }, () => {

//         })
//     }
//     const uploadMainImage = async (event, fileSource) => {
//         uploadSingleImages(event, fileSource);
//     }

//     const uploadSingleImages = (event, fileSource) => {
//         let propertyImage = event;
//         let fileName = 'property_images/' + uuid + '/' + fileSource + '/' + propertyImage.name.replace(/[^a-zA-Z0-9.]/g, '_');
//         let type = fileName.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
//         Storage.put(fileName, propertyImage, { contentType: type }).then((res) => {
//             if (fileSource === 'main') {
//                 formik.setFieldValue('mainImg', res.key);
//             } else if (fileSource === 'promotional') {
//                 formik.setFieldValue('promotionalImg', res.key);
//             } else if (fileSource === 'offers') {
//                 formik.setFieldValue('offersImg', res.key);
//             } else if (fileSource === 'howToBook') {
//                 formik.setFieldValue('howToBook', res.key);
//             }
//             if (!formik.values.id) {
//                 const data = filesToDelete;
//                 data.push(res.key);
//                 setFilesToDelete(data);
//             }
//         }, () => {
//             setSnackBarToggle({ open: true, type: 'error', msg: 'Failed to upload ' + fileSource + ' image, please try again.' });
//         })
//     }

//     const uploadPropertyImage = (e) => {
//         if (e.length > 1) {
//             setSnackBarToggle({ open: true, type: 'info', msg: 'Please select one file at a time ' });
//             return;
//         }
//         let fileName = 'property_images/' + uuid + '/property_images/' + e.name.replace(/[^a-zA-Z0-9.]/g, '_');
//         let type = fileName.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
//         publishImage(fileName, e, { contentType: type }).then((res) => {
//             formik.setFieldValue('propertyImg', _.union(formik.values.propertyImg, [res.key]));
//             if (!formik.values.id) {
//                 const data = filesToDelete;
//                 data.push(res.key);
//                 setFilesToDelete(data);
//             }
//         }, () => {
//             setSnackBarToggle({ open: true, type: 'error', msg: 'Failed to upload image, please try again.' });
//         })
//     }

//     const uploadFloorPlan = (e) => {
//         // if (e.length > 0) {
//         //     setSnackBarToggle({ open: true, type: 'info', msg: 'Please select one file at a time ' });
//         //     return;
//         // }
//         let fileName = 'property_images/' + uuid + '/floor_plan/' + e.name.replace(/[^a-zA-Z0-9.]/g, '_');
//         let type = fileName.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
//         publishImage(fileName, e, { contentType: type }).then((res) => {
//             formik.setFieldValue('floorPlan', _.union(formik.values.floorPlan, [res.key]));
//             if (!formik.values.id) {
//                 const data = filesToDelete;
//                 data.push(res.key);
//                 setFilesToDelete(data);
//             }
//         }, () => {
//             setSnackBarToggle({ open: true, type: 'error', msg: 'Failed to upload image, please try again.' });
//         })
//     }

//     const uploadMasterPlanLayouts = (e) => {
//         if (e.length > 1) {
//             setSnackBarToggle({ open: true, type: 'info', msg: 'Please select one file at a time ' });
//             return;
//         }
//         let fileName = 'property_images/' + uuid + '/master_plan/' + e.name.replace(/[^a-zA-Z0-9.]/g, '_');
//         let type = fileName.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
//         publishImage(fileName, e, { contentType: type }).then((res) => {
//             formik.setFieldValue('masterPlanImg', _.union(formik.values.masterPlanImg, [res.key]));
//             if (!formik.values.id) {
//                 const data = filesToDelete;
//                 data.push(res.key);
//                 setFilesToDelete(data);
//             }
//         }, () => {
//             setSnackBarToggle({ open: true, type: 'error', msg: 'Failed to upload image, please try again.' });
//         })
//     }

//     const closeSnackBar = () => {
//         setSnackBarToggle({ open: false, type: '', msg: '' });
//     }

//     const getConfigurations = () => {
//         getAllConfigurationApi().then((res) => {
//             let temp = res.data.listConfigurations.items;
//             let resArray = [];
//             temp.forEach(e => {
//                 resArray.push({ label: e.name, value: e.img });
//             })
//             setAllConfigs(temp);
//         }, (err) => {
//             console.log(err);
//         })
//     }

//     const getSpecifications = () => {
//         getAllApi().then((res) => {
//             let temp = res.data.listSpecifications.items;
//             let resArray = [];
//             temp.forEach(e => {
//                 resArray.push({ label: e.name, value: e.img });
//             })
//             setAllSpec(temp);
//         }, (err) => {
//             console.log(err);
//         })
//     }

//     const getAmenities = (amenitiesFromApi) => {
//         getAllAmenitiesApi().then((res) => {
//             let temp = res.data.listAmenities.items;
//             let all = [];
//             let selected = [];
//             for (let e of temp) {
//                 all.push({ id: e.id, name: e.name });
//                 if (amenitiesFromApi.includes(e.id)) {
//                     selected.push({ id: e.id, name: e.name })
//                 }
//             }
//             setFormAmenities(selected);
//             setAllAmenities(all);
//         }, () => {

//         })
//     }

//     const addNewConfig = () => {
//         var temp = formik.values.configurations;
//         temp.push({
//             id: '',
//             value: ''
//         });
//         formik.setFieldValue('configurations', temp);
//     }

//     const removeConfiguration = (index) => {
//         var temp = formik.values.configurations;
//         if (temp.length > 1) {
//             temp.splice(index, 1);
//             formik.setFieldValue('configurations', temp);
//         }
//     }

//     const addNewSpecification = () => {
//         var temp = formik.values.specifications;
//         temp.push({
//             id: '',
//             value: ''
//         });
//         formik.setFieldValue('specifications', temp);
//     }

//     const removeSpecification = (index) => {
//         var temp = formik.values.specifications;
//         if (temp.length > 1) {
//             temp.splice(index, 1);
//             formik.setFieldValue('specifications', temp);
//         }
//     }

//     const handleAmenities = (e, v) => {
//         try {
//             setFormAmenities(_.uniqBy(v, 'id'));
//             let temp = [];
//             for (let e1 of v) {
//                 temp.push(e1.id);
//             }
//             formik.setFieldValue('amenities', _.uniq(temp));
//         } catch (err) {
//             console.loge(err);
//         }
//     }

//     const addNewFAQ = () => {
//         var temp = formik.values.faq;
//         temp.push({ question: '', answer: '' });
//         formik.setFieldValue('faq', temp);
//     }

//     const removeFaq = (index) => {
//         var temp = formik.values.faq;
//         if (temp.length > 1) {
//             temp.splice(index, 1);
//             formik.setFieldValue('faq', temp);
//         }
//     }

//     const params = useParams();

//     const getPropertyDetails = () => {
//         const { id } = params;
//         if (id) {
//             getPropertyApi({ 'id': id }).then((res) => {
//                 formik.setValues(res.data.getProperty);
//                 setTimeout(() => {
//                     if (res.data.getProperty.expertsOpinion.positives.length === 0) {

//                         formik.setFieldValue('expertsOpinion.positives', ['']);
//                     }
//                     if (res.data.getProperty.expertsOpinion.negatives.length === 0) {
//                         formik.setFieldValue('expertsOpinion.negatives', ['']);
//                     }
//                 }, 2000);
//                 setTimeout(() => {
//                     getAmenities(res.data.getProperty.amenities);
//                 }, 200)
//                 setUUID(res.data.getProperty.s3Uuid)

//             }, () => {
//                 setSnackBarToggle({ open: true, type: 'error', msg: 'Unable to fetch property details' });
//             })
//         } else {
//             getAmenities([]);
//             let temp = uuidv4();
//             setUUID(temp);
//             formik.setFieldValue('s3Uuid', temp);
//         }
//     }

//     const removeUnit = (index) => {
//         const temp = formik.values.typeAreaDetails;
//         if (temp.length > 0) {
//             temp.splice(index, 1);
//             formik.setFieldValue('typeAreaDetails', temp);
//         }
//     }

//     const addNewUnit = () => {
//         let temp = formik.values.typeAreaDetails;
//         temp.push({
//             unitType: '',
//             size: '',
//             price: ''
//         });
//         formik.setFieldValue('typeAreaDetails', temp);
//     }

//     useEffect(() => {
//         let isMounted = true;
//         if(isMounted) {
//             getPropertyDetails();
//             getConfigurations();
//             getSpecifications();
//             s3BucketName();
//         }
//         return () => {
//             isMounted = false;
//         }
//     }, []);


    // const s3BucketName = () => {
    //     setS3Url(awsmobile.aws_user_files_s3_bucket);
    // }

//     const deletePropertyImage = (index) => {
//         confirm({ description: "Do you want delete file?" }).then(() => {
//             deleteImage(formik.values.propertyImg[index]).then(() => {
//                 var temp = formik.values.propertyImg;
//                 temp.splice(index, 1);
//                 formik.setFieldValue('propertyImg', temp);
//                 setTimeout(() => {
//                     if (formik.values.id) {
//                         updateProperty();
//                     }
//                 }, 1000);
//                 setSnackBarToggle({ open: true, type: 'info', msg: 'Image delete successfully' });
//             }, () => {
//                 setSnackBarToggle({ open: true, type: 'error', msg: 'unable to delete image' });
//             });

//         });
//     }

//     const deleteMasterImage = (index) => {
//         confirm({ description: "Do you want to replace the files with new" }).then(() => {
//             deleteImage(formik.values.masterPlanImg[index]).then(() => {
//                 var temp = formik.values.masterPlanImg;
//                 temp.splice(index, 1);
//                 formik.setFieldValue('masterPlanImg', temp);
//                 setTimeout(() => {
//                     if (formik.values.id) {
//                         updateProperty();
//                     }
//                 }, 1000);
//                 setSnackBarToggle({ open: true, type: 'info', msg: 'Image delete successfully' });

//             }, (err) => {
//                 setSnackBarToggle({ open: true, type: 'error', msg: 'unable to delete image ' + err.erros[0].message });
//             })

//         });
//     }

//     const deleteFloorPlanImg = (index) => {
//         confirm({ description: "Do you want to replace the files with new" }).then(() => {

//             deleteImage(formik.values.floorPlan[index]).then(() => {
//                 var temp = formik.values.floorPlan;
//                 temp.splice(index, 1);
//                 formik.setFieldValue('floorPlan', temp);
//                 setTimeout(() => {
//                     if (formik.values.id) {
//                         updateProperty();
//                     }
//                 }, 1000);
//                 setSnackBarToggle({ open: true, type: 'info', msg: 'Image delete successfully' });
//             }, (err) => {
//                 setSnackBarToggle({ open: true, type: 'error', msg: 'unable to delete image ' + err.erros[0].message });
//             })

//         });
//     }

//     const deleteBroucher = () => {
//         confirm({ description: "Do you want to Remove" }).then(() => {
//             deleteImage(formik.values.broucher).then(() => {
//                 formik.setFieldValue('promotionalImg', '');
//                 setSnackBarToggle({ open: true, type: 'info', msg: 'Image delete successfully' });
//             }, err => {
//                 setSnackBarToggle({ open: true, type: 'error', msg: 'unable to delete image ' + err.erros[0].message });
//             })
//         });

//     }

//     const deleteOffers = () => {
//         confirm({ description: "Do you want to replace the files with new" }).then(() => {
//             deleteImage(formik.values.offersImg).then(() => {
//                 formik.setFieldValue('offersImg', '');
//                 setSnackBarToggle({ open: true, type: 'info', msg: 'Image delete successfully' });
//             }, err => {
//                 setSnackBarToggle({ open: true, type: 'error', msg: 'unable to delete image ' + err.erros[0].message });
//             })

//         });
//     }


//     const uploadBroucher = (file) => {
//         let broucherName = 'property_images/' + uuid + '/broucher/' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
//         Storage.put(broucherName, file, { contentType: 'application/pdf' }).then((res) => {
//             formik.setFieldValue("broucher", res.key)
//         })
//     }

//     return (
//         <React.Fragment>
//             {
//                 snackBarToggle.open === true &&
//                 <Snackbar open={snackBarToggle.open} autoHideDuration={3000} onClose={closeSnackBar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//                     <Alert variant="filled" onClose={closeSnackBar} severity={snackBarToggle.type} sx={{ width: '100%' }}>
//                         {snackBarToggle.msg}
//                     </Alert>
//                 </Snackbar>
//             }
//             <div className='container-grid'>
//                 <Grid container direction="row"
//                     justifyContent="space-between"
//                     alignItems="stretch">

//                     <Grid sx={{ ml: 1, mr: 1 }} container
//                         direction="row"
//                         justifyContent="space-between"
//                         alignItems="stretch">
//                         <Grid xs={6}>
//                             <Typography variant='h5' fontWeight={700}>Property</Typography>
//                         </Grid>
//                         <Grid xs={6}>
//                             <Stack direction={'row'} spacing={1} style={{ float: 'right' }}>
//                                 <Link to="/property" style={{ textDecoration: 'none' }}><Button color="primary" variant='outlined' startIcon={<ArrowBackIcon />} onClick={props.showCreate}>Back</Button></Link>
//                             </Stack>
//                         </Grid>
//                     </Grid>
//                     <form onSubmit={formik.handleSubmit}>
//                         <Grid sx={{ p: 1, mt: 1, mr: 0 }} container
//                             direction="row"
//                             justifyContent="space-between"
//                             alignItems="stretch" spacing={3}>
//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField label="Property Name"
//                                     id="propertyName" name="propertyName" value={formik.values.propertyName}
//                                     error={formik.touched.propertyName && Boolean(formik.errors.propertyName)}
//                                     helperText={formik.touched.propertyName && formik.errors.propertyName}
//                                     onChange={formik.handleChange} variant="outlined" fullWidth />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField label="Location"
//                                     id="location" name="location" value={formik.values.location} onChange={formik.handleChange}
//                                     error={formik.touched.location && Boolean(formik.errors.location)}
//                                     helperText={formik.touched.location && formik.errors.location}
//                                     variant="outlined" fullWidth />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField label="City"
//                                     id="city" name="city" value={formik.values.city} onChange={formik.handleChange}

//                                     error={formik.touched.city && Boolean(formik.errors.city)}
//                                     helperText={formik.touched.city && formik.errors.city}
//                                     variant="outlined" fullWidth />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                     <TextField label="Video Link"
//                                         id="videoLink" name="videoLink" value={formik.values.videoLink} onChange={formik.handleChange}
//                                         error={formik.touched.videoLink && Boolean(formik.errors.videoLink)}
//                                         helperText={formik.touched.videoLink && formik.errors.videoLink}
//                                         variant="outlined" fullWidth />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField label="Price"
//                                     id="price" name="price" value={formik.values.price} onChange={formik.handleChange}
//                                     error={formik.touched.price && Boolean(formik.errors.price)}
//                                     helperText={formik.touched.price && formik.errors.price}
//                                     variant="outlined" fullWidth />
//                             </Grid>

//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField label="Project Price Inclusion" variant="outlined"
//                                     id="projectPriceInclusion" name="projectPriceInclusion" value={formik.values.projectPriceInclusion} onChange={formik.handleChange}
//                                     error={formik.touched.projectPriceInclusion && Boolean(formik.errors.projectPriceInclusion)}
//                                     helperText={formik.touched.projectPriceInclusion && formik.errors.projectPriceInclusion} fullWidth />
//                             </Grid>


//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField label="Latitude" variant="outlined"
//                                     id="lat" name="lat" value={formik.values.lat} onChange={formik.handleChange}
//                                     error={formik.touched.lat && Boolean(formik.errors.lat)}
//                                     helperText={formik.touched.lat && formik.errors.lat}
//                                     fullWidth />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField label="Longitude" variant="outlined"
//                                     id="lon" name="lon" value={formik.values.lon} onChange={formik.handleChange}
//                                     error={formik.touched.lon && Boolean(formik.errors.lon)}
//                                     helperText={formik.touched.lon && formik.errors.lon}
//                                     fullWidth />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField label="Tags" placeholder="Tags enter with comma seperated" variant="outlined" fullWidth
//                                     id="tags" name="tags" value={formik.values.tags} onChange={formik.handleChange} />
//                             </Grid>

//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <Autocomplete
//                                     multiple
//                                     id="tags-standard"
//                                     limitTags={1}
//                                     value={formAmenities}
//                                     options={allAmenities}
//                                     disableCloseOnSelect={true}
//                                     onChange={(e, v) => handleAmenities(e, v)}
//                                     getOptionLabel={(option) => option.name}
//                                     renderInput={(params) => (
//                                         <TextField {...params} label="Amenities" placeholder="Amenities" />
//                                     )}
//                                 />
//                             </Grid>

//                             <Grid item xs={12} sm={12} md={12} xl={12}>
//                                 <Grid item xs={12}>

//                                     <Divider textAlign="center">
//                                         <Chip label="Property Images" />
//                                     </Divider>
//                                     <br />
//                                 </Grid>
//                                 <div style={{ border: "1px dotted #cbcbcb", padding: "10px" }}>
//                                     <Grid container direction="row"
//                                         justifyContent="space-between"
//                                         alignItems="stretch">
//                                         <Grid item md={8}>
//                                             <Dropzone onDrop={(e) => uploadPropertyImage(e[0])} maxFiles={1} md={8}>
//                                                 {({ getRootProps, getInputProps }) => (
//                                                     <section xs={12}>
//                                                         <div {...getRootProps()} xs={12}>
//                                                             <input {...getInputProps()} xs={12} />
//                                                             <Button fullWidth xs={12} style={{ height: '170px', width: '80hw', border: 'none', color: '#828282' }} startIcon={<CloudUpload />} variant="outlined">Drag and Drop a file here or click (Single)</Button>
//                                                         </div>
//                                                     </section>
//                                                 )}
//                                             </Dropzone>
//                                         </Grid>
//                                         <Grid item md={4}>
//                                             <Stack direction={'column'} style={{ height: '180px', overflowY: 'scroll' }} >
//                                                 {
//                                                     formik.values.propertyImg.map((e, i) => (
//                                                         <Stack direction={'row'} justifyContent="space-between" key={i}>
//                                                             <a  href={`https://${s3Url}.s3.amazonaws.com/public/${e}`} rel="noopener noreferrer" style={{ textDecoration: 'none' }} target="_blank"><Button size="small" startIcon={<AttachmentIcon />}>{e.split('/')[3]}</Button></a>
//                                                             <IconButton aria-label="delete" color='error' size="small" onClick={() => deletePropertyImage(i)}>
//                                                                 <DeleteIcon fontSize="10px" />
//                                                             </IconButton>
//                                                         </Stack>
//                                                     ))
//                                                 }
//                                             </Stack>
//                                         </Grid>
//                                     </Grid>
//                                 </div>
//                             </Grid>

//                             <Grid item xs={12} sm={12} md={12} xl={12}>
//                                 <Grid item xs={12}>
//                                     <Divider textAlign="center">
//                                         <Chip label="Master Layout Images" />
//                                     </Divider>
//                                     <br />
//                                 </Grid>
//                                 <div style={{ border: "1px dotted #cbcbcb", padding: "10px" }}>
//                                     <Grid container direction="row"
//                                         justifyContent="space-between"
//                                         alignItems="stretch">
//                                         <Grid item md={8}>
//                                             <Dropzone onDrop={e => uploadMasterPlanLayouts(e[0])} maxFiles={1} md={8}>
//                                                 {({ getRootProps, getInputProps }) => (
//                                                     <section xs={12}>
//                                                         <div {...getRootProps()} xs={12}>
//                                                             <input {...getInputProps()} xs={12} />
//                                                             <Button fullWidth xs={12} style={{ height: '170px', width: '80hw', border: 'none', color: '#828282' }} startIcon={<CloudUpload />} variant="outlined">Drag and Drop a file here or click (Single)</Button>
//                                                         </div>
//                                                     </section>
//                                                 )}
//                                             </Dropzone>
//                                         </Grid>
//                                         <Grid item md={4}>
//                                             <Stack direction={'column'} style={{ height: '180px', overflowY: 'scroll' }} >
//                                                 {
//                                                     formik.values.masterPlanImg.map((e, i) => (
//                                                         <Stack direction={'row'} justifyContent="space-between" key={i}>
//                                                             <a href={`https://${s3Url}.s3.amazonaws.com/public/${e}`} rel="noopener noreferrer" style={{ textDecoration: 'none' }} target="_blank">
//                                                                 <Button size="small" startIcon={<AttachmentIcon />}>{e.split('/')[3]}</Button>
//                                                             </a>
//                                                             <IconButton aria-label="delete" color='error' size="small" onClick={() => deleteMasterImage(i)}>
//                                                                 <DeleteIcon fontSize="10px" />
//                                                             </IconButton>
//                                                         </Stack>
//                                                     ))
//                                                 }
//                                             </Stack>
//                                         </Grid>
//                                     </Grid>
//                                 </div>
//                             </Grid>

//                             <Grid item xs={12} sm={12} md={12} xl={12}>
//                                 <Grid item xs={12}>
//                                     <Divider textAlign="center">
//                                         <Chip label="Floor Plans" />
//                                     </Divider>
//                                     <br />
//                                 </Grid>
//                                 <div style={{ border: "1px dotted #cbcbcb", padding: "10px" }}>
//                                     <Grid container direction="row"
//                                         justifyContent="space-between"
//                                         alignItems="stretch">
//                                         <Grid item md={8}>
//                                             <Dropzone onDrop={(file) => uploadFloorPlan(file[0])} maxFiles={1} md={8}>
//                                                 {({ getRootProps, getInputProps }) => (

//                                                     <section xs={12}>
//                                                         <div {...getRootProps()} xs={12}>
//                                                             <input {...getInputProps()} xs={12} />
//                                                             <Button fullWidth xs={12} style={{ height: '170px', width: '80hw', border: 'none', color: '#828282' }} startIcon={<CloudUpload />} variant="outlined">Click or drag file to this area to upload (Single Image)</Button>
//                                                         </div>
//                                                     </section>
//                                                 )}
//                                             </Dropzone>
//                                         </Grid>
//                                         <Grid item md={4}>
//                                             {
//                                                 formik.values.floorPlan &&
//                                                 <Stack direction={'column'} style={{ height: '170px', overflowY: 'scroll' }} >
//                                                     {
//                                                         formik.values.floorPlan.map((e, i) => (
//                                                             <Stack direction={'row'} justifyContent="space-between" key={i}>
//                                                                 <a href={`https://${s3Url}.s3.amazonaws.com/public/${e}`} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer"><Button size="small" startIcon={<AttachmentIcon />}>{e.split('/')[3]}</Button></a>
//                                                                 <IconButton aria-label="delete" color='error' size="small" onClick={() => deleteFloorPlanImg(i)}>
//                                                                     <DeleteIcon fontSize="10px" />
//                                                                 </IconButton>
//                                                             </Stack>
//                                                         ))
//                                                     }
//                                                 </Stack>
//                                             }
//                                         </Grid>
//                                     </Grid>
//                                 </div>
//                             </Grid>

//                             <Grid item xs={12} sm={12} md={12} xl={12}>
//                                 <Grid item xs={12}>
//                                     <Divider textAlign="center">
//                                         <Chip label="Broucher" />
//                                     </Divider>
//                                     <br />
//                                 </Grid>
//                                 <div style={{ border: "1px dotted #cbcbcb", padding: "10px" }}>
//                                     <Grid container direction="row"
//                                         justifyContent="space-between"
//                                         alignItems="stretch">
//                                         <Grid item md={8}>
//                                             <Dropzone onDrop={(file) => uploadBroucher(file[0])} maxFiles={1} md={8}>
//                                                 {({ getRootProps, getInputProps }) => (
//                                                     <section xs={12}>
//                                                         <div {...getRootProps()} xs={12}>
//                                                             <input {...getInputProps()} xs={12} />
//                                                             <Button fullWidth xs={12} style={{ height: '100px', width: '80hw', border: 'none', color: '#828282' }} startIcon={<CloudUpload />} variant="outlined">Click or drag file to this area to upload (Single PDF file)</Button>
//                                                         </div>
//                                                     </section>
//                                                 )}
//                                             </Dropzone>
//                                         </Grid>
//                                         <Grid item md={4}>
//                                             {
//                                                 formik.values.broucher &&
//                                                 <Stack direction={'column'} style={{ height: '100px', overflowY: 'scroll' }} >
//                                                     <Stack direction={'row'} justifyContent="space-between">
//                                                         <a href={`https://${s3Url}.s3.amazonaws.com/public/${formik.values.broucher}`} style={{ textDecoration: 'none' }} rel="noopener noreferrer" target="_blank"><Button size="small" startIcon={<AttachmentIcon />}>{formik.values.broucher.split('/')[3]}</Button></a>
//                                                         {!formik.values.broucher && <IconButton aria-label="delete" color='error' size="small" onClick={deleteBroucher}>
//                                                             <DeleteIcon fontSize="10px" />
//                                                         </IconButton>}
//                                                     </Stack>
//                                                 </Stack>
//                                             }
//                                         </Grid>
//                                     </Grid>
//                                 </div>
//                             </Grid>

//                             <Grid item xs={12} sm={12} md={12} xl={12}>
//                                 <Grid item xs={12}>

//                                     <Divider textAlign="center">
//                                         <Chip label="Offers" />
//                                     </Divider>
//                                     <br />
//                                 </Grid>
//                                 <div style={{ border: "1px dotted #cbcbcb", padding: "10px" }}>
//                                     <Grid container direction="row"
//                                         justifyContent="space-between"
//                                         alignItems="stretch">
//                                         <Grid item md={8}>
//                                             <Dropzone onDrop={(file) => uploadMainImage(file[0], 'offers')} maxFiles={1} md={8}>
//                                                 {({ getRootProps, getInputProps }) => (
//                                                     <section xs={12}>
//                                                         <div {...getRootProps()} xs={12}>
//                                                             <input {...getInputProps()} xs={12} />
//                                                             <Button fullWidth xs={12} style={{ height: '100px', width: '80hw', border: 'none', color: '#828282' }} startIcon={<CloudUpload />} variant="outlined">Click or drag file to this area to upload (Single Image)</Button>
//                                                         </div>
//                                                     </section>
//                                                 )}
//                                             </Dropzone>
//                                         </Grid>
//                                         <Grid item md={4}>
//                                             {
//                                                 formik.values.offersImg &&
//                                                 <Stack direction={'column'} style={{ height: '100px', overflowY: 'scroll' }} >
//                                                     <Stack direction={'row'} justifyContent="space-between">
//                                                         <a href={`https://${s3Url}.s3.amazonaws.com/public/${formik.values.offersImg}`} rel="noopener noreferrer" style={{ textDecoration: 'none' }} target="_blank"><Button size="small" startIcon={<AttachmentIcon />}>{formik.values.offersImg.split('/')[3]}</Button></a>
//                                                         {!formik.values.id && <IconButton aria-label="delete" color='error' size="small" onClick={deleteOffers}>
//                                                             <DeleteIcon fontSize="10px" />
//                                                         </IconButton>}
//                                                     </Stack>
//                                                 </Stack>
//                                             }
//                                         </Grid>
//                                     </Grid>
//                                 </div>
//                             </Grid>

//                             {
//                                 formik.values.id && formik.values.about && <>

//                                     <Grid item xs={12}>

//                                         <Divider textAlign="center">
//                                             <Chip label="About Property" />
//                                         </Divider>

//                                     </Grid>
//                                     <Grid item xs={12} >
//                                         <Editor html={formik.values.about} updateHtml={(html) => formik.setFieldValue('about', html)} />
//                                     </Grid></>
//                             }
//                             {
//                                 (!formik.values.id) && <>

//                                     <Grid item xs={12}>

//                                         <Divider textAlign="center">
//                                             <Chip label="About Property" />
//                                         </Divider>

//                                     </Grid>
//                                     <Grid item xs={12} >
//                                         <Editor html={formik.values.about} updateHtml={(html) => formik.setFieldValue('about', html)} />
//                                     </Grid></>
//                             }
//                             <Grid item md={12} sm={12} xs={12} >
//                                 <Divider textAlign="center">
//                                     <Chip label="Unit Details" />
//                                 </Divider>
//                                 <br />
//                                 <Stack direction={'column'} spacing={3} sx={{ mt: 0.7 }}>
//                                     {
//                                         formik.values.typeAreaDetails && formik.values.typeAreaDetails.map((data, index) => {
//                                             return (
//                                                 <Stack direction={{ md: 'row', sm: 'column' }} md={12} xs={12} spacing={1} key={index}>
//                                                     <TextField label="Unit Type" name={`typeAreaDetails.${index}.unitType`} fullWidth xs={7} md={6} size="small"
//                                                         value={formik.values.typeAreaDetails[index].unitType} onChange={formik.handleChange} />
//                                                     <TextField label="Size in Sq.ft" name={`typeAreaDetails.${index}.size`} fullWidth xs={7} md={6} size="small"
//                                                         value={formik.values.typeAreaDetails[index].size} onChange={formik.handleChange} />
//                                                     <TextField label="Approx. Final Price" name={`typeAreaDetails.${index}.price`} fullWidth xs={7} md={6} size="small"
//                                                         value={formik.values.typeAreaDetails[index].price} onChange={formik.handleChange} />
//                                                     <Button xs={1} variant="outlined" onClick={addNewUnit} size="small"><AddIcon /></Button>
//                                                     <Button xs={1} variant="outlined" size="small" onClick={() => removeUnit(index)} color="error"><RemoveIcon /></Button>
//                                                 </Stack>
//                                             )
//                                         })
//                                     }
//                                 </Stack>
//                             </Grid>

//                             <Grid item xs={12}>

//                                 <Divider textAlign="center">
//                                     <Chip label="Builder info" />
//                                 </Divider>
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField label="Builder Name" variant="outlined"
//                                     id="builderName" name="builderName" value={formik.values.builderName} onChange={formik.handleChange}
//                                     error={formik.touched.builderName && Boolean(formik.errors.builderName)}
//                                     helperText={formik.touched.builderName && formik.errors.builderName}
//                                     fullWidth />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={6} xl={6}>
//                                 <TextField multiline maxRows={4} label="About Builder" variant="outlined"
//                                     id="aboutBuilder" name="aboutBuilder" value={formik.values.aboutBuilder} onChange={formik.handleChange}
//                                     error={formik.touched.aboutBuilder && Boolean(formik.errors.aboutBuilder)}
//                                     helperText={formik.touched.aboutBuilder && formik.errors.aboutBuilder}
//                                     fullWidth />
//                             </Grid>


//                             <Grid item md={12} sm={12} xs={12}>

//                                 <Divider textAlign="center">
//                                     <Chip label="Configurations" />
//                                 </Divider>
//                                 <br />
//                                 <Stack direction={'column'} spacing={3} sx={{ mt: 0.7 }}>
//                                     {
//                                         formik.values.configurations && formik.values.configurations.map((data, index) => {
//                                             return (
//                                                 <Stack key={index} direction={{ md: 'row', sm: 'column' }} md={6} xs={12} spacing={1}>
//                                                     <FormControl fullWidth size="small">
//                                                         <InputLabel id="demo-simple-select-autowidth-label">Configuration</InputLabel>
//                                                         <Select label="Configuration" value={formik.values.configurations[index].id}
//                                                             name={`configurations.${index}.id`} onChange={formik.handleChange}>
//                                                             {
//                                                                 allConfigs.map((e) => (
//                                                                     <MenuItem value={e.id}>{e.name}</MenuItem>
//                                                                 ))
//                                                             }
//                                                         </Select>
//                                                     </FormControl>
//                                                     <TextField name={`configurations.${index}.value`}
//                                                         label="Value" variant="outlined" fullWidth xs={7} size="small"
//                                                         value={formik.values.configurations[index].value} onChange={formik.handleChange} />
//                                                     <Button xs={1} variant="outlined" onClick={addNewConfig} size="small"><AddIcon /></Button>
//                                                     <Button xs={1} variant="outlined" size="small" color="error" onClick={() => removeConfiguration(index)}><RemoveIcon /></Button>
//                                                 </Stack>
//                                             )
//                                         })
//                                     }
//                                 </Stack>
//                             </Grid>
//                             <br /><br />
//                             <Grid item md={12} sm={12} xs={12}>

//                                 <Divider textAlign="center">
//                                     <Chip label="Specifications" />
//                                 </Divider>
//                                 <br />
//                                 <Stack direction={'column'} spacing={3} sx={{ mt: 0.7 }}>
//                                     {
//                                         formik.values.specifications && formik.values.specifications.map((data, index) => {
//                                             return (
//                                                 <Stack key={index} direction={{ md: 'row', sm: 'column' }} md={12} xs={12} spacing={1}>
//                                                     <FormControl fullWidth size="small">
//                                                         <InputLabel id="demo-simple-select-autowidth-label">Specification</InputLabel>
//                                                         <Select label="Specification" value={formik.values.specifications[index].id} name={`specifications.${index}.id`} onChange={formik.handleChange}>
//                                                             {
//                                                                 allSpec.map((e) => (
//                                                                     <MenuItem value={e.id}>{e.name}</MenuItem>
//                                                                 ))
//                                                             }
//                                                         </Select>
//                                                     </FormControl>
//                                                     <TextField label="value" name={`specifications.${index}.value`} fullWidth xs={7} md={6} size="small"
//                                                         value={formik.values.specifications[index].value} onChange={formik.handleChange} />
//                                                     <Button xs={1} variant="outlined" onClick={addNewSpecification} size="small"><AddIcon /></Button>
//                                                     <Button xs={1} variant="outlined" size="small" onClick={() => removeSpecification(index)} color="error"><RemoveIcon /></Button>
//                                                 </Stack>
//                                             )
//                                         })
//                                     }
//                                 </Stack>
//                             </Grid>
//                             <Grid item md={12} sm={12} xs={12} >
//                                 <Divider textAlign="center">
//                                     <Chip label="FAQ" />
//                                 </Divider>
//                                 <br />
//                                 <Stack direction={'column'} spacing={3} sx={{ mt: 0.7 }}>
//                                     {
//                                         formik.values.faq && formik.values.faq.map((data, index) => {
//                                             return (
//                                                 <Stack key={index} direction={{ md: 'row', sm: 'column' }} md={12} xs={12} spacing={1}>
//                                                     <TextField label="Question" name={`faq.${index}.question`} fullWidth xs={7} md={6} size="small"
//                                                         value={formik.values.faq[index].question} onChange={formik.handleChange} />
//                                                     <TextField label="Answer" name={`faq.${index}.answer`} fullWidth xs={7} md={6} size="small"
//                                                         value={formik.values.faq[index].answer} onChange={formik.handleChange} />
//                                                     <Button xs={1} variant="outlined" onClick={addNewFAQ} size="small"><AddIcon /></Button>
//                                                     <Button xs={1} variant="outlined" size="small" onClick={() => removeFaq(index)} color="error"><RemoveIcon /></Button>
//                                                 </Stack>
//                                             )
//                                         })
//                                     }
//                                 </Stack>
//                             </Grid>
//                             <br />
//                             <Grid item md={6} sm={6} xs={6} style={{ marginLeft: 'auto' }}>
//                                 <Stack direction={'row'} spacing={1} md={12}>
//                                     <Button color="primary" variant="contained"
//                                         startIcon={<SaveIcon />} fullWidth onClick={formik.submitForm} >
//                                         Submit
//                                     </Button>
//                                     <Button fullWidth startIcon={<CancelIcon />}>Cancel</Button>
//                                 </Stack>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 </Grid >
//             </div >
//         </React.Fragment >
//     )
// }
// export default Create;
