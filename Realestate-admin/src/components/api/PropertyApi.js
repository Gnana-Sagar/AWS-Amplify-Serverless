import { updateProperty, deleteProperty, createProperty } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { listProperties, getProperty, geValue } from "../../graphql/queries";

export const updatePropertyApi = async(input) => {
    return await API.graphql(graphqlOperation(updateProperty, {input}));
}
export const getAllPropertyApi = async() => {
    return await API.graphql(graphqlOperation(listProperties));
}
export const deletePropertyApi = async(input) => {
    return await API.graphql(graphqlOperation(deleteProperty, {input}));
}
export const createPropertyApi = async(input) => {
    return API.graphql(graphqlOperation(createProperty, { input }));
}
export const getPropertyApi = (id) => {
    return API.graphql(graphqlOperation(getProperty, id));
}
export const getValuesLamda = () => {
    return API.graphql(graphqlOperation(geValue));
}