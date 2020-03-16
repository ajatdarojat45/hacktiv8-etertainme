import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_FAVORITES} from '../graphql/schemas/favoriteSchema';

export default () => {
  const {loading, error, data} = useQuery(GET_FAVORITES);
  
  if (loading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>Error</div>
  }
  return(
    <div>
      <h1>Favorite page</h1>
      <ul>

      </ul>
      {
        data.favorites.map((favorite, i) => {
          return <li key={i}>{favorite.title}</li>
        })
      }
    </div>
  )
}