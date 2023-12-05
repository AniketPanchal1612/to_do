import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BiImage } from "react-icons/bi";
import { updatePost } from "../../slices/PostSlice";
import { ToastContainer, toast } from "react-toastify";
import { GrFormClose } from "react-icons/gr";
import "react-toastify/dist/ReactToastify.css";
const UpdatePost = ({ onClose, post }) => {
  const dispatch = useDispatch();
  const { id, postName, postDesc, postImage } = post;

  const [updatePostName, setUpdatePostName] = useState(postName);
  const [updatePostDesc, setUpdatePostDesc] = useState(postDesc);
  const [updatePostImage, setUpdatePostImage] = useState(postImage);
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [imageError, setImageError] = useState(false);

  //img handler and uplod
  const imgRef = useRef();
  const handelImageSelect = () => {
    imgRef.current.click();
    setImageError(false);
  };

  const onFileChange = (e) => {
    const ImgRead = new FileReader();
    ImgRead.onload = () => {
      if (ImgRead.readyState === 2) {
        setUpdatePostImage(ImgRead.result);
        setImageError(false);
      }
    };
    ImgRead.readAsDataURL(e.target.files[0]);
  };

  //form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!updatePostName) {
      setNameError(true);
      return;
    }
    if (!updatePostDesc) {
      setDescError(true);
      return;
    }
    if (!updatePostImage) {
      setImageError(true);
      return;
    }

    const updatedPost = {
      id: id,
      postName: updatePostName,
      postDesc: updatePostDesc,
      postImage: updatePostImage,
      createdAt: Date(),
    };
    dispatch(updatePost(updatedPost));
    toast.success("Post updated successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-xl w-96">
        <div className="relative">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-0">Edit a post</h2>
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
            value={updatePostName}
            onChange={(e) => {
              setUpdatePostName(e.target.value);
              setNameError(false);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {nameError && (
            <p className="text-red-700 text-xs mt-1">Name is required</p>
          )}
          <div className="mt-4 cursor-pointer">
            <input
              type="file"
              src=""
              alt=""
              ref={imgRef}
              className="hidden"
              onChange={onFileChange}
              accept="image/*"
            />
            <li
              className="border flex rounded mt-4 items-center p-1 gap-3 w-56 curser-pointer"
              onClick={handelImageSelect}
            >
              <BiImage color="gray" size="22" style={{ color: "gray" }} />
              <p
                className={`text-sm font-semibold ${
                  updatePostImage.length === 0
                    ? "text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {updatePostImage.length === 0
                  ? "Add image"
                  : `${updatePostImage.substring(0, 10)}...`}
              </p>
            </li>
          </div>
          {imageError && (
            <p className="text-red-700 text-xs mt-1">Image is required</p>
          )}

          <hr className="mt-10" style={{ borderColor: "gray" }} />

          <div className="">
            <label htmlFor="postDesc" className="block mb-2 mt-8 font-bold">
              {/* Post Title: */}
              What's on your mind?
            </label>
            <textarea
              type="text"
              id="postDesc"
              
              value={updatePostDesc}
              onChange={(e) => {
                setUpdatePostDesc(e.target.value);
                setDescError(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-normal"
            />
          </div>
          {descError && (
            <p className="text-red-700 text-xs mt-1">Description is required</p>
          )}
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

export default UpdatePost;
