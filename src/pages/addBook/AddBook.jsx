import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

const AddBook = () => {
  // const [bookName, setBookName] = useState("");
  // const [bookPrice, setBookPrice] = useState("");
  // const [isbnNumber, setIsbnNumber] = useState(null);
  // const [authorName, setAuthorName] = useState("");
  // const [publishedAt, setPublishedAt] = useState("");
  // const [publication, setPublication] = useState("");
  // const [image, setImage] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(); // {}
  //   formData.append("bookName", bookName);
  //   formData.append("bookPrice", bookPrice);
  //   formData.append("isbnNumber", isbnNumber);
  //   formData.append("authorName", authorName);
  //   formData.append("publishedAt", publishedAt);
  //   formData.append("publication", publication);
  //   formData.append("image", image);

  //   const response = await axios.post("http://localhost:3000/book", formData);

  // const response = await axios.post(
  //   "http://localhost:3000/book",
  //   {
  //     bookName,
  //     bookPrice,
  //     isbnNumber,
  //     authorName,
  //     publishedAt,
  //     publication,
  //     image,
  //   },
  //   {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   }
  // );

  const navigate = useNavigate();

  const [data, setData] = useState({
    bookName: "",
    bookPrice: "",
    isbnNumber: "",
    authorName: "",
    publishedAt: "",
    publication: "",
  });
  const [error, setError] = useState("");
  const [validate, setValidate] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    // console.log(file);

    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    const limitSize = 1000000; // 1 MB

    if (!allowedFileTypes.includes(file.type)) {
      setError("Only image file is accepted.");
      setValidate(false);
    } else if (file.size > limitSize) {
      setError("File size cannot be more than 1 MB");
      setValidate(false);
    } else {
      setImage(file);
      setValidate(true);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (validate) {
      formData.append("image", image);

      const response = await axios.post(
        "https://mern2-0-basicnode-8atg.onrender.com/book",
        formData
      );
      if (response.status === 201) {
        navigate("/");
      } else {
        alert("Some thing went wrong");
      }
    }
  };

  const [image, setImage] = useState(null);

  return (
    <>
      <NavBar />
      <div className="bg-white rounded-lg shadow-md p-8 w-full mx-auto my-16 max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Add Book</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="bookName"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bookPrice"
              className="block text-sm font-medium text-gray-600"
            >
              bookPrice
            </label>
            <input
              type="number"
              id="bookPrice"
              name="bookPrice"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="isbnNumber"
              className="block text-sm font-medium text-gray-600"
            >
              isbnNumber
            </label>
            <input
              type="number"
              id="isbnNumber"
              name="isbnNumber"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="authorName"
              className="block text-sm font-medium text-gray-600"
            >
              authorName
            </label>
            <input
              type="text"
              id="authorName"
              onChange={handleChange}
              name="authorName"
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publication"
              className="block text-sm font-medium text-gray-600"
            >
              publication
            </label>
            <input
              type="text"
              id="publication"
              name="publication"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publishedAt"
              className="block text-sm font-medium text-gray-600"
            >
              Published At
            </label>
            <input
              type="date"
              id="publishedAt"
              name="publishedAt"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="bookImage"
              className="block text-sm font-medium text-gray-600"
            >
              Image
            </label>
            <input
              type="file"
              id="bookImage"
              name="image"
              onChange={handleImage}
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
            />
            <span className="text-red-400">{error}</span>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Book
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
