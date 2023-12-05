import { createSlice } from "@reduxjs/toolkit";

import postData from "../data/postData";

const postSlice = createSlice({
  name: "posts",
  initialState: postData,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      const { id } = action.payload;
      const dbid = state.find((post) => post.id === id);
      if (dbid) {
        return state.filter((find) => find.id !== id);
      }
    },
    updatePost: (state, action) => {
      const { id, postName, postDesc, postImage } = action.payload;
      const findPost = state.find((post) => post.id === id);
      if (findPost) {
        findPost.postName = postName;
        findPost.postDesc = postDesc;
        findPost.postImage = postImage;
      }
    },

    updatePostOrder: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedPost] = state.splice(sourceIndex, 1);
      state.splice(destinationIndex, 0, movedPost);
    },
  },
});

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearchKeyword: (state, action) => {
      return action.payload.toLowerCase();
    },
    clearSearchKeyword: (state) => "",
  },
});

export const { addPost, deletePost, updatePost,updatePostOrder } = postSlice.actions;
export const {setSearchKeyword,clearSearchKeyword} = searchSlice.actions;
export const searchReducer= searchSlice.reducer
export default postSlice.reducer;
