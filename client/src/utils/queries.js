import { gql } from '@apollo/client';

//get the user's store logged in to render

export const GET_MYSTORE = gql`
mutation AddUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        email
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
        username
        orders {
          _id
        }
      }
    }
}`;




