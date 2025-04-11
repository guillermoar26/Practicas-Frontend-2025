import { FunctionalComponent } from "preact";
import { Author } from "../types.ts";

const AuthorPage: FunctionalComponent<Author> = (props) => {
  const { name, bio, works } = props;
  return (
    <div>
      <h1>{name}</h1>
      <strong>Bio:</strong>
      {bio}
      <br />
      <h2>Works:</h2>
      <div class="container">
        {works.length === 0
          ? <p>No works found</p>
          : (works.map((book) => (
            <div key={book.cover_edition_key} class="book">
              <img
                src={`https://covers.openlibrary.org/b/id/${
                  book.covers?.[0] || book.cover_i?.[0]
                }-M.jpg`}
                alt={book.title}
              />
              <a href={`/book/${book.key?.replace("/works/", "")}`}>
                <h2>{book.title}</h2>
              </a>
            </div>
          )))}
      </div>
    </div>
  );
};

export default AuthorPage;
