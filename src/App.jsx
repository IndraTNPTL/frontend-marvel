import "./App.css";

// PACKAGES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

// COMPONENTS
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";

// PAGES
import Home from "./assets/pages/Home";
import ComicsList from "./assets/pages/ComicsList";
import SingleComic from "./assets/pages/SingleComic";
import CharactersList from "./assets/pages/CharactersList";
import CharacterComics from "./assets/pages/CharacterComics";
import Favoris from "./assets/pages/Favoris";
import NotFound from "./assets/pages/NotFound";

// IMAGES
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState();

  const favoriteItems = JSON.parse(localStorage.getItem("favorite")) || [];
  const [favoriteItem, setFavoriteItem] = useState(favoriteItems);

  function handleAddToFavorite(item) {
    const existingItem = favoriteItem.find(
      (favoriteItem) => favoriteItem._id === item._id
    );
    if (existingItem) {
      alert(`Already one of your favorites!`);
      return;
    }
    setFavoriteItem((previousFavoriteItem) => [...previousFavoriteItem, item]);
    localStorage.setItem("favorite", JSON.stringify([...favoriteItem, item]));

    // Display message in the UI that fades out after a few seconds
    alert("Added to favorites ❤️");
  }

  return (
    <Router>
      <Header search={search} setSearch={setSearch} setPage={setPage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/comics"
          element={
            <ComicsList
              search={search}
              setSearch={setSearch}
              handleAddToFavorite={handleAddToFavorite}
            />
          }
        />
        <Route path="/comic/:id" element={<SingleComic />} />
        <Route
          path="/characters"
          element={
            <CharactersList
              search={search}
              handleAddToFavorite={handleAddToFavorite}
            />
          }
        />
        <Route path="/character/:id" element={<CharacterComics />} />
        <Route path="/favorites" element={<Favoris />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
