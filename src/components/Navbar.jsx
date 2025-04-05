import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white">
      <h1 className="text-2xl font-bold text-white hover:text-amber-500">🎬 MovieFlix</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-amber-500 cursor-pointer transition">Home</Link>
        <Link to="/favorites" className="hover:text-amber-500 cursor-pointer transition">Favorites</Link>
      </div>
    </nav>
  );
}

    