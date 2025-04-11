import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import AuthorPage from "../../components/Author.tsx";
import { Author, Book } from "../../types.ts";
import Axios from "axios";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Author>) => {
    try {
      const { id } = ctx.params;

      const response = await Axios.get(
        `https://openlibrary.org/authors/${id}.json`,
      );
      const author = response.data;
      console.log(author);
      const response2 = await Axios.get<{ entries: Array<Book> }>(
        `https://openlibrary.org/authors/${id}/works.json?limit=6`,
      );

      const bio = author.bio?.value || author.bio || "No biography available";
      const works = response2.data;
      return ctx.render({
        name: author.name || author.personal_name,
        bio: bio,
        works: works.entries[0] ? (works.entries) : [],
      });
    } catch (error) {
      return new Response("Error: " + error, { status: 500 });
    }
  },
};

const Page = (props: PageProps<Author>) => <AuthorPage {...props.data} />;

export default Page;
