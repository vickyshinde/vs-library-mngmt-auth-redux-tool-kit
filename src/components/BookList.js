// src/BookList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, deleteBook } from '../rtk/booksSlice';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [newBook, setNewBook] = useState({ name: '', summary: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.name && newBook.summary) {
      const newBookWithId = { ...newBook, id: books.length + 1 };
      dispatch(addBook(newBookWithId));
      setNewBook({ name: '', summary: '' });
    } else {
      alert('Please fill in both fields');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.name}</Link>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={newBook.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="summary"
          placeholder="Book Summary"
          value={newBook.summary}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default BookList;
