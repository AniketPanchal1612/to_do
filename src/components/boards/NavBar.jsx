import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import CreateNewBoard from "./CreateNewBoard";
import { setSearchKeyword } from "../../slices/PostSlice";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchKeyword = useSelector((state) => state.search);

  const handleCreateButtonClick = () => {
    setIsModalOpen(true);
};
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //if any keyword search or not
  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    dispatch(setSearchKeyword(keyword));
  };

  return (
    <>
      <div className="flex sm:flex-row h-16 items-center justify-between mr-4">
        <div className="flex flex-shrink-0 items-center">
        </div>
        <div className="flex justify-between">

          {/* Search bar */}
          <div className="hidden sm:block relative mr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchKeyword}
              onChange={handleSearchChange}
              className="w-84 py-3 pl-12 pr-4 h-10 text-gray-500 border rounded-lg outline-none bg-gray-50 focus:bg-white focus:border-gray-600"
            />
          </div>

          {/* Create a new board */}
          <button
            onClick={handleCreateButtonClick}
            className="bg-[#D33852] h-9 px-5 ml-4 rounded-xl flex items-center justify-center"
          >
            <AiOutlinePlus className="text-white font-extrabold" size={'18'} style={{fontWeight:'800'}} />
            <div
              className="hidden sm:block text-white px-2 text-1xl font-bold"
              
            >
              Create New Board
            </div>
          </button>

          {/* Create board component */}
          {isModalOpen && <CreateNewBoard onClose={handleCloseModal} />}
        </div>
      </div>
      <hr className="w-full" />
    </>
  );
};

export default NavBar;
