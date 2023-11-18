import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleComic = ({ handleAddToFavorite }) => {
  const [comic, setComic] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comicResponse = await axios.get(
          `https://site--backend-marvel--9ffwzfmzn64t.code.run/comic/${id}`
        );
        // console.log(comicResponse);
        setComic(comicResponse.data.data);
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
      type: "comic",
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
          <div className=" single-comic-container">
            <div className="single-section-left">
              <h1 className="single-section-h1">{comic.title}</h1>
              <button
                className="btn-add-to-favorites third-btn-link"
                onClick={() => handleAddToFavoriteWithType(comic)}
              >
                Add to favorites
              </button>
            </div>
            <div className="single-section-middle">
              <img
                className="img-comics"
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt={comic.title}
              />
            </div>
            <div className="single-section-right">
              {comic.description ? (
                <p>{comic.description}</p>
              ) : (
                <p>{comic.title} synopsis coming soon...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleComic;
