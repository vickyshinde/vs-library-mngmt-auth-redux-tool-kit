import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery } from '../rtk/booksSlice';

const BookDetail = () => {
  const { id } = useParams();
  const { data: book, error, isLoading } = useFetchBookByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h1>Book Detail</h1>
      <p>ID: {book.id}</p>
      <p>Name: {book.name}</p>
      <p>User ID: {book.userId}</p>
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default BookDetail;
