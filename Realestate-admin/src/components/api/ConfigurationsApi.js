import { updateConfigurations, deleteConfigurations, createConfigurations } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { listConfigurations } from "../../graphql/queries";

export const updateConfigurationApi = async(input) => {
    return await API.graphql(graphqlOperation(updateConfigurations, {input}));
}

export const getAllConfigurationApi = async() => {
    return await API.graphql(graphqlOperation(listConfigurations));
}
export const deleteConfigurationsApi = async(input) => {
    return await API.graphql(graphqlOperation(deleteConfigurations, {input}));
}
export const createConfigurationsApi = async(input) => {
    return API.graphql(graphqlOperation(createConfigurations, { input }));
}