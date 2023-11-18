import herobanner from "../imgs/herosMarvelComicspng.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="container">
      <div className="display-column">
        <Link to="/comics" className="home-link">
          <img className="heroImg" src={herobanner} alt="héros Marvel" />

          <div className="btn-comic">Enter!</div>
        </Link>
      </div>
    </main>
  );
};

export default Home;
