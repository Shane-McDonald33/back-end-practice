import React, {useState} from 'react';

import MoviesList from './Components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]); //setting the state to have the movie list ready to be stored and then called
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function fetchMoviesHandler() { //setting the fetch request
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films') //url to fetch
      if (!response.ok) {
        throw new Error('Something Went Wrong')
      }  
      const data = await response.json(); //data returned in json format
      const transformedMovies = data.results.map((movieData) => { //mapping through the data (data.results being the actual data ("data" is a place holder))
          return {
            id: movieData.episode_id, //how we want the data to be called
            title: movieData.title, //how we want the data to be called
            openingText: movieData.opening_crawl, //how we want the data to be called (i.e. opening_crawl will be mapped through as openingText)
            releaseDate: movieData.release_date //how we want the data to be called
          }
        });
        setMovies(transformedMovies); //set the state (data returned) in the app
      // note the movies props in MovieList component is the state and we're using it as a prop here, so the state of the movies can be called and used as props, 
      //in this case movies are the url of json info*//> 
      setIsLoading(false)
    }
       catch (error) {
      setError(error.message);
    }
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No Movies Found</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
//line 34 is wrapped in curlys so that we can wrap it in js code and keep it in jsx rendering.
//Cont'd, '!isLoading' is used bc we're telling the code that if state is not active then render what is current,
//Line 35, telling the code that if state is not active if the list is non-existent then say 'no movies found'
//Line 36 tells the code that if state is active then run a load text
