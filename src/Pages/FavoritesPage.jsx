import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FavoritesContext } from "../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-4 py-8">
      <Navbar />
      <h2 className="text-3xl font-semibold text-center mb-6">Your Favorite Movies ❤️</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-lg text-gray-500">You have no favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <Link
              key={movie.imdbID}
              to={`/movie/${movie.imdbID}`}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{movie.Title}</h3>
                <p className="text-sm">{movie.Year}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
