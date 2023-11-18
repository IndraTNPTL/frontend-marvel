import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CharacterComics = ({ handleAddToFavorite }) => {
  const [character, setCharacter] = useState();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterResponse = await axios.get(
          `https://site--backend-marvel--9ffwzfmzn64t.code.run/character/${id}`
        );
        const comicResponses = await Promise.all(
          characterResponse.data.data.comics.map((comicId) =>
            axios.get(
              `https://site--backend-marvel--9ffwzfmzn64t.code.run/comic/${comicId}`
            )
          )
        );
        setCharacter(characterResponse.data.data);
        setComics(comicResponses.map((response) => response.data.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

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
        <div className="cards-container">
          <div className="single-character-container">
            <div className="single-section-left">
              <h1 className="single-section-h1">{character.name}</h1>
              <button
                className="btn-add-to-favorites third-btn-link"
                onClick={() => handleAddToFavoriteWithType(character)}
              >
                Add to favorites
              </button>
            </div>
            <div className="single-section-middle">
              <img
                className="img-characters"
                src={
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
                alt={character.name}
              />
            </div>
            <div className="single-section-right">
              {character.description ? (
                <p>{character.description}</p>
              ) : (
                <p>{character.name} history coming soon...</p>
              )}
            </div>
          </div>
          {comics ? (
            <>
              <h1>See {character.name} in...</h1>
              <div className="cards-container">
                {comics.map((comic) => (
                  <article
                    className="comics-card styled-card-comics"
                    key={comic._id}
                  >
                    <Link to={`/comic/${comic._id}`}>
                      <div className="top-card">
                        <img
                          className="img-comics"
                          src={
                            comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension
                          }
                          alt={comic.title}
                        />
                      </div>
                      <div className="bottom-card">
                        <h2>{comic.title}</h2>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        navigate(`/comic/${comic._id}`);
                      }}
                      className="btn-add-to-favorites primary-btn-link"
                    >
                      Click for more infos
                    </button>
                    <button
                      className="btn-add-to-favorites third-btn-link"
                      onClick={() => {
                        const handleAddToFavoriteWithType = (item) => {
                          const itemWithType = {
                            ...item,
                            type: "comic",
                          };
                          handleAddToFavorite(itemWithType);
                        };
                        handleAddToFavoriteWithType(comic);
                      }}
                    >
                      Add to favorites
                    </button>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CharacterComics;
