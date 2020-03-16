import gql from 'graphql-tag';

export const GET_TVS = gql`
  query {
    tvs {
      title
    }
  }
`