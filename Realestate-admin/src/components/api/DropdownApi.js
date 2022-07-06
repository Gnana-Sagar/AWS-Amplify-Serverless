import { deleteMenuBar, updateMenuBar, createMenuBar } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { listMenuBars } from "../../graphql/queries";

export const updateMenuApi = async(input) => {
    return await API.graphql(graphqlOperation(updateMenuBar, {input}));
}

export const getAllApi = async() => {
    return await API.graphql(graphqlOperation(listMenuBars));
}
export const deleteMenuApi = async(input) => {
    return await API.graphql(graphqlOperation(deleteMenuBar, {input}));
}
export const createMenuApi = async(input) => {
    return API.graphql(graphqlOperation(createMenuBar, { input }));
}
