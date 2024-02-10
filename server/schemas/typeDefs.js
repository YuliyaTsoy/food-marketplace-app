const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    store: Store
    orders: [Product]
}

type Store {
    _id: ID
    storeOwner: User!
    storeName: String!
    products: [Product]
}

type Product {
    _id: ID
    name: String
    price: Float
    description: String
    image: String
    store: Store
    dateListed: String
    category: Category
}

type Category {
    _id: ID
    name: String
}

type Auth {
    token: String!
    user: User
}

input OrderInput {
    name: String!
    price: String!
    productId: ID!
    storeId: ID!
    categoryId: ID!
  }

type Query {
    product(_id: ID!): Product
    products(category: ID, name: String): [Product]
    users: [User]
    user: User
    categories: [Category]
    store(_id: ID!): Store
    stores: [Store]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(orderData: OrderInput!): User
    login(email: String!, password: String!): Auth
    addProduct(name: String!, price: Float!, description: String!, category: ID!): Product
    createStore(storeName: String!, storeOwner: String!): Store
    addCategory(name: String!): [Category]
}

`;

module.exports = typeDefs;
