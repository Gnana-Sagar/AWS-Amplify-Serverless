/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const geValue = /* GraphQL */ `
  query GeValue {
    geValue
  }
`;
export const getMenuBar = /* GraphQL */ `
  query GetMenuBar($id: ID!) {
    getMenuBar(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listMenuBars = /* GraphQL */ `
  query ListMenuBars(
    $filter: ModelMenuBarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenuBars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConfigurations = /* GraphQL */ `
  query GetConfigurations($id: ID!) {
    getConfigurations(id: $id) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const listConfigurations = /* GraphQL */ `
  query ListConfigurations(
    $filter: ModelConfigurationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfigurations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        img
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSpecifications = /* GraphQL */ `
  query GetSpecifications($id: ID!) {
    getSpecifications(id: $id) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const listSpecifications = /* GraphQL */ `
  query ListSpecifications(
    $filter: ModelSpecificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpecifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        img
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAmenities = /* GraphQL */ `
  query GetAmenities($id: ID!) {
    getAmenities(id: $id) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const listAmenities = /* GraphQL */ `
  query ListAmenities(
    $filter: ModelAmenitiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAmenities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        img
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProperty = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
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
export const listProperties = /* GraphQL */ `
  query ListProperties(
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProperties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
