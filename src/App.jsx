import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import MovieApp from "./Pages/MovieApp";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import FavoritesPage from "./Pages/FavoritesPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieApp />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
