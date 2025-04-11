import { FunctionalComponent } from "preact/src/index.d.ts";
import { Book } from "../types.ts";

const DisplayBook: FunctionalComponent<Book> = (book) => {
  const {
    title,
    covers,
    author_name,
    author_key,
    description,
    publish_date,
    number_of_pages,
  } = book;
  return (
    <div class="book-container">
      <div class="single-book">
        <h1>{title}</h1>
        <img
          src={`https://covers.openlibrary.org/b/id/${covers}-M.jpg`}
          alt={title}
        />
        <br />
        {description
          ? (
            <p>
              <strong>Description:</strong>
              {description}
            </p>
          )
          : <p>No description available</p>}
        {(author_key || author_name)
          ? (
            <a href={`/author/${author_key}`}>
              <p>
                <strong>Author: </strong>
                {author_name ?? "Unknown"}
              </p>
            </a>
          )
          : (<p><strong>Author: </strong>Unknown</p>)}
        <p>
          <strong>Publish date: </strong>{" "}
          {publish_date ? publish_date : "Unknown"}
        </p>
        <p>
          <strong>Number of pages: </strong>{" "}
          {number_of_pages ? number_of_pages : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default DisplayBook;
