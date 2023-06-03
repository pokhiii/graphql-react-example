import mysql from 'mysql2/promise'; // Import the mysql2 library

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'graphql_experiment',
});


export default db
