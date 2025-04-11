import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "axios";
import { Book, featuredBook } from "../types.ts";
import Books from "../components/Books.tsx";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Array<Book>>) => {
    try {
      const response = featuredBook.map(async (book) => {
        const bookResponse = await Axios.get<{ docs: Array<Book> }>(
          `https://openlibrary.org/search.json?q=${book}`,
        );
        return bookResponse.data.docs[0];
      });
      const books = await Promise.all(response);
      return ctx.render(books);
    } catch (error) {
      return new Response("Error: " + error, { status: 500 });
    }
  },
};

const Page = (props: PageProps<Array<Book>>) => {
  return (
    <>
      <h1>Featured Books</h1>
      <Books books={props.data} />
    </>
  );
};

export default Page;
