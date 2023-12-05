import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidBookmarks } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsHeart } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { addBookMark, removeBookMark } from "../../slices/BookMarkSlice";
import { deletePost } from "../../slices/PostSlice";
import UpdatePost from "./UpdatePost";
import { BsHeartFill } from "react-icons/bs";
import { toggleLike } from "../../slices/LikesSlice";
import EmptyComp from "./EmptyComp";
import PostNavbar from "./PostNavbar";
const LikePosts = () => {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  //fetch from store
  const allPosts = useSelector((state) => state.posts);
  const likePosts = useSelector((state) =>
    state.likes.map((postId) => allPosts.find((post) => post.id === postId))
  );
  const bookMarkPosts = useSelector((state) => state.bookMarks);
  const searchKeyword = useSelector((state) => state.search);

  //Bookmark add-remove handler
  const handleBookMark = (post) => {
    if (bookMarkPosts.includes(post.id)) {
      dispatch(removeBookMark(post.id));
    } else {
      dispatch(addBookMark(post.id));
    }
  };

  //delete post handler
  //if post also bookmarked or like then also delete from there
  const handleDeletePost = (id) => {
    const likedPost = likePosts.find((post) => post.id === id);
    if (bookMarkPosts.includes(id)) {
      dispatch(removeBookMark(id));
    }
    if (likedPost) {
      dispatch(toggleLike(id));
    }
    dispatch(deletePost({ id: id }));
    setMenuVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //edit post handler
  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  //Like-dislike  handler
  const handleToggleLike = (e, post) => {
    e.preventDefault();
    dispatch(toggleLike(post.id));
  };

  //if searched keyword otherwise all posts
  let filteredPosts = searchKeyword
    ? likePosts.filter((post) =>
        post.postName.toLowerCase().includes(searchKeyword)
      )
    : likePosts;

  return (
    <>
      {/* Navbar header  */}
      <PostNavbar title={"My Liked Posts"} />

      <div className=" bg-blue-300 min-h-screen flex flex-col items-center justify-center">
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
            <div className="flex justify-center sm:justify-center">
              <div className=" mt-4 ml-3 mb-4 grid lg:grid-cols-4 sm:grid-cols-2 gap-6 h-1/2">
                {filteredPosts.map((post, index) => (
                  <div
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
                          className="relative flex jutify-center items-center b-white rounded-lg group"
                          onClick={() => setMenuVisible(!menuVisible)}
                        >
                          <span className="p-2">
                            <HiOutlineDotsVertical />
                          </span>
                          {menuVisible && (
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

                    <div className="">
                      <img
                        src={post?.postImage}
                        alt=""
                        className="mb-1 h-48 border rounded-lg"
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
                        onClick={(e) => handleToggleLike(e, post)}
                      >
                        {likePosts.includes(post.id) ? (
                          <BsHeart className="mt-1" />
                        ) : (
                          <BsHeartFill className="mt-1 text-red-500" />
                        )}
                      </button>
                      <span>{likePosts.includes(post.id) ? "0" : "1"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </h1>

        {/* update post component */}
        {isModalOpen && (
          <UpdatePost post={selectedPost} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
};

export default LikePosts;
