import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //Loading movies from database
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://moviesinfo-36fdb-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  //Deleting movies from database
  async function deleteMovieHandler(id) {
    try {
      const response = await fetch(
        "https://moviesinfo-36fdb-default-rtdb.firebaseio.com/movies.json",
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong... Retrying!");
      }
      setMovies((prevMovie) => prevMovie.filter((movie) => movie.id !== id));
    } catch (error) {
      setError(error.message);
    }
  }
  //showing content

  let content = <p>No movies Found</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  //fetching on reload
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

//adding movies to database
  async function addNewMovieHandler(newMovie) {
    try {
      const response = await fetch(
        "https://moviesinfo-36fdb-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(newMovie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went Wrong!...");
      }
    } catch (error) {
      setError(error.message);
    }
    fetchMoviesHandler()    //loading when adding
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddNewMovie={addNewMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
