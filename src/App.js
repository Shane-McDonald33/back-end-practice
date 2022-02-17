import React, {useState} from 'react';

import MoviesList from './Components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]); //setting the state to have the movie list ready to be stored and then called
  function fetchMoviesHandler() { //setting the fetch request
    fetch('https://swapi.dev/api/films') //url to fetch
    .then(response => { //the response promise
      return response.json(); //data returned in json format
    }).then(data => { //what we're doing with the data
      const transformedMovies = data.results.map((movieData) => { //mapping through the data (data.results being the actual data ("data" is a place holder))
        return {
          id: movieData.episode_id, //how we want the data to be called
          title: movieData.title, //how we want the data to be called
          openingText: movieData.opening_crawl, //how we want the data to be called (i.e. opening_crawl will be mapped through as openingText)
          releaseDate: movieData.release_date //how we want the data to be called
        }
      });
      setMovies(transformedMovies); //set the state (data returned) in the app
    })
    // note the movies props in MovieList component is the state and we're using it as a prop here, so the state of the movies can be called and used as props, 
    //in this case movies are the url of json info*//> 
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
