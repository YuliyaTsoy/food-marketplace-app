import { gql } from '@apollo/client';

//get the user's store logged in to render

export const GET_MYSTORE = gql`
query MyStore {
  myStore {
    _id
    username
    store {
      storeName
      products {
        _id
        name
        description
        image
        dateListed
        price
        category {
          _id
          name
        }
      }
    }
  }
}`;
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


