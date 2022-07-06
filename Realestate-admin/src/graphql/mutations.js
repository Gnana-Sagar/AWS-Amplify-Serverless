/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMenuBar = /* GraphQL */ `
  mutation CreateMenuBar(
    $input: CreateMenuBarInput!
    $condition: ModelMenuBarConditionInput
  ) {
    createMenuBar(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateMenuBar = /* GraphQL */ `
  mutation UpdateMenuBar(
    $input: UpdateMenuBarInput!
    $condition: ModelMenuBarConditionInput
  ) {
    updateMenuBar(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteMenuBar = /* GraphQL */ `
  mutation DeleteMenuBar(
    $input: DeleteMenuBarInput!
    $condition: ModelMenuBarConditionInput
  ) {
    deleteMenuBar(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createConfigurations = /* GraphQL */ `
  mutation CreateConfigurations(
    $input: CreateConfigurationsInput!
    $condition: ModelConfigurationsConditionInput
  ) {
    createConfigurations(input: $input, condition: $condition) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const updateConfigurations = /* GraphQL */ `
  mutation UpdateConfigurations(
    $input: UpdateConfigurationsInput!
    $condition: ModelConfigurationsConditionInput
  ) {
    updateConfigurations(input: $input, condition: $condition) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const deleteConfigurations = /* GraphQL */ `
  mutation DeleteConfigurations(
    $input: DeleteConfigurationsInput!
    $condition: ModelConfigurationsConditionInput
  ) {
    deleteConfigurations(input: $input, condition: $condition) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const createSpecifications = /* GraphQL */ `
  mutation CreateSpecifications(
    $input: CreateSpecificationsInput!
    $condition: ModelSpecificationsConditionInput
  ) {
    createSpecifications(input: $input, condition: $condition) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const updateSpecifications = /* GraphQL */ `
  mutation UpdateSpecifications(
    $input: UpdateSpecificationsInput!
    $condition: ModelSpecificationsConditionInput
  ) {
    updateSpecifications(input: $input, condition: $condition) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const deleteSpecifications = /* GraphQL */ `
  mutation DeleteSpecifications(
    $input: DeleteSpecificationsInput!
    $condition: ModelSpecificationsConditionInput
  ) {
    deleteSpecifications(input: $input, condition: $condition) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const createAmenities = /* GraphQL */ `
  mutation CreateAmenities(
    $input: CreateAmenitiesInput!
    $condition: ModelAmenitiesConditionInput
  ) {
    createAmenities(input: $input, condition: $condition) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const updateAmenities = /* GraphQL */ `
  mutation UpdateAmenities(
    $input: UpdateAmenitiesInput!
    $condition: ModelAmenitiesConditionInput
  ) {
    updateAmenities(input: $input, condition: $condition) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const deleteAmenities = /* GraphQL */ `
  mutation DeleteAmenities(
    $input: DeleteAmenitiesInput!
    $condition: ModelAmenitiesConditionInput
  ) {
    deleteAmenities(input: $input, condition: $condition) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const createProperty = /* GraphQL */ `
  mutation CreateProperty(
    $input: CreatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    createProperty(input: $input, condition: $condition) {
      id
      propertyName
      location
      city
      favourite
      videoLink
      price
      viewCount
      propertyType
      builderName
      aboutBuilder
      about
      masterPlanImg
      offersImg
      tags
      amenities
      lat
      lon
      propertyImg
      configurations {
        id
        value
      }
      specifications {
        id
        value
      }
      typeAreaDetails {
        unitType
        size
        price
      }
      faq {
        question
        answer
      }
      s3Uuid
      broucher
      floorPlan
      createdAt
      updatedAt
    }
  }
`;
export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty(
    $input: UpdatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    updateProperty(input: $input, condition: $condition) {
      id
      propertyName
      location
      city
      favourite
      videoLink
      price
      viewCount
      propertyType
      builderName
      aboutBuilder
      about
      masterPlanImg
      offersImg
      tags
      amenities
      lat
      lon
      propertyImg
      configurations {
        id
        value
      }
      specifications {
        id
        value
      }
      typeAreaDetails {
        unitType
        size
        price
      }
      faq {
        question
        answer
      }
      s3Uuid
      broucher
      floorPlan
      createdAt
      updatedAt
    }
  }
`;
export const deleteProperty = /* GraphQL */ `
  mutation DeleteProperty(
    $input: DeletePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    deleteProperty(input: $input, condition: $condition) {
      id
      propertyName
      location
      city
      favourite
      videoLink
      price
      viewCount
      propertyType
      builderName
      aboutBuilder
      about
      masterPlanImg
      offersImg
      tags
      amenities
      lat
      lon
      propertyImg
      configurations {
        id
        value
      }
      specifications {
        id
        value
      }
      typeAreaDetails {
        unitType
        size
        price
      }
      faq {
        question
        answer
      }
      s3Uuid
      broucher
      floorPlan
      createdAt
      updatedAt
    }
  }
`;
