import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookDetail = () => {
  const { id } = useParams();
  const book = useSelector((state) => state.books.find((book) => book.id === parseInt(id)));

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div>
      <h1>{book.name}</h1>
      <p>{book.summary}</p>
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default BookDetail;
