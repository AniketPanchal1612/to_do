import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBoard } from "../../slices/BoardSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrFormClose } from "react-icons/gr";

// Define Color Code 
const colors = [
  "#ffc8dd",
  "#a3b18a",
  "#ade8f4",
  "#eae2b7",
  "#95d5b2",
  "#c77dff",
];
const UpdateBoard = ({ onClose, board }) => {
  console.log(board);
  const dispatch = useDispatch();
  const { id, boardName, boardColor } = board;

  //set as previous value of boards
  const [updateBoardName, setUpdateBoardName] = useState(boardName);
  const [updateBoardColor, setUpdateBoardColor] = useState(boardColor);

  //form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateBoardDetail = {
      id: id,
      boardName: updateBoardName,
      boardColor: updateBoardColor,
    };
    dispatch(updateBoard(updateBoardDetail));
    toast.success("Board updated successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-xl">
        <div className="relative">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-4">
                Update a name for your board
              </h2>
            </div>
            <button
              onClick={onClose} 
              className="text-gray-500 bg-white hover:text-gray-700 focus:outline-none ml-12 mb-3"
            >
              <GrFormClose size="26" />
            </button>
          </div>
        </div>{" "}
        <form onSubmit={handleSubmit}>
          <label htmlFor="boardTitle" className="block mb-2">
          </label>
          <input
            type="text"
            id="boardTitle"
            value={updateBoardName}
            onChange={(e) => setUpdateBoardName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <div className="mt-4">
            <span className="block mb-2 font-bold">Select Post Colour:</span>
            <span className="block mb-2 text-sm text-gray-400">
              Here are some tamplates to help you get started
            </span>

            <div className="flex">
              {colors.map((color) => (
                <label key={color} className="mr-3">
                  <input
                    type="radio"
                    value={color}
                    checked={updateBoardColor === color}
                    onChange={(e) => setUpdateBoardColor(e.target.value)}
                    className="hidden"
                  />
                  <div
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border 
                        ${
                          updateBoardColor === color
                            ? "border-2 border-black"
                            : ""
                        }
                        cursor-pointer 
                        `}
                  ></div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            
            <button
              type="submit"
              
              className="px-4 py-2 rounded-md text-white font-bold bg-red-800"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateBoard;
