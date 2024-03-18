import "./App.css";
import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
