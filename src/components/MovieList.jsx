import React from 'react'

export default function MovieList({ movies, getMovieDetails, toggleFavorite, favorites }) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map(movie => (
        <div key={movie.imdbID} className="bg-gray-800 p-3 rounded-xl shadow hover:scale-105 transition">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
            alt={movie.Title}
            className="w-full h-64 object-cover rounded-md mb-2"
            onClick={() => getMovieDetails(movie.imdbID)}
          />
          <h3 className="text-lg font-semibold cursor-pointer" onClick={() => getMovieDetails(movie.imdbID)}>
            {movie.Title} ({movie.Year})
          </h3>
          <button
            className="mt-2 text-sm text-yellow-400 hover:text-yellow-300"
            onClick={() => toggleFavorite(movie)}
          >
            {favorites.find(fav => fav.imdbID === movie.imdbID) ? '★ Remove Favorite' : '☆ Add to Favorites'}
          </button>
        </div>
      ))}
    </div>
  )
}
