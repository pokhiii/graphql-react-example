import React, {useEffect, useState} from 'react';

import logo from './logo.svg';
import './App.css';

const BookCard = ({ id, title, author }) => {
  return (
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
