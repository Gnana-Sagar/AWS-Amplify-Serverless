import { deleteSpecifications, updateSpecifications, createSpecifications } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { listSpecifications } from "../../graphql/queries";

export const updateSpecificationsApi = async(input) => {
    return await API.graphql(graphqlOperation(updateSpecifications, {input}));
}

export const getAllApi = async() => {
    return await API.graphql(graphqlOperation(listSpecifications));
}

export const deleteSpecificationsApi = async(input) => {
    return await API.graphql(graphqlOperation(deleteSpecifications, {input}));
}

export const createSpecificationsApi = async(input) => {
    return API.graphql(graphqlOperation(createSpecifications, { input }));
}