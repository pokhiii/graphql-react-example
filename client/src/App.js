import logo from './logo.svg';
import './App.css';

const BookCard = ({ id, title, author }) => (
  <div className="book-card">
    <div className="book-cover">
    </div>
    <div className="book-details">
      <div className="title">{title}</div>
      <div className="author">{author}</div>
      <div className="id">{id}</div>
    </div>
  </div>
  )

function App() {
  // hardcoded books
  const books = [
            {
                "id": "1",
                "title": "The Awakening",
                "author": "Kate Chopin"
            },
            {
                "id": "2",
                "title": "City of Glass",
                "author": "Paul Auster"
            },
            {
                "id": "3",
                "title": "Becoming a Technical Leader",
                "author": "GMW"
            }
        ]

  return (
    <div className="App">
      <div className="books">
        <h1>Books</h1>
        {books.map(book => (
          <div className="book-card-wrapper" key={book.id}>
          <BookCard
            id={book.id}
            title={book.title}
            author={book.author}
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
