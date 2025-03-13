export default function Home() {
  return (
      <div className="containerForm">
        <div className="form">
          <h1>👽 SWAPI Character Lookup 🛸</h1>
          <form method="get" action="/personaje">
            <input
              type="text"
              name="name"
              placeholder={"May the force be with you..."}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
  );
};
