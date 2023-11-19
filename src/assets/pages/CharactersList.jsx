import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "../components/SearchBar";

const CharactersList = ({ handleAddToFavorite }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--9ffwzfmzn64t.code.run/characters?name=${search}&page=${page}`
        );
        setData(response.data.data);
        setTotalItems(response.data.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, page]);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / 100));
  }, [totalItems]);

  const handleAddToFavoriteWithType = (item) => {
    const itemWithType = {
      ...item,
      type: "character",
    };
    handleAddToFavorite(itemWithType);
  };

  return isLoading ? (
    <main className="container">
      <div className="display-column">
        <p>is loading... ⏳</p>
      </div>
    </main>
  ) : (
    <main className="container">
      <div className="display-column">
        <h1>Characters</h1>
        <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
        <div className="pagination-btns-container">
          <button
            className="primary-btn-link"
            onClick={() => {
              let pagination = page - 1;
              setPage(pagination);
            }}
            disabled={page === 1 ? true : false}
          >
            Previous
          </button>
          <span className="page-nbr">
            {page} on {totalPages}
          </span>
          <button
            className="primary-btn-link"
            onClick={() => {
              let pagination = page + 1;
              setPage(pagination);
            }}
            disabled={page === totalPages ? true : false}
          >
            Next
          </button>
        </div>
        <div className="cards-container">
          {data.results.map((character) => {
            return (
              <article
                key={character._id}
                className="characters-card styled-card-characters"
              >
                <Link to={`/character/${character._id}`}>
                  <div className="top-card">
                    <img
                      className="img-characters"
                      src={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
                      }
                      alt={character.name}
                    />
                  </div>
                  <div className="bottom-card">
                    <h2>{character.name}</h2>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    navigate(`/character/${character._id}`);
                  }}
                  className="btn-add-to-favorites secondary-btn-link"
                >
                  Click for more infos
                </button>
                <button
                  className="btn-add-to-favorites third-btn-link"
                  onClick={() => handleAddToFavoriteWithType(character)}
                >
                  Add to favorites
                </button>
              </article>
            );
          })}
        </div>
        <div className="pagination-btns-container">
          <button
            className="primary-btn-link"
            onClick={() => {
              let pagination = page - 1;
              setPage(pagination);
            }}
            disabled={page === 1 ? true : false}
          >
            Previous
          </button>
          <span className="page-nbr">
            {page} on {totalPages}
          </span>
          <button
            className="primary-btn-link"
            onClick={() => {
              let pagination = page + 1;
              setPage(pagination);
            }}
            disabled={page === totalPages ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default CharactersList;
