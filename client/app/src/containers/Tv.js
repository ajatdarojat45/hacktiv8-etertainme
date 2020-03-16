import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_TVS} from '../graphql/schemas/tvSchema'

export default () => {
  const {loading, error, data} = useQuery(GET_TVS);

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>error</div>
  }
  
  return(
    <div>
      Tv Series
      <ul>
        {
          data.tvs.map((tv, i) => {
            return(
              <li key={i}>{tv.title}</li>
            )
          })
        }
      </ul>
    </div>
  )
}