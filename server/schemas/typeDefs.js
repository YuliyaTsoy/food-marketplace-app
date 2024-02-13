const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    storeName: String!
    store: [Product]
    orders: [Product]
}

type Image {
    _id: ID
    name: String!
    type: String!
    data: String!
}

type Product {
    _id: ID
    name: String
    price: Float
    description: String
    image: String
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


type Query {
    product(_id: ID!): Product
    products: [Product]
    productSearch(searchQuery: String!): [Product]
    users: [User]
    user: User
    categories: [Category]
    myStore: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!, storeName: String!): Auth
    addOrder(productId: ID!): User
    login(email: String!, password: String!): Auth
    addProduct(name: String!, price: Float!, description: String!, category: ID!): Product
    deleteProduct(productId: ID!): User
    addCategory(name: String!): Category
    uploadImage(name: String, type: String, data: String): Image
    updateProduct(_id: ID!, name: String!, price: Float!, description: String!, category: ID!): Product
}

`;

module.exports = typeDefs;
