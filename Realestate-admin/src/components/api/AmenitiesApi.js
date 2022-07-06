import { deleteAmenities, updateAmenities, createAmenities } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { listAmenities } from "../../graphql/queries";

export const deleteAmenitiesApi = async (input) => {
    return await API.graphql(graphqlOperation(deleteAmenities, { input }));
}

export const getAllAmenitiesApi = async () => {
    return await API.graphql(graphqlOperation(listAmenities));
}

export const updateAmenitiesApi = async (input) => {
    return await API.graphql(graphqlOperation(updateAmenities, { input }));
}

export const createAmenitiesApi = async (input) => {
    return API.graphql(graphqlOperation(createAmenities, { input }));
}
