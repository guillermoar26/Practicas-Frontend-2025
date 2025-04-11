import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "axios";
import { Book } from "../../types.ts";
import DisplayBook from "../../components/Book.tsx";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Book>) => {
    try {
      const { id } = ctx.params;

      const response = await Axios.get<Book>(
        `https://openlibrary.org/works/${id}.json`,
      );

      const book = response.data;
      const author_id = (book.authors?.[0].key || book.author_key)?.replace(
        "/authors/",
        "",
      );

      if (!author_id) {
        return ctx.render({
          title: book.title,
          description: book.description,
          covers: book.covers?.[0],
          publish_date: book.publish_date,
          number_of_pages: book.number_of_pages,
          author_key: "",
          author_name: "Unknown",
        });
      }

      const response2 = await Axios.get(
        `https://openlibrary.org/authors/${author_id}.json`,
      );

      const author_name = response2.data.name;

      return ctx.render({
        title: book.title,
        description: book.description,
        covers: book.covers?.[0],
        publish_date: book.publish_date,
        number_of_pages: book.number_of_pages,
        author_key: author_id,
        author_name: author_name,
      });
    } catch (error) {
      return new Response("Error: " + error, { status: 500 });
    }
  },
};

const Page = (props: PageProps<Book>) => <DisplayBook {...props.data} />;

export default Page;
