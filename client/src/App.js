import React, {useEffect, useState} from 'react';
import './App.css';

const BookCard = ({ id, title, author }) => {
  return (
  <div className="card">
    <div className="card-body">
      <div>{title}</div>
      <div>{author}</div>
      <div>{id}</div>
    </div>
  </div>
  )
}

const CreateBookForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group mb-3">
        <input type="text" name="title" required="required" placeholder="Title" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <input type="text" name="author" required="required" placeholder="Author" className="form-control" />
      </div>

      <button className="btn btn-primary">Add book</button>
    </form>
  )
}

function App() {
  const [books, setBooks] = useState([])

  const sideEffect = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "query": "query GetBooks { books { id title author } }",
      "variables": {},
      "operationName": "GetBooks"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:4000/", requestOptions)
      .then(response => response.json())
      .then(result => {
        setBooks(result.data.books)
      })
      .catch(error => console.log('error', error));

  }
  const dependencies = []

  useEffect(sideEffect, dependencies);

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const bookData = Object.fromEntries(formData);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "query": "mutation CreateBook($title: String, $author: String) { addBook(title: $title, author: $author) { id title } }",
      "variables": bookData,
      "operationName": "CreateBook"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:4000/", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Books</h1>

        <div className="d-flex">
          <div className="w-50">
            <h2>List</h2>
            {books.length ?
              books.map(book => (
                <div className="mb-3" key={book.id}>
                  <BookCard
                    id={book.id}
                    title={book.title}
                    author={book.author}
                  />
                </div>
              ) ) : (
              <div className="alert alert-info">No books to show.</div>
            )}
          </div>

          <div className="w-50 px-5">
            <h2>Create</h2>
            <CreateBookForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
