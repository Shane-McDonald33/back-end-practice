import React, {useState} from 'react';

import MoviesList from './Components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]); //setting the state to have the movie list ready to be stored and then called
  const [isLoading, setIsLoading] = useState(false)
  async function fetchMoviesHandler() { //setting the fetch request
    setIsLoading(true); // changing the data response state to true, 
    const response = await fetch('https://swapi.dev/api/films') //url to fetch, await used to automatically infer the .then(response) portion of the promise, setting it as a constant
    const data =  await response.json(); //data returned in json format, the await taking care of the .then(response) portiong of the promise
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
    setIsLoading(false); //resetting the changed state back to original state bc we're no longer dealing with changed state
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found No Movies</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
// line 33, wrapped the component in curly braces to include JS code. Here, we tell the component that if state is currently loading data, show the list.
//That is accomplished asynchronously via the movies state and map function mapping through movies state.
//line 34, telling the app that if state 'isLoading' is active, don't render the list and show the paragraph on the page. 