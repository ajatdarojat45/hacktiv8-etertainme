import React from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_MOVIES} from '../graphql/schemas/movieSchema';
import gql from 'graphql-tag'
import {ADD_FAVORITE} from '../graphql/schemas/favoriteSchema';

export default () => {
  const {loading, error, data} = useQuery(GET_MOVIES);
  const [addFavorite] = useMutation(ADD_FAVORITE);

  const addToFavorite = (movie) => {    
    addFavorite({variables: {title: movie.title}})
  }

  if (loading) return <p>Loading...</p>
  return(
    <div>
      Movie Page
      <br/>
      <ul>
        {data.movies.map((movie, i) => {
          return(
            <li key={i} onClick={() => addToFavorite(movie)}>
              {movie.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}