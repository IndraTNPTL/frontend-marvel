import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="search-bar-container">
      <FontAwesomeIcon
        icon="fa-solid fa-magnifying-glass"
        style={{ color: "#757575" }}
        className="search-icon"
      />
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
