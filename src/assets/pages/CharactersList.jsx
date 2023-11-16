import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CharactersList = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--9ffwzfmzn64t.code.run/characters?name=${search}`
        );
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search]);

  return isLoading ? (
    <main className="container">
      <div className="display-column">
        <p>is loading... ⏳</p>
      </div>
    </main>
  ) : (
    <main className="container">
      <div className="display-column">
        <h1>Les Personnages</h1>
        <div className="cards-container">
          {data.results.map((character) => {
            return (
              <Link
                to={`/character/${character._id}/comics`}
                key={character._id}
                className="characters-card"
              >
                <article>
                  <div className="top-card">
                    <img
                      className="card-img"
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
                    <p>{character.description}</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CharactersList;
