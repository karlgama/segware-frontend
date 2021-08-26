import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AiOutlineLike, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import AddPost from './components/AddPost'
import PostModal from './components/PostModal'
import Context from './Context'

const baseUrl = 'http://localhost:8080'

const upvote = id => {
  axios.patch(`${baseUrl}/posts/${id}/upvotes`)
}
const intialState = {
  id: '',
  title: '',
  message: ''
}

interface Ipost {
  id: string;
  title: string;
  message: string;
}

function App() {
  const [posts, setPosts] = useState([])
  const [currentPost, setCurrentPost] = useState(intialState)
  const [show, setShow] = useState(false)
  const [action, setAction] = useState('new')

  function edit(post: Ipost) {
    setShow(true)
    setAction('update')
    setCurrentPost({ id: post.id, title: post.title, message: post.message })
  }
  function remove(id: string) {
    const res = confirm()
    res ? axios.delete(`${baseUrl}/posts/${id}`) : null

  }

  useEffect(() => {
    axios.get(`${baseUrl}/posts`).then(response => {
      setPosts(response.data)
    })
  }, [posts])

  return (
    <Context.Provider
      value={{ show, setShow, baseUrl, currentPost, setCurrentPost }}
    >
      <div className="App">
        <header className="App-header"></header>
        <main className="mt-4">
          <div className="container">
            {posts
              .map(post => {
                return (
                  <Card className="mb-3" key={post.id}>
                    <CardHeader className="card-title">{post.title}</CardHeader>
                    <div className="container">{post.message}</div>
                    <div className="icons">
                      <div className="icon upvote" onClick={() => upvote(post.id)}>
                        {post.upvotes}︁ <AiOutlineLike />
                      </div>
                      <div
                        onClick={() => {
                          edit(post)
                        }}
                        className="icon"
                      >
                        <AiOutlineEdit color="black" />
                      </div>
                      <div
                        className="icon delete"
                        onClick={() => remove(post.id)}
                      >
                        <AiOutlineDelete />
                      </div>
                    </div>
                  </Card>
                )
              })
              .reverse()}
            <AddPost />
            <PostModal action={action} />
          </div>
        </main>
      </div>
    </Context.Provider>
  )
}

export default App
