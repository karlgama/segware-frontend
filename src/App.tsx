import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/CardHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineLike } from 'react-icons/ai'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/posts')
      .then((response) => {
        setPosts(response.data)
      })
  }, []);



  return (
    <div className="App">
      <header className="App-header">

      </header>
      <main>
        <div className="container">{posts.map((post: any) => {
          return (
            <Card key={post.id}>
              <CardHeader className="card-title"> {post.title}</CardHeader>
              <div className="container">{post.message}</div>
              <div className="upvote">
                {post.upvotes}︁<AiOutlineLike color="black" />
              </div>
            </Card>
          )
        })}</div>
      </main>
    </div>
  );
}

export default App;
