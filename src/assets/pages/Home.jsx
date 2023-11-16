import herobanner from "../imgs/herosMarvelComicspng.png";

const Home = () => {
  return (
    <main className="container">
      <div className="display-column">
        <img className="heroImg" src={herobanner} alt="héros Marvel" />
      </div>
    </main>
  );
};

export default Home;
