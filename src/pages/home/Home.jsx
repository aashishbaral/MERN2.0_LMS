import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import NavBar from "../../components/NavBar";

const Home = () => {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3000/book/");

    if (response.status === 200) {
      setBooks(response.data.data);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <>
      <NavBar />
      <div className="flex flex-wrap justify-evenly mt-20">
        {books.length > 0 &&
          books.map((book) => {
            return <Card key={book._id} book={book} />;
          })}
      </div>
    </>
  );
};

export default Home;
