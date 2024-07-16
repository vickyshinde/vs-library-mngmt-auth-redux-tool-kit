import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, del } from '../utility/api';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  return get('/books');
});

export const addBookToAPI = createAsyncThunk('books/addBookToAPI', async (newBook) => {
  return post('/books', newBook);
});

export const updateBookToAPI = createAsyncThunk('books/updateBookToAPI', async (updatedBook) => {
  return put(`/books/${updatedBook.id}`, updatedBook);
});

export const deleteBookFromAPI = createAsyncThunk('books/deleteBookFromAPI', async (bookId) => {
  return del(`/books/${bookId}`);
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBookToAPI.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateBookToAPI.fulfilled, (state, action) => {
        const index = state.items.findIndex(book => book.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteBookFromAPI.fulfilled, (state, action) => {
        state.items = state.items.filter(book => book.id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
