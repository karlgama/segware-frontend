import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineLike } from "react-icons/ai";
import AddPost from "./components/AddPost";
import PostModal from "./components/PostModal";
import Context from "./Context";

const upvote = (id) => {
  axios.patch(`http://localhost:8080/posts/${id}/upvotes`).then((response) => {
    return;
  });
};

function App() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((response) => {
      setPosts(response.data);
    });
  }, [posts]);

  return (
    <Context.Provider value={{ show, setShow }}>
      <div className="App">
        <header className="App-header"></header>
        <main className="mt-4">
          <div className="container">
            {posts.map((post) => {
              return (
                <Card className="mb-3" key={post.id}>
                  <CardHeader className="card-title"> {post.title}</CardHeader>
                  <div className="container">{post.message}</div>
                  <div onClick={() => upvote(post.id)} className="upvote">
                    {post.upvotes}︁ <AiOutlineLike color="black" />
                  </div>
                </Card>
              );
            })}
            <AddPost />
            <PostModal />
          </div>
        </main>
      </div>
    </Context.Provider>
  );
}

export default App;
