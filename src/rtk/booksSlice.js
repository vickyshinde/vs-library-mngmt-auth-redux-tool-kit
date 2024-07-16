import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: [
    { id: 1, name: 'Book 1', summary: 'Summary of Book 1' },
    { id: 2, name: 'Book 2', summary: 'Summary of Book 2' },
  ],
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    editBook: (state, action) => {
      const index = state.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBook: (state, action) => {
      return state.filter(book => book.id !== action.payload);
    },
  },
});

export const { addBook, editBook, deleteBook } = booksSlice.actions;
export default booksSlice.reducer;
