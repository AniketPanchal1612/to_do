
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import {Routes, Route } from "react-router-dom";

import NavBar from './components/boards/NavBar';
import './App.css';
import Home from './components/boards/Home';
import PostHome from './components/posts/PostHome';
import BookMarkPosts from './components/posts/BookMarkPosts';
import LikePosts from './components/posts/LikePosts';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { updatePostOrder } from './slices/PostSlice';
function App() {
  const dispatch = useDispatch()
  const onDragEnd = (DropResult) => {
    const { source, destination } = DropResult;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    dispatch(updatePostOrder({ sourceIndex: source.index, destinationIndex: destination.index }));

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/:id' element={<PostHome />} exact />
          <Route path='/bookmark' element={<BookMarkPosts />} exact />
          <Route path='/likes' element={<LikePosts />} exact />


        </Routes>
      </BrowserRouter>
    </DragDropContext>




  );
}

export default App;
