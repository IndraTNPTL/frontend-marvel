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
// import SingleComic from "./assets/pages/SingleComic";
import CharactersList from "./assets/pages/CharactersList";
import CharacterComics from "./assets/pages/CharacterComics";
// import Favoris from "./assets/pages/Favoris";
import NotFound from "./assets/pages/NotFound";

// IMAGES
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/comics"
          element={<ComicsList search={search} setSearch={setSearch} />}
        />
        {/* <Route path="/comic/:id" element={<SingleComic />} /> */}
        <Route
          path="/characters"
          element={<CharactersList search={search} setSearch={setSearch} />}
        />
        <Route path="/character/:id" element={<CharacterComics />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
