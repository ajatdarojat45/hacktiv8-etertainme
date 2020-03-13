const {ApolloServer} = require('apollo-server');
const movie = require('./schemas/movie');
const tv = require('./schemas/tv');

const typeDefs = `
  type Query
  type Mutation
`

const schema = {
  typeDefs: [typeDefs, tv.typeDefs, movie.typeDefs],
  resolvers: [tv.resolvers, movie.resolvers]
}

const server = new ApolloServer(schema);

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});