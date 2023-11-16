import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";

import logo from "../imgs/marvelComicsLogo.png";

const Header = ({ search, setSearch }) => {
  return (
    <header className="container">
      <div>
        <Link className="logo-container" to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="header-links-container">
        <Link className="primary-btn-link" to="/characters">
          Personnages
        </Link>
        <Link className="primary-btn-link" to="/comics">
          Comics
        </Link>
      </div>
      <div>
        {" "}
        <Link className="secondary-btn-link" to="/favorites">
          Favoris
        </Link>
      </div>
    </header>
  );
};

export default Header;
