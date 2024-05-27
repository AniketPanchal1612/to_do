import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import {RxDividerVertical} from 'react-icons/rx'
import { setSearchKeyword } from "../../slices/PostSlice";

const PostNavbar = ({title}) => {
  const { id } = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); 
  
  //fetch from store
  const boards = useSelector((state) => state.boards);
  const selectedBoard = boards.find((board) => board.id === id);
  const bookmarks = useSelector((state) => state.bookMarks);
  const likes = useSelector((state) => state.likes);
  const searchKeyword = useSelector((state) => state.search);



  //search handler if any enter keyword then stre 
  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    dispatch(setSearchKeyword(keyword));
  };


  return (
    <>
      <div className={"flex h-16 items-center justify-between"}>
        <div className="flex items-center gap-2 ml-2 lg:ml-8">
      
          <div onClick={() => navigation(-1)}>
            <MdArrowBackIos className="cursor-pointer" />
          </div>
          
          <h3 className="ml-2 font-bold">{title? title : selectedBoard.boardName}</h3>
        </div>
       
        <div className="flex justify-between">
          <div className="relative mr-1">
          {isSearchExpanded ? (
            
            <div className="relative mr-6">
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
              className="w-44 sm:w-84 py-3 pl-12 pr-4 h-10 text-gray-500 border rounded-lg outline-none bg-gray-50 focus:bg-white focus:border-gray-600"
            />
          </div>
          ) : (
            <BiSearch
              size={"24"}
              className="text-gray-400 cursor-pointer h-10 mr-3"
              onClick={() => setIsSearchExpanded(true)}
            />
          )}
          </div>
          <div className="">
          <RxDividerVertical size={"36"} className="text-gray-500 hidden sm:block"/> 
          </div>
          <button
            
            className=" h-9 w-34 px-0 sm:px-5 rounded-xl flex items-center justify-center"
          >
            <Link to="/likes" className="relative mr-3">
              <BsHeart
                className="text-gray-700 font-extrabold"
                size={"20"}
                
              />
              <span className="badge bg-black text-white text-xs absolute top-3 right-3 px-1 rounded-full">
                {likes.length}
              </span>
            </Link>
            <Link to="/bookmark" className="relative">
              <FaRegBookmark
                className="text-gray-700 font-extrabold"
                size={"20"}
                
              />
              <span className="badge bg-black text-white text-xs absolute top-3 right-3 px-1 rounded-full">
                {bookmarks.length}
              </span>
            </Link>
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default PostNavbar;
