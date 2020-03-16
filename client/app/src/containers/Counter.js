import React from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_COUNTER, ADD_COUNTER } from '../graphql/schemas/counterSchema';

export default () => {
  const {error, loading, data} = useQuery(GET_COUNTER);
  const [addCounter] = useMutation(ADD_COUNTER)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>error</div>
  }
  return(
    <div>
      <h1>Counter Page</h1>
      <p>Counter : {data.counter}</p>
      <button onClick={() => addCounter()}>Add Counter</button>
    </div>
  )
}