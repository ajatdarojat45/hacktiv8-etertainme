import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_MOVIES, ADD_MOVIE} from '../graphql/schemas/movieSchema';
import gql from 'graphql-tag'
import {ADD_FAVORITE} from '../graphql/schemas/favoriteSchema';

export default () => {
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');

  const {loading, error, data} = useQuery(GET_MOVIES);
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [addMovie] = useMutation(ADD_MOVIE);

  const addToFavorite = (movie) => {    
    addFavorite({variables: {title: movie.title}})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const movie = {
      title: title,
      overview: overview,
      poster_path: "image.jpg",
      tags: ['test', 'tost']
    }
    addMovie({variables: movie});
    setTitle('');
    setOverview('');
    alert('success');
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
      <form onSubmit={onSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" value={overview} onChange={(e) => setOverview(e.target.value)}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}