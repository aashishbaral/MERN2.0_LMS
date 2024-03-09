import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const fetchBook = async () => {
    const response = await axios.get(`http://localhost:3000/book/${id}`);
    if (response.status === 200) {
      setBook(response.data.data);
    }
  };

  useEffect(() => {
    fetchBook(), [];
  });

  const handleClick = async () => {
    const response = await axios.delete(`http://localhost:3000/book/${id}`);
    if (response.status === 200) {
      navigate("/");
      console.log(response.data.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="max-w-sm rounded overflow-hidden shadow-lg my-10">
        <img
          className="w-full"
          src={
            book.imageUrl
              ? book.imageUrl
              : "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/50/2018/11/hero.jpg"
          }
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.bookName}</div>
        <p className="text-gray-700 text-base">Rs. {book.bookPrice}</p>

        <button onClick={handleClick} className="bg-red-300 p-3">
          Delete
        </button>

        <Link to={`/Edit/${book._id}`}>
          <button className="bg-blue-300 p-3 ml-3">Edit</button>
        </Link>
      </div>
    </>
  );
};

export default SingleBook;
