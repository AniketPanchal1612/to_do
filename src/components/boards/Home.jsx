import React, { useState } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteBoard } from "../../slices/BoardSlice";
import UpdateBoard from "./UpdateBoard";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //fetch from store
  const boards = useSelector((state) => state.boards);
  const searchKeyword = useSelector((state) => state.search);
  
  //Board Delete handler
  const handleDeleteBoard = (id) => {
    dispatch(deleteBoard({ id: id }));
    setMenuVisible(false);
    toast.success('Board deleted successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose:1000
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Board edit handler
  const handleEdit = (board) => { 
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  //if searched keyword otherwise all boards
  let filtereBoards = searchKeyword
    ? boards.filter((board) =>
        board.boardName.toLowerCase().includes(searchKeyword)
      )
    : boards;

  return (
    <div>
      {/* Navbar Header */}
      <NavBar />

      <div className="home mt-4 ml-2 mr-2 lg:ml-6">
        <div className="heading ">
          <h3 className="text-3xl font-bold">My Boards</h3>
        </div>
        <div className="boards mt-8"></div>

        {/* <Boards /> */}
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8">
          {filtereBoards.map((board, index) => (
            <div
              key={index}
              className="border border-solid rounded-md h-20 w-96 sm:w-86 mb-2"
            >
              <div className="flex items-center">
                <Link  to={`/${board.id}`}>
                <div
                  className="w-20 h-20 mr-8 rounded-md"
                  style={{ backgroundColor: board.boardColor }}
                  ></div>
                  </Link>
                <Link to={`/${board.id}`} className="">
                  {board.boardName}
                </Link>
                <div className="flex ml-auto items-center">
                  
                  {/* Edit Delete Menu btn */}
                  <button
                    className="relative flex justify-center items-center b-white group rounded-lg  "
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
                            onClick={() => handleEdit(board)}
                          >
                            <FiEdit3 className="mr-3" />
                            Edit
                          </li>
                          <li
                            className="px-3 py-1 flex text-red-500 hover:bg-gray-100 items-center"
                            onClick={() => handleDeleteBoard(board.id)}
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
            </div>
          ))}
        </div>
      </div>

      {/* Update boards component */}
      {isModalOpen && (
        <UpdateBoard board={selectedBoard} onClose={handleCloseModal} />
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
