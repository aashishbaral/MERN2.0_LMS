import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    bookName: "",
    bookPrice: "",
    isbnNumber: "",
    authorName: "",
    publishedAt: "",
    publication: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", image);

    const response = await axios.patch(
      "http://localhost:3000/book/" + id,
      formData
    );
    if (response.status === 200) {
      navigate("/SingleBook/" + id);
    } else {
      alert("Something went wrong");
    }
  };

  const fetchBook = async () => {
    const response = await axios.get("http://localhost:3000/book/" + id);
    if (response.status === 200) {
      setData(response.data.data);
    }
  };

  fetchBook();

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
              value={data.bookName}
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
              value={data.bookPrice}
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
              value={data.isbnNumber}
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
              value={data.authorName}
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
              value={data.publication}
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
              value={data.publishedAt}
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
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 p-2 w-full border rounded-md text-gray-800"
            />
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

export default EditBook;