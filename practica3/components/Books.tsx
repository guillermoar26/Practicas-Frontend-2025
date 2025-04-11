import { FunctionalComponent } from "preact";
import { Book } from "../types.ts";

const Books: FunctionalComponent<{ books: Array<Book> }> = ({ books }) => {
  return (
    <>
      {books.length === 0
        ? <p>No se encontraron libros con este título</p>
        : (
          <div class="container">
            {books.map((book) => (
              <div key={book.cover_edition_key} class="book">
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                />
                <a
                  href={`/book/${
                    book.cover_edition_key || book.key?.replace("/works", "")
                  }`}
                >
                  <h2>{book.title}</h2>
                </a>
                <a href={`/author/${book.author_key?.[0]}`}>
                  <strong>Author:</strong>{" "}
                  {book.author_name ? book.author_name[0] : "Unknown"}
                </a>
              </div>
            ))}
          </div>
        )}
    </>
  );
};

export default Books;
