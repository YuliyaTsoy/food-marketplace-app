import { gql } from "@apollo/client";

// get all users
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

// get one user
export const USER = gql`
  query User($id: ID!) {
    user(_id: $id) {
      _id
      email
      storeName
      username
      store {
        _id
        name
      }
      orders {
        _id
        name
        price
        dateListed
        description
        image
      }
    }
  }
`;
//get the user's store logged in to render
export const GET_MYSTORE = gql`
  query MyStore {
    myStore {
      _id
      storeName
      store {
        _id
        name
        description
        dateListed
        price
      }
    }
  }
`;
export const GET_ALL_PRODUCTS = gql`
  query allProducts {
    products {
      _id
      category {
        _id
        name
      }
      dateListed
      description
      image
      name
      price
      lister {
        _id
        storeName
      }
    }
  }
`;

export const GET_ONE_PRODUCT = gql`
  query oneProduct($id: ID!) {
    product(_id: $id) {
      _id
      category {
        _id
        name
      }
      lister {
        _id
        storeName
      }
      description
      dateListed
      image
      price
      name
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

export const GET_PRODUCTS_FROM_SEARCH = gql`
query ProductSearch($searchQuery: String!) {
  productSearch(searchQuery: $searchQuery) {
    _id
    name
    description
    image
    price
    lister {
      _id
      storeName
    }
    category {
      _id
      name
    }
  }
}
`;
