const {gql} = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  scalar Array

  type Movie{
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: Array
  },

  extend type Query{
    movies: [Movie]
  }

  extend type Mutation{
    addMovie(
      title: String, 
      overview: String,
      poster_path: String
      tags: Array
    ): Movie
  }
`;

const url = "http://localhost:3000/movie"

const resolvers = {
  Query: {
    movies: async (arent, args, context, info) => {
      let {data} = await axios.get(`${url}`)
      return data;
    },
  },

  Mutation: {
    addMovie: async (parent, args, context, info) => {
      const body = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        tags: args.tags
      }
      let {data} = await  axios.post(`${url}/store`, body);
      return data[0]
    },

  }
};

module.exports = {typeDefs, resolvers}