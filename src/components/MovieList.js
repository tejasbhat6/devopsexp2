import React from 'react'

const MovieList = (props) => {

  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
        {/* Displays movie poster using the link from OMDB api json having object name Poster */}

        {(props.movies !== null) ? (props.movies.map((movie, index) => (
            <div className='image-container d-flex justify-content-start m-3' key={index}>
                <img src={movie.Poster} alt={movie.Title}></img>
                <div className='overlay d-flex align-items-center justify-content-center' onClick={() => props.handleFavouritesClick(movie)}>
                  <FavouriteComponent />
                </div>
            </div>
        ))):null}
    </>
  )
}

export default MovieList