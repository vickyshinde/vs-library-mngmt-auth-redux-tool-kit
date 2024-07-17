import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3131' }),
  endpoints: (builder) => ({
    fetchBooks: builder.query({
      query: () => 'books',
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
    }),
    editBook: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchBooksQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = booksApi;
