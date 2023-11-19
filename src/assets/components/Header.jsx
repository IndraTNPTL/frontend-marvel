import { Link } from "react-router-dom";

import logo from "../imgs/marvelComicsLogo.png";

const Header = () => {
  return (
    <header className="container">
      <div>
        <Link className="logo-container" to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      {/* <SearchBar search={search} setSearch={setSearch} setPage={setPage} /> */}

      <div className="header-links-container">
        <Link className="primary-btn-link" to="/characters">
          Characters
        </Link>
        <Link className="secondary-btn-link" to="/comics">
          Comics
        </Link>
      </div>
      <div>
        <Link className="third-btn-link" to="/favorites">
          My Favorites
        </Link>
      </div>
    </header>
  );
};

export default Header;
