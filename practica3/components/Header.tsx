import { FunctionalComponent } from "preact";

const Header: FunctionalComponent = () => {
  return (
    <div class="header">
      <h1>Open Library API</h1> <br />
      <a href="/">Home</a>
      <a href="/search">Search</a>
    </div>
  );
};

export default Header;
