import React from 'react';
import { Link } from 'react-router-dom';

export default function Favorites({ favorites }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">⭐ Your Favorites</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {favorites.map(movie => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={movie.imdbID}
            className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 text-white"
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded-md mb-2"
            />
            <h3 className="text-md font-medium">{movie.Title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
