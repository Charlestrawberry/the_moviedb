import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white">
      <h1 className="text-2xl font-bold text-white hover:text-cyan-500">🎬 MovieFlix</h1>
      <ul className="flex gap-6">
        <li className="hover:text-cyan-500 cursor-pointer">Home</li>
        <li className="hover:text-cyan-500 cursor-pointer">Favorites</li>
      </ul>
    </nav>
  );
}
