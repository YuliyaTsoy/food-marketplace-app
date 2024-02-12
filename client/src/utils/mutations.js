import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        store {
          _id
          storeName
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
          }
        }
        orders {
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
          store {
            storeName
          }
        }
      }
    }
  }
`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!, $storeName: String!) {
    addUser(username: $username, email: $email, password: $password, storeName: $storeName) {
      token
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
