import { gql } from '@apollo/client';

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
  }`;




