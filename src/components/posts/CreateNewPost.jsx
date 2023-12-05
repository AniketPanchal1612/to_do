import React, { useRef, useState } from "react";
import { BiImage } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { GrFormClose } from "react-icons/gr";
import { addPost } from "../../slices/PostSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateNewPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [postName, setPostName] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postImage, setPostImage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // img uploader and handler
  const imgRef = useRef();
  const handelImageSelect = () => {
    imgRef.current.click();
  };
  const onFileChange = (e) => {
    const ImgRead = new FileReader();
    ImgRead.onload = () => {
      if (ImgRead.readyState === 2) {
        setPostImage(ImgRead.result);
        setImageError(false);
      }
    };
    ImgRead.readAsDataURL(e.target.files[0]);
  };

  //form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!postName) {
      setNameError(true);
      return;
    }
    if (!postDesc) {
      setDescError(true);
      return;
    }
    if (!postImage) {
      setImageError(true);
      return;
    }
    const newPost = {
      id: v4(),
      postName,
      postImage,
      postDesc,
      boardId: id,
      createdAt: Date(),
    };
    dispatch(addPost(newPost));
    toast.success("New post created successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
    setPostDesc("");
    setPostName("");
    setPostImage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-xl w-96">
        <div className="relative">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-0">Create a post</h2>
              <p className="text-sm text-gray-400 font-normal">
                write something for your post
              </p>
            </div>
            <button
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <GrFormClose size="26" />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="postTitle" className="block mb-2 mt-8 font-bold">
            {/* Post Title: */}
            Subject
          </label>
          <input
            type="text"
            id="postTitle"
            value={postName}
            onChange={(e) => {
              setPostName(e.target.value);
              setNameError(false); 
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {nameError && (
            <p className="text-red-700 text-xs mt-1">Name is required</p>
          )}
          <div className="mt-4 cursor-pointer">
            <button
              className="border flex rounded mt-4 items-center p-1 gap-3 w-56 curser-pointer"
              onClick={handelImageSelect}
            >
            <input
              type="file"
              src=""
              alt=""
              ref={imgRef}
              rows={10}
              cols={10}
              
              className="hidden"
              onChange={onFileChange}
              accept="image/*"
            />
              <BiImage color="" size="26" style={{ color: "gray" }} />
              <p
                className={'text-sm font-semibold text-gray-600 '}
              >
                {postImage.length === 0
                  ? "Add image"
                  : `${postImage.substring(0,10)}...`}
              </p>
            </button>
            
          </div>
          {imageError && (
            <p className="text-red-700 text-xs mt-1">Image is required</p>
          )}

          <hr className="mt-10" style={{ borderColor: "gray" }} />

          <div className="">
            <label htmlFor="postDesc" className="block mb-2 mt-8 font-bold">
             
              What's on your mind?
            </label>
            <textarea
              type="text"
              id="postDesc"
              value={postDesc}
              onChange={(e) => {
                setPostDesc(e.target.value);
                setDescError(false); 
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-normal"
            />
            {descError && (
              <p className="text-red-700 text-xs mt-1">
                Description is required
              </p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            
            <button
              type="submit"
              
              className="px-4 py-2 rounded-md text-white font-bold bg-red-800"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateNewPost;
