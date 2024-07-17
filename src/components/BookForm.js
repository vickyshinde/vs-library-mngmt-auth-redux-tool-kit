import React, { useState, useEffect } from 'react';
import { useAddBookMutation, useEditBookMutation } from '../rtk/booksSlice';

const BookForm = ({ book, setEditingBook }) => {
  const [name, setName] = useState(book?.name || '');
  const [userId, setUserId] = useState(book?.userId || '');
  const [addBook] = useAddBookMutation();
  const [editBook] = useEditBookMutation();

  useEffect(() => {
    if (book) {
      setName(book.name);
      setUserId(book.userId);
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book) {
        await editBook({ id: book.id, name, userId });
      } else {
        await addBook({ name, userId });
      }
      setName('');
      setUserId('');
      setEditingBook(null);
    } catch (err) {
      console.error('Failed to save the book: ', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name Book:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <button type="submit">{book ? 'Update' : 'Add'} Book</button>
    </form>
  );
};

export default BookForm;
