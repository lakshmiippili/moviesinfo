import React, { useState,useEffect,useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error,setError]= useState(null)
  const fetchMoviesHandler=useCallback(async()=> {
    setIsLoading(true)
    setError(null)
    try{
      const response = await fetch("https://swapi.dev/api/fils/");
      if(!response.ok){
        throw new Error('Something went wrong... Retrying!')
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      
    }
    catch(error){
      setError(error.message)
    }
    setIsLoading(false)
  },[])
  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler])

  const retryCancelHandler = () => {
    clearTimeout()
    setIsLoading(false);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && error && <div><p>{error}</p> <button onClick={retryCancelHandler}>Cancel Retry</button></div>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
