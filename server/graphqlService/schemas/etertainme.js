const {gql} = require('apollo-server');
const axios = require('axios');
const Redis = require("ioredis");


const redis = new Redis();

const typeDefs = gql`
  type Etertainme{
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  },

  extend type Query{
    etertainme: [Etertainme]
  }
`;

const urlMovie = "http://localhost:3001"
const urlTv = "http://localhost:3001"

const resolvers = {
  Query : {
    etertainme: async () => {
      const exist = await redis.get('etertainme');
      if (exist) {
        return JSON.parse(exist)
      }else{
        var etertainme = [];
        const tv = await axios.get(`${urlTv}`)
        etertainme = etertainme.concat(tv.data);
        const movie = await axios.get(`${urlMovie}`)
        etertainme = etertainme.concat(movie.data);
        redis.set("etertainme", JSON.stringify(etertainme))
        return etertainme;
      }
    }
  }
}

module.exports = {typeDefs, resolvers}