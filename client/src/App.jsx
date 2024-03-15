import "./App.css";
import NavBar from "./components/NavBar";
import Feed from "./components/Feed";
import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="posts/:postId" element={<PostPage />} />
      </Routes>
    </>
  );
}

export default App;
