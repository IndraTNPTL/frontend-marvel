import herobanner from "../imgs/herosMarvelComicspng.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="container">
      <div className="display-column">
        <img className="heroImg" src={herobanner} alt="héros Marvel" />
        <Link to="/comics">
          <div className="btn-comic">Entrez!</div>
        </Link>
      </div>
    </main>
  );
};

export default Home;
