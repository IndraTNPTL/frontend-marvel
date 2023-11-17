import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CharacterComics = () => {
  const [character, setCharacter] = useState();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

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

  return isLoading ? (
    <main className="container">
      <div className="display-column">
        <p>is loading... ⏳</p>
      </div>
    </main>
  ) : (
    <main className="container">
      <div className="display-column">
        <h1>{character.name}'s Comics</h1>
        <img
          className="card-img"
          src={character.thumbnail.path + "." + character.thumbnail.extension}
          alt={character.name}
        />
        <p>{character.description}</p>
        <div className="cards-container">
          <h1>Il apparait dans...</h1>
          {comics.map((comic) => (
            <div key={comic._id} className="comics-card">
              <article>
                <div className="top-card">
                  <img
                    className="card-img"
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt={comic.title}
                  />
                </div>
                <div className="bottom-card">
                  <h2>{comic.title}</h2>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CharacterComics;
