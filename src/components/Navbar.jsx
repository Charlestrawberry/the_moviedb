import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

  const navItemClass = (path) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      location.pathname === path
        ? "bg-cyan-600 text-white"
        : "hover:bg-cyan-500 hover:text-white"
    }`;



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

{/* <nav className="flex justify-center gap-4 mb-8">
<Link to="/" className={navItemClass("/")}>Home</Link>
<Link to="/favorites" className={navItemClass("/favorites")}>Favorites</Link>
</nav> */}