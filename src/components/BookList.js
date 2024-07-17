import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchBooksQuery, useDeleteBookMutation }  from '../rtk/booksSlice';
import BookForm from './BookForm';

const BookList = () => {
  const { data: books, error, isLoading } = useFetchBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);
    } catch (err) {
      console.error('Failed to delete the book: ', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.toString()}</div>;

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books?.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.name}</Link>
            <button onClick={() => handleEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h1>Add Book</h1>
      <BookForm book={editingBook} setEditingBook={setEditingBook} />
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default BookList;
