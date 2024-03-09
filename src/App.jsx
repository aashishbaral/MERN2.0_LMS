import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBook from "./pages/addBook/AddBook";
import EditBook from "./pages/editBook/EditBook";
import Home from "./pages/home/Home";
import SingleBook from "./pages/singleBook/SingleBook";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/SingleBook/:id/" element={<SingleBook />}></Route>
          <Route path="/AddBook" element={<AddBook />}></Route>
          <Route path="/Edit/:id/" element={<EditBook />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
