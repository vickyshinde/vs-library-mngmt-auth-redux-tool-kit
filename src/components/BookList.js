import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBookFromAPI } from '../rtk/booksSlice';
import BookForm from './BookForm';

const BookList = () => {
  // Selectors
  const books = useSelector((state) => state.books.items);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  // Dispatcher
  const dispatch = useDispatch();

  // State
  const [editingBook, setEditingBook] = useState(null);

  // Fetch books on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  // Handle edit book
  const handleEdit = (book) => {
    setEditingBook(book);
  };

  // Handle delete book
  const handleDelete = (bookId) => {
    dispatch(deleteBookFromAPI(bookId));
  };

  // Render loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Render error state
  if (status === 'failed') {
    return <div>{error}</div>;
  }

  // Render book list
  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.name}</Link>
            <button onClick={() => handleEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <BookForm book={editingBook} setEditingBook={setEditingBook} />
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default BookList;
