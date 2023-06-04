import db from './db.js'

export const resolvers = {
  Query: {
    books: async () => {
      try {
        const [rows] = await db.execute('SELECT * FROM books ORDER BY created_at DESC');
        return rows;
      } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch books from the database.');
      }
    },
  },

  Mutation: {
    addBook: async (parent, args, context, info) => {
      const { title, author } = args

      try {
        const [{insertId}] = await db.execute(`INSERT INTO books (title, author) VALUES ("${title}", "${author}");`);
        const [rows] = await db.execute(`SELECT * FROM books WHERE id = ${insertId}`);
        return rows[0];
      } catch (error) {
        console.log(error)
        throw new Error('Failed to insert book to the database.');
      }
    }
  }
};
