import React, { useState } from "react";
import PostNavbar from "./PostNavbar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import PostLists from "./PostLists";
import CreateNewPost from "./CreateNewPost";

const PostHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  //fetch from store
  const boards = useSelector((state) => state.boards);
  const posts = useSelector((state) => state.posts);
  const selectedBoard = boards.find((board) => board.id === id);

  const handleCreateButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <PostNavbar />
      <div
        className="relative w-full h-screen"
        style={{ background: selectedBoard.boardColor }}
      >
        <div
          className="w-full absolute"
          style={{ background: selectedBoard.boardColor }}
        >
          <div className=" flex items-center justify-between  mt-5 font-bold mr-2 ml-2">
            <h3 className="text-2xl ml-3">
              {posts.length > 0 ? "" : "Your Posts"}
            </h3>
            
            
            <button
              onClick={handleCreateButtonClick}
              className="bg-[#D33852] h-9 w-34 mr-2 px-5 ml-4 rounded-xl flex items-center justify-center "
            >
              <AiOutlinePlus
                className="text-white font-extrabold"
                size={"18"}
                
              />
              <div
                className="text-white px-2 text-1xl font-bold"
                
              >
                Create New Post
              </div>
            </button>

            {/* create post component */}
            {isModalOpen && <CreateNewPost onClose={handleCloseModal} />}
          </div>
          <PostLists onClose={handleCloseModal} />
        </div>
      </div>
    </>
  );
};

export default PostHome;
