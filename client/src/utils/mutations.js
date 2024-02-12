import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
        store {
          storeName
          products {
            _id
            price
            name
            image
            description
            dateListed
            category {
              _id
              name
            }
          }
        }
        orders {
          _id
          price
          name
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
        store {
          storeName
          products {
            _id
            price
            name
            image
            description
            dateListed
            category {
              _id
              name
            }
          }
        }
        orders {
          _id
          price
          name
          image
          description
          dateListed
          category {
            _id
            name
          }
          store {
            storeName
          }
        }
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder($productId: ID!) {
    addOrder(productId: $productId) {
      _id
      email
      username
      orders {
        _id
        name
        price
        category {
          _id
          name
        }
      }
      store {
        storeName
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
      category {
        _id
        name
      }
      dateListed
      description
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
