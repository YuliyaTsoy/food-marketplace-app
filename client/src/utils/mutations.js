import { gql } from '@apollo/client';

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
            _id
            storeName
          }
        }
      }
    }
}`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }`; 