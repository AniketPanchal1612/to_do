import { configureStore } from "@reduxjs/toolkit";
import BoardSlice from "./slices/BoardSlice";
import PostSlice, { searchReducer } from "./slices/PostSlice";
import BookMarkSlice from "./slices/BookMarkSlice";
import LikesSlice from "./slices/LikesSlice";


const store = configureStore({
    reducer:{
        boards: BoardSlice,
        posts:PostSlice,
        bookMarks: BookMarkSlice,
        likes : LikesSlice,
        search: searchReducer
    }
})

export default store