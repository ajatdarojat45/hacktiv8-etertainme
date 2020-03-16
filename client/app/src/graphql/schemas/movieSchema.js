import gql from 'graphql-tag';

export const GET_MOVIES = gql`
  query {
    movies {
      title
    }
  }
`;