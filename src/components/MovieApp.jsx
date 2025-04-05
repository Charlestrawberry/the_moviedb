import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";
import Favorites from "../components/Favorites";
import Pagination from "../components/Pagination";
import ThemeToggle from "../components/ThemeToggle";

const API_KEY = "9f675f6"; // only key, without full URL

export default function MovieApp() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const searchMovies = async (page = 1) => {
    setLoading(true);
    setError(null);
    setSelectedMovie(null);

    try {
      const searchRes = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
      );

      if (searchRes.data.Response === "True") {
        const searchResults = searchRes.data.Search;
        const total = parseInt(searchRes.data.totalResults, 10);
        setTotalResults(total);
        setCurrentPage(page);

        // Fetch full movie data for each result to get Genre info
        const detailedResults = await Promise.all(
          searchResults.map(async (movie) => {
            try {
              const detailsRes = await axios.get(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
              );
              return detailsRes.data;
            } catch (err) {
              console.error(`Error fetching details for ${movie.imdbID}`, err);
              return movie; // fallback to basic if error
            }
          })
        );

        setMovies(detailedResults);
      } else {
        setMovies([]);
        setError(searchRes.data.Error);
        setTotalResults(0);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (imdbID) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
      );
      setSelectedMovie(res.data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch movie details.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const filteredMovies = genreFilter
    ? movies.filter(
        (movie) =>
          movie.Genre &&
          movie.Genre.toLowerCase().includes(genreFilter.toLowerCase())
      )
    : movies;

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } px-4 py-8`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-center w-full">
          🎬 Movieflix Movie Finder
        </h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="p-3 w-full sm:max-w-md rounded-lg text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() => searchMovies(1)}
          className="bg-cyan-500 hover:bg-cyan-700 p-3 rounded-lg font-semibold"
        >
          Search
        </button>
      </div>

      {/* Genre Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
      </div>

      {loading && <div className="text-center text-lg">Loading in 5G...</div>}
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      {!selectedMovie && !loading && filteredMovies.length > 0 && (
        <>
          <MovieList
            movies={filteredMovies}
            getMovieDetails={getMovieDetails}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
          <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            onPageChange={(page) => searchMovies(page)}
          />
        </>
      )}

      {selectedMovie && !loading && (
        <MovieDetails
          movie={selectedMovie}
          onBack={() => setSelectedMovie(null)}
        />
      )}

      {favorites.length > 0 && !selectedMovie && (
        <Favorites favorites={favorites} getMovieDetails={getMovieDetails} />
      )}
    </div>
  );
}
