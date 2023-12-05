import { createSlice } from "@reduxjs/toolkit";

const bookMarkSlice = createSlice({
  name: "bookmarks",
  initialState: [],
  reducers: {
    addBookMark: (state, action) => {
      // Check if the post is already bookmarked
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeBookMark: (state, action) => {
      const idToRemove = action.payload;
      return state.filter((postId) => postId !== idToRemove);
    },
  },
});

export const { addBookMark, removeBookMark } = bookMarkSlice.actions;
export default bookMarkSlice.reducer;
