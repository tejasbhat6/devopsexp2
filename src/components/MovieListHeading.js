import React from 'react'

const MovieListHeading = (props) => {
  return (
    // Display titles of the movies
    <div className='col'>
        <h1>{props.heading}</h1>
    </div>
  )
}

export default MovieListHeading