import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "axios";
import { Book } from "../../types.ts";
import Books from "../../components/Books.tsx";
import Form from "../../components/Form.tsx";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Array<Book>>) => {
    try {
      const url = new URL(req.url);
      const title = url.searchParams.get("title") || "";
      if (!title) {
        return ctx.render([]);
      }

      const response = await Axios.get<{ docs: Array<Book> }>(
        `https://openlibrary.org/search.json?q=${title}&limit=15`,
      );
      const books = response.data.docs[0] ? (response.data.docs) : [];
      return ctx.render(books);
    } catch (error) {
      return new Response("Error: " + error, { status: 500 });
    }
  },
};

const Page = (props: PageProps<Array<Book>>) => {
  return (
    <div>
      <Form />
      <Books books={props.data} />
    </div>
  );
};

export default Page;
