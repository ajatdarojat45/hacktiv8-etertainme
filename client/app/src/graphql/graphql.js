import ApolloClient, {gql} from 'apollo-boost';
import {GET_COUNTER} from './schemas/counterSchema';
import {GET_FAVORITES} from './schemas/favoriteSchema';

export default new ApolloClient({
  uri: "http://localhost:4000/",
  clientState: {

    resolvers: {
      Mutation: {
        addCounter(_, variable, client) {
          const {counter} = client.cache.readQuery({query: GET_COUNTER})
          const newCounter = counter + 1
          client.cache.writeData({data: {counter: counter + 1}})
          return newCounter
        },

        addFavorite(_, variable, client){
          const {favorites} = client.cache.readQuery({query: GET_FAVORITES});
          const newFavorite = {__typename: "favorite", title: variable.title}
          const newFavorites = favorites.concat(newFavorite);
          client.cache.writeData({data: {favorites: newFavorites}})
          return newFavorite;
        }
      }
    },

    defaults: {
      counter: 0,
      favorites: []
    }
  }
})