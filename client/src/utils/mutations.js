import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $email: String!
    $password: String!
    $storeName: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      storeName: $storeName
    ) {
      token
      user {
        _id
        email
        username
        storeName
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder($productId: ID!) {
    addOrder(productId: $productId) {
      _id
      orders {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $price: Float!
    $description: String!
    $category: ID!
  ) {
    addProduct(
      name: $name
      price: $price
      description: $description
      category: $category
    ) {
      _id
      lister {
        _id
        username
        email
      }
      description
      category {
        _id
        name
      }
      image
      name
      price
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      _id
      name
    }
  }
`;
