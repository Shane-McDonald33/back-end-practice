import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './Components/MoviesList';
import AddMovie from './Components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]); //setting the state to have the movie list ready to be stored and then called
  const [isLoading, setIsLoading] = useState(false);//sets state for when data is load stage, allows to work with data in between stages
  const [error, setError] = useState(null);//setting up error calls
  const fetchMoviesHandler = useCallback(async () =>  { //setting the fetch request
    setIsLoading(true); //sets load state to true and therefore active
    setError(null);//tells the app that error is null while app loads unless an error activates
    try {
      const response = await fetch('https://react-posting-default-rtdb.firebaseio.com/movies.json') //url to fetch
      if (!response.ok) {//'response.ok' checks for http return is 200 and if not then an error is called
        throw new Error('Something Went Wrong')
      }  
      const data = await response.json(); //data returned in json format
      
      const loadedMovies = [];//sets variable to an empty array
      for (const key in data) {//key is the id paramenter in the data
        loadedMovies.push({//pushing to the app
          id:key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      
      // const transformedMovies = data.results.map((movieData) => { //mapping through the data (data.results being the actual data ("data" is a place holder))
      //   return {
      //     id: movieData.episode_id, //how we want the data to be called
      //     title: movieData.title, //how we want the data to be called
      //     openingText: movieData.opening_crawl, //how we want the data to be called (i.e. opening_crawl will be mapped through as openingText)
      //     releaseDate: movieData.release_date //how we want the data to be called
      //   }
      // });
      setMovies(loadedMovies); //set the state (data returned) in the app
      // note the movies props in MovieList component is the state and we're using it as a prop here, so the state of the movies can be called and used as props, 
      //in this case movies are the url of json info*//> 
      setIsLoading(false)
    }
    catch (error) {
      setError(error.message);
    }
    setIsLoading(false)
  }, [])
  useEffect(() => { //ensures that the fetch call hapens on page load and not just on button click.
    fetchMoviesHandler()//this is the function it affects, what we want to happen on page load
  }, [fetchMoviesHandler,]);//what the effect depends on
  
  async function addMovieHandler(movie) {
    const response = await fetch('https://react-posting-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
  }
  
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
