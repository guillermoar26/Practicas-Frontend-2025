export type Book = {
  by_statement?: string;
  covers?: string;
  cover_edition_key?: string;
  author_name?: string;
  author_key?: string;
  title: string;
  description?: string;
  publish_date?: string;
  number_of_pages?: number;
  cover_i?: string;
  key?: string;
  authors?: {
    key: string
  }[]
};


export type Author = {
  name: string;
  bio?: string;
  works: Book[];
};

export const featuredBook = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Pride and Prejudice",
  "The Hobbit",
  "Moby-Dick",
  "Jane Eyre",
  "War and Peace",
  "The Catcher in the Rye",
  "Brave New World",
  "The Lord of the Rings",
  "Crime and Punishment",
  "The Alchemist",
  "The Picture of Dorian Gray",
  "Harry Potter and the Sorcerer's Stone",
];
