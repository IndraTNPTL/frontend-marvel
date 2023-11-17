import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--9ffwzfmzn64t.code.run/comics?title=${search}`
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
        <h1>Les Comics</h1>
        <div className="cards-container">
          {data.results.map((comic) => {
            return (
              <Link
                to={`/comic/${comic._id}`}
                className="comics-card"
                key={comic._id}
              >
                <article>
                  <div className="top-card">
                    <img
                      className="card-img"
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                      alt={comic.title}
                    />
                  </div>
                  <div className="bottom-card">
                    <h2>{comic.title}</h2>
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

// NE PAS OUBLIER SEARCH

export default Comics;
