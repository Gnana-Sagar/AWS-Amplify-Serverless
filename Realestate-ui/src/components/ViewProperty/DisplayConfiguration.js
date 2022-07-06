import React, {useEffect, useState} from 'react';
import {getConfigurations} from '../Api';

const DisplayConfiguration = (props) => {

    const [config, setConfig] = useState([]);
    const getAllConfigurations = () => {
        getConfigurations().then(res => {
            setConfig(res.data.listConfigurations.items)
        }, err => {

        })
    }

    useEffect(() => {
        getAllConfigurations();
    }, []);

    const configurations  = props.propertyDetails;
    return (
        <>
            
        </>
    )
}

export default DisplayConfiguration;