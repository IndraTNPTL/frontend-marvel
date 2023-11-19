import "./App.css";

// PACKAGES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
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
  // const [search, setSearch] = useState("");

  const favoriteItems = JSON.parse(localStorage.getItem("favorite")) || [];
  const [favoriteItem, setFavoriteItem] = useState(favoriteItems);

  function handleAddToFavorite(item) {
    const existingItem = favoriteItem.find(
      (favoriteItem) => favoriteItem._id === item._id
    );
    if (existingItem) {
      toast.error("Already Added", {
        style: {
          borderRadius: "4% 95% 6% 95%/95% 4% 92% 5%;",
          border: "1px solid #ed1b24",
          background: "#eaeaea",
          color: "#191d32",
          borderWidth: "3px 3px 5px 5px",
          fontSize: "2rem",
        },
      });
      return;
    }
    setFavoriteItem((previousFavoriteItem) => [...previousFavoriteItem, item]);
    localStorage.setItem("favorite", JSON.stringify([...favoriteItem, item]));

    // alert("Added to favorites ❤️");
    toast.success("Added to favorites", {
      style: {
        borderRadius: "4% 95% 6% 95%/95% 4% 92% 5%;",
        border: "1px solid #41cd78",
        background: "#eaeaea",
        color: "#191d32",
        borderWidth: "3px 3px 5px 5px",
        fontSize: "2rem",
      },
    });
  }

  // const handleAddToFavoriteWithType = (item) => {
  //   const itemWithType = {
  //     ...item,
  //     type: "character",
  //   };
  //   handleAddToFavorite(itemWithType);
  // };

  return (
    <>
      <Router>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/comics"
            element={<ComicsList handleAddToFavorite={handleAddToFavorite} />}
          />
          <Route
            path="/comic/:id"
            element={<SingleComic handleAddToFavorite={handleAddToFavorite} />}
          />
          <Route
            path="/characters"
            element={
              <CharactersList handleAddToFavorite={handleAddToFavorite} />
            }
          />
          <Route
            path="/character/:id"
            element={
              <CharacterComics handleAddToFavorite={handleAddToFavorite} />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favoris
                favoriteItem={favoriteItem}
                setFavoriteItem={setFavoriteItem}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
