import MovieList from "./components/MovieList";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import Favourites from "./components/Favourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {

  // Used to store array of films from the OMDB api
  const [movies, setMovies] = useState([])
  // Used to dynamically change the search(s) parameter in api url
  const [searchValue, setSearchValue] = useState('')
  // Used to store favourite movies
  const [favourites, setFavourites] = useState([])

  // Requests movies for url of the api
  const getMovieRequest = async (searchValue) => {
    // `` is used to declare template string sp ${} can be used to insert javascript in between the string
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=4d5183e5`;

    // makes a request to the url
    const response = await fetch(url);
    // Converts http response into json
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }

  // calls getMovieRequest when searchValue changes
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])
  // loads the favourite movies stored in the local storage
  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-app-favourite-movies'));
    setFavourites(movieFavourites);
  }, [])

  // Saves movie to local storage so that refresh does not lose the favourite movies
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-app-favourite-movies', JSON.stringify(items))
  }


  const uniqueid = [];

  // Adds movie into favourites
  const addFavouriteMovie = (movie) => {
    if (favourites == null) {
      const favouriteList = [movie];
      setFavourites(favouriteList);
      saveToLocalStorage(favouriteList);

    }
    else {
      const newFavouriteList = [...favourites, movie];
      const uniqueMovies = newFavouriteList.filter((m) => {
        const isduplicate = uniqueid.includes(m.imdbID)
        if (!isduplicate) {
          uniqueid.push(m.imdbID);
          return true;
        }
        return false;
      })
      setFavourites(uniqueMovies);
      saveToLocalStorage(uniqueMovies);
    }
  }
  // Removes movie from favourites
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Movies' />
        <SearchBox value={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={Favourites} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Favourites' />
      </div>
      <div className="row">
        <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} />
      </div>
    </div>
  );
}

export default App;
