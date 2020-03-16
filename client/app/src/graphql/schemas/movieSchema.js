import gql from 'graphql-tag';

export const GET_MOVIES = gql`
  query {
    movies {
      title
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie($title: String, $overview: String, $poster_path: String, $tags: [String]){
    addMovie(title: $title, overview: $overview, poster_path: $poster_path, tags: $tags){
      title
    }
  }
`