import {API, graphqlOperation} from "aws-amplify";
import {getProperty, listAmenities, listConfigurations, listProperties, listSpecifications} from "../graphql/queries";


export const getAllProperties = async() => {
    return await API.graphql(graphqlOperation(listProperties));
}

export const getPropertyDetails = async(id) => {
    return await API.graphql(graphqlOperation(getProperty, {'id': id}))
}

export const getConfigurations = async() => {
    return await API.graphql(graphqlOperation(listConfigurations))
}

export const getSpecifications = async() => {
    return await API.graphql(graphqlOperation(listSpecifications));
}

export const getAmenities = async() => {
    return await API.graphql(graphqlOperation(listAmenities));
}
