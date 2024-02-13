import { gql } from "@apollo/client";

export const USERS = gql`
  query Users {
    users {
      _id
      email
      storeName
      username
      store {
        _id
        name
      }
    }
  }
`;
//get the user's store logged in to render
export const GET_MYSTORE = gql`
  query MyStore {
    myStore {
      _id
      username
      store {
        _id
        storeName
        products {
          _id
          name
          price
          image
          description
          dateListed
          category {
            _id
            name
          }
        }
      }
    }
  }
`;
export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    products {
      _id
      category {
        name
      }
      description
      image
      name
      price
      store {
        storeName
      }
    }
  }
`;

export const GET_ONE_PRODUCT = gql`
  query Product($id: ID!) {
    product(_id: $id) {
      _id
      name
      price
      description
      dateListed
      image
      category {
        name
      }
      store {
        storeName
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;
