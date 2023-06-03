import db from './db.js'

export const typeDefs = `
  type Book {
    id: String
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

export const resolvers = {
  Query: {
    books: async () => {
      try {
        const [rows] = await db.execute('SELECT * FROM books');
        return rows;
      } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch books from the database.');
      }
    },
  },
};
