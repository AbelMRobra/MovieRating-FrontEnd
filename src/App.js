import './App.css';
import React, {useState, useEffect} from 'react';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        'Content-Type': 'aplicattion/json',
        'Authorization': 'Token f0378e3093d4be347abc5b1e2c3f6c2a86964ac0',
      }
    })
    .then( resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.log(error))
  }, []);

  const movieClicked = movie => {
    setSelectedMovie(movie);
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>Movie rater</h1>
          
      </header>

      <div className="layout">
        <MovieList movies={movies} movieClicked={movieClicked}/>
            
        <MovieDetails movie = {selectedMovie}/>
      </div>
    </div>
  );
}

export default App;
