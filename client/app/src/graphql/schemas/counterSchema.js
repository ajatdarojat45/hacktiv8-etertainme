import gql from 'graphql-tag';

export const GET_COUNTER = gql`
  query {
    counter @client
  }
`

export const ADD_COUNTER = gql`
  mutation AddCounter {
    addCounter @client
  }
`;