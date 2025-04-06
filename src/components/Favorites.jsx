import React from "react";

export default function Favorites({ favorites, getMovieDetails }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {favorites.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600"
            onClick={() => getMovieDetails(movie.imdbID)}
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450"
              }
              alt={movie.Title}
              className="w-full h-64 object-cover rounded-md mb-2"
            />
            <h3 className="text-md font-medium">{movie.Title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
