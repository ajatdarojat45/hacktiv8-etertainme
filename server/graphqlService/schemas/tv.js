const {gql} = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Tv{
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  },

  extend type Query{
    tvs: [Tv]
  }

  extend type Mutation{
    addTv(
      title: String, 
      overview: String,
      poster_path: String
      tags: [String]
    ): Tv
  }
`;

const url = "http://localhost:3000/tv"

const resolvers = {
  Query: {
    tvs: async (arent, args, context, info) => {
      let {data} = await axios.get(`${url}`)
      return data;
    },
  },

  Mutation: {
    addTv: async (parent, args, context, info) => {
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