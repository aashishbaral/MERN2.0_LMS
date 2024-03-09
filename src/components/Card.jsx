import React from "react";
import { Link } from "react-router-dom";

const Card = ({ book }) => {
  return (
    <>
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
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{book.bookName}</div>
          <p className="text-gray-700 text-base">Rs. {book.bookPrice}</p>
          <p className="text-gray-700 text-base">ISBN: {book.isbnNumber}</p>

          <Link to={`/SingleBook/${book._id}`}>See More</Link>
        </div>
      </div>
    </>
  );
};

export default Card;
