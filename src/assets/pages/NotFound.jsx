import { Link } from "react-router-dom";

import thanos from "../imgs/thanos.webp";

const NotFound = () => {
  return (
    <>
      <main className="container">
        <div className="display-column">
          <h1>Oh snap!</h1>
          <p>Seems that this page doesn't exist!</p>
          <img className="NOTFOUND-img" src={thanos} alt="404 Not Found" />
          <Link className="primary-links" to="/">
            Go back to home
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
