import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookToAPI, updateBookToAPI } from '../rtk/booksSlice';

const BookForm = ({ book, setEditingBook }) => {
  const [formData, setFormData] = useState({ name: '', summary: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    if (book) {
      setFormData({ name: book.name, summary: book.summary });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.summary) {
      if (book) {
        dispatch(updateBookToAPI({ ...book, ...formData }));
        setEditingBook(null);
      } else {
        const newBookWithId = { ...formData, id: Date.now() };
        dispatch(addBookToAPI(newBookWithId));
      }
      setFormData({ name: '', summary: '' });
    } else {
      alert('Please fill in both fields');
    }
  };

  const handleCancel = () => {
    setEditingBook(null);
    setFormData({ name: '', summary: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Book Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="summary"
        placeholder="Book Summary"
        value={formData.summary}
        onChange={handleChange}
      />
      <button type="submit">{book ? 'Update' : 'Add'}</button>
      {book && <button type="button" onClick={handleCancel}>Cancel</button>}
    </form>
  );
};

export default BookForm;
