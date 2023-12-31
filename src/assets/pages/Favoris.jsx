import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import thanosSnap from "../imgs/remove-btn.png";
import thanosEmpty from "../imgs/Thanos-PNG-Photo.png";

const Favoris = ({ favoriteItem, setFavoriteItem }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(false);
  }, []);

  function handleDelete(id) {
    const updatedFavoriteItem = favoriteItem.filter((item) => item._id !== id);
    setFavoriteItem(updatedFavoriteItem);
    localStorage.setItem("favorite", JSON.stringify(updatedFavoriteItem));
    toast.success("🥹 Deleted!", {
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

  function handleEmptyFavorite() {
    localStorage.removeItem("favorite");
    setFavoriteItem([]);
    toast.success("🗑 All favorites deleted !", {
      style: {
        borderRadius: "4% 95% 6% 95%/95% 4% 92% 5%;",
        border: "1px solid #41cd78",
        background: "#eaeaea",
        color: "#191d32",
        borderWidth: "3px 3px 5px 5px",
        fontSize: "1.7rem",
      },
    });
  }

  console.log(favoriteItem);

  return isLoading ? (
    <main className="container">
      <div className="display-column">
        <p>is loading... ⏳</p>
      </div>
    </main>
  ) : (
    <main className="container">
      <div className="display-column">
        <h1>Favorites</h1>
        {favoriteItem.length > 0 ? (
          <>
            <div className="cards-container">
              {favoriteItem.map((item) => {
                // Determine the type of the item
                const type = item.type === "character" ? "character" : "comic";
                console.log("-->", item);
                return (
                  <article
                    key={item._id}
                    className="characters-card styled-card-favorites"
                  >
                    <Link to={`/${type}/${item._id}`}>
                      <div className="top-card">
                        <img
                          className="img-characters"
                          src={
                            item.thumbnail.path + "." + item.thumbnail.extension
                          }
                          alt={item.name || item.title}
                        />
                      </div>
                      <div className="bottom-card">
                        <h2>{item.name || item.title}</h2>
                      </div>
                    </Link>

                    <button
                      id="btn-delete"
                      className="tooltip"
                      onClick={() => handleDelete(item._id)}
                    >
                      <span className="tooltiptext">DELETE!</span>
                      <img
                        className="remove-img"
                        src={thanosSnap}
                        alt="thanos snap"
                      />
                    </button>
                  </article>
                );
              })}
            </div>
            <div>
              <button className="btn-empty" onClick={handleEmptyFavorite}>
                Empty my list
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="empty-favorite">
              Your favorite list is empty, go browse some Characters or Comics!
            </h2>
            <img
              className="favorites-empty-img"
              src={thanosEmpty}
              alt="Thanos"
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Favoris;
