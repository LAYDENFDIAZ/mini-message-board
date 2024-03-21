import "./App.css";
import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import NavBar from "./components/NavBar";

function App() {
  const [posts, setPosts] = useState(null); // State to store the posts data
  // Effect hook to fetch posts data when the component mounts

  const getPost = (id) => {
    return posts.find((post) => post._id === id);
  };

  const handleAddPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  }

  const handleUpdatePosts = (updatedPost) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post._id === updatedPost._id) {
          return updatedPost;
        }
        return post;
      });
    });
  }

  useEffect(() => {
    // Function to fetch posts data from the API
    const refreshPosts = async () => {
      try {
        const serverPosts = await fetchPosts(); // Fetch posts data
        setPosts(serverPosts); // Update the posts state with fetched data
      } catch (error) {
        console.error("Error fetching posts:", error); // Log any errors that occur during fetching
      }
    };

    refreshPosts(); // Call the refreshPosts function to fetch posts data
  }, [null]); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/*" element={<HomePage posts={posts} />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/posts/:postId" element={<PostPage getPost={getPost} handleUpdatePosts={handleUpdatePosts}/>} />
      </Routes>
    </div>
  );
}

export default App;
