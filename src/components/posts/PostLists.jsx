import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import { BiSolidBookmarks } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { deletePost } from "../../slices/PostSlice";
import UpdatePost from "./UpdatePost";
import { addBookMark, removeBookMark } from "../../slices/BookMarkSlice";
import { toggleLike } from "../../slices/LikesSlice";
import EmptyComp from "./EmptyComp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

const PostLists = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  //fetch form stores
  const boards = useSelector((state) => state.boards);
  const posts = useSelector((state) => state.posts);
  const bookMarkPosts = useSelector((state) => state.bookMarks);
  const selectedBoard = boards.find((board) => board.id === id);
  const selectedPosts = posts.filter(
    (post) => post.boardId === selectedBoard.id
  );
  const likes = useSelector((state) => state.likes);
  const searchKeyword = useSelector((state) => state.search);

  //delete post handler
  //if post also bookmarked or like then also delete from there
  const handleDeletePost = (id) => {
    if (bookMarkPosts.includes(id)) {
      dispatch(removeBookMark(id));
    }
    if(likes.includes(id)){
      dispatch(toggleLike(id));
    }
    dispatch(deletePost({ id: id }));
    setMenuVisible(false);
    toast.success("Post deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose:1000

    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //edit post handler
  const handleEdit = (post) => {
    setSelectedPost(post);

    setIsModalOpen(true);
  };

  //Bookmark add-remove handler
  const handleBookMark = (post) => {
    if (bookMarkPosts.includes(post.id)) {
      dispatch(removeBookMark(post.id));
      toast.success("Bookmark removed!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:1000
      });
    } else {
      dispatch(addBookMark(post.id));
      toast.success("Post bookmarked!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:1000

      });
    }
  };
  
  //Like-dislike  handler
  const handleToggleLike = (post) => {
    if (likes.includes(post.id)) {
      dispatch(toggleLike(post.id)); 
      toast.success("Post disliked!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:1000
        
      });
    } else {
      dispatch(toggleLike(post.id)); 
      toast.success("Post liked!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:1000

      });
    }
  };
  
  //if searched keyword otherwise all posts
  let filteredPosts = searchKeyword
  ? selectedPosts.filter((post) =>
  post.postName.toLowerCase().includes(searchKeyword)
  )
  : selectedPosts;
  
  const [menuVisibleStates, setMenuVisibleStates] = useState(filteredPosts.map(() => false));
  
  //for menu edit delete btn
  const toggleMenuVisible = (index) => {
    setMenuVisibleStates((prevState) => {
      const updatedMenuVisibleStates = [...prevState];
      updatedMenuVisibleStates[index] = !updatedMenuVisibleStates[index];
      return updatedMenuVisibleStates;
    });
  };
  
  console.log(filteredPosts)
  
  return (
    <div className="mt-4 sm:ml-4  mb-6">
      <h1>
        {filteredPosts.length === 0 ? (
          <div>
            <EmptyComp
              title1={"Nothing here yet"}
              postTitle={
                "Create your first post by clicking on the + button above"
              }
            />
          </div>
        ) : (
          // drag drop feature
          <Droppable droppableId="postlistss">
            {(provided)=>(

            <div className="flex justify-center sm:justify-start" ref ={provided.innerRef} {...provided.droppableProps}>
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 h-1/2">
                
                {filteredPosts.map((post, index) => (
                  <Draggable draggableId={post.id} key={post.id} index={index}>
                    {(provided)=>(
                      
                    
                    
                  <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref ={provided.innerRef}
                    key={post.id}
                    className="bg-white border border-solid rounded-md h-full w-72 mb-2 p-5 pb-1"
                  >
                    <div className="flex justify-between h-16 items-center">
                      <h2 className="font-bold">{post?.postName}</h2>
                      <div className="flex items-center justify-center space-x-2">
                        <button onClick={() => handleBookMark(post)}>
                          {bookMarkPosts.includes(post.id) ? (
                            <BiSolidBookmarks />
                          ) : (
                            <FaRegBookmark />
                          )}
                        </button>
                        <button
                          className="w-10 relative flex jutify-center items-center b-white rounded-lg group"
                          onClick={() => toggleMenuVisible(index)}
                        >
                          <span className="p-2">
                            <HiOutlineDotsVertical />
                          </span>
                          {menuVisibleStates[index] && (
                            <div className="absolute hidden group-focus:block top-3/4 left-5/9 bg-white shadow-xl mt-1 rounded-lg">
                              <ul className="text-left border rounded-lg w-30 py-2">
                                <li
                                  className="px-3 py-1 flex  hover:bg-gray-100 items-center "
                                  onClick={() => handleEdit(post)}
                                >
                                  <FiEdit3 className="mr-3" />
                                  Edit
                                </li>
                                <li
                                  className="px-3 py-1 flex text-red-500 hover:bg-gray-100 items-center"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <RiDeleteBin6Line className="mr-3" />
                                  Delete
                                </li>
                              </ul>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      <span className="mr-1">
                        {post.createdAt.split(" ")[2]}
                      </span>
                      <span>{post.createdAt.split(" ")[1]}</span>
                    </div>
                    {/* {post.image} */}
                    <div className="">
                      <img
                        src={post?.postImage}
                        alt=""
                        className="mb-1 h-48  border rounded-lg"
                      />
                      <p className="h-56">{post?.postDesc}</p>
                    </div>
                    <hr
                      className="mt-2"
                      style={{ borderColor: "gray", paddingRight: "20px" }}
                    />

                    <div className="mt-4 flex items-center justify-start space-x-2">
                      <button
                        className="cursor-pointer"
                        onClick={() => handleToggleLike(post)}
                      >
                        {likes.includes(post.id) ? (
                          <BsHeartFill className="mt-1 text-red-500" />
                        ) : (
                          <BsHeart className="mt-1" />
                        )}
                      </button>
                      <span>{likes.includes(post.id) ? "1" : "0"}</span>
                    </div>
                  </div>
                  )}
                  </Draggable>

                ))}
              </div>
            </div>
            )}

          </Droppable>
        )}
      </h1>

      {/* update post component */}
      {isModalOpen && (
        <UpdatePost post={selectedPost} onClose={handleCloseModal} />
      )}
      <ToastContainer />
    </div>
  );
};

export default PostLists;
