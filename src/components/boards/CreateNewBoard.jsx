import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { addBoard } from "../../slices/BoardSlice";
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
const CreateNewBoard = ({ onClose }) => {
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState("");
  const [boardColor, setBoardColor] = useState("");

  //form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    const newBoard = {
      id: v4(),
      boardName,
      boardColor,
    };
    dispatch(addBoard(newBoard));
    toast.success("New board created successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
    setBoardColor("");
    setBoardName("");

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-xl mt-36">
        <div className="relative">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-4">
                Add a name for your board
              </h2>
            </div>
            <button
              onClick={onClose} 
              className="text-gray-500 bg-white hover:text-gray-700 focus:outline-none ml-12 mb-3"
            >
              <GrFormClose size="26" />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="boardTitle" className="block mb-2">
            {/* Post Title: */}
          </label>
          <input
            type="text"
            id="boardTitle"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
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
                    checked={boardColor === color}
                    onChange={(e) => setBoardColor(e.target.value)}
                    className="hidden"
                  />
                  <div
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border cursor-pointer ${
                      boardColor === color ? "border-2 border-black" : ""
                    }`}
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
              Create
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateNewBoard;
