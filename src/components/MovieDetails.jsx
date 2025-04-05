import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'your_omdb_api_key';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
        setMovie(res.data);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch movie details");
      }
    };
    fetchDetails();
  }, [id]);

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!movie) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg text-white">
      <button onClick={() => navigate(-1)} className="mb-4 text-red-400 hover:underline">← Back</button>
      <div className="flex flex-col sm:flex-row gap-4">
        <img src={movie.Poster} alt={movie.Title} className="w-64 h-auto rounded-md" />
        <div>
          <h2 className="text-3xl font-bold mb-2">{movie.Title}</h2>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}
