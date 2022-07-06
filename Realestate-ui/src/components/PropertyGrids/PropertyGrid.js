import React, {useEffect, useState} from 'react';
import LeafletMap from '../LeafletMap';
import {Grid} from '@mui/material';
import GridView from '../GridView';
import SecondMenuBar from '../SecondMenuBar';
import {getAllProperties} from './../Api';
import MenuBar from '../MenuBar';
import Filters from '../Filters';
import UserLogin from '../signin/UserLogin';

const PropertyGrid = () => {

    const [allProp, setAllProp] = useState([]);

    const [viewMap, setViewMap] = useState(false);
    const [viewLoginModel, setViewLoginmodel] = useState(true)
    // let map = useMap();

    const switchView = (value) => {
        setViewMap(value);
    }

    const closeViewLoginModel = () => {
        setViewLoginmodel(false);
    }
    const getProperties = () => {
        getAllProperties().then(res => {
            setAllProp(res.data.listProperties.items);
        })
    }

    useEffect(() => {
        getProperties();
    }, []);

    return (
        <React.Fragment>
            <MenuBar />
            <SecondMenuBar switchView={switchView} />
            { viewLoginModel &&
                <UserLogin closeViewLoginModel={closeViewLoginModel}/>
            }
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                spacing={2}
            >
                <Grid item md={3} xs={12}>
                    <Filters />
                </Grid>
                {
                    <Grid item md={9} xs={12}>
                        {
                            viewMap && <GridView properties={allProp} />
                        }
                        {
                            (!viewMap) && <LeafletMap properties={allProp} />
                        }
                    </Grid>
                }
            </Grid>
        </React.Fragment>

    )
}

export default PropertyGrid;