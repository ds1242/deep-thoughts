// import the GQL tagged template feature
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Query {
        helloWorld: String
    }
`;

module.exports = typeDefs;