import { Modal, Form, Button } from "react-bootstrap";
import React, { useContext, useState } from "react";
import Context from "../Context";
import axios from "axios";

export default function PostModal({ action }) {
  const [formState, setFormState] = useState({ })
  const { show, setShow, baseUrl, currentPost, setCurrentPost } =
    useContext(Context);
  const handleClose = () => {
    setShow(false);
    setCurrentPost({ });
  };

  function onChange(ev) {
    const { name, value } = ev.target;
    setFormState({ ...formState, [name]: value })
    setCurrentPost({ ...currentPost, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    if (action == "new") {
      console.info("new", `${baseUrl}/posts`, currentPost)
      axios.post(`${baseUrl}/posts`, currentPost).then((res) => {
        setShow(false);
        return null;
      });
    } else if (action === "update") {
      axios
        .patch(`${baseUrl}/posts/${currentPost.id}`, currentPost)
        .then((res) => {
          setShow(false);
        });
    }
  }

  return (
    <Modal onSubmit={onSubmit} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fazer novo post</Modal.Title>
      </Modal.Header>
      <Form>
        <Form.Group className="mb-3" id="formTitulo">
          <Form.Label htmlFor="titulo">Título</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            id="titulo"
            placeholder="Título bem bonito"
            onChange={onChange}
            name="title"
            value={currentPost ? currentPost.title : ""}
          />
        </Form.Group>
        <Form.Group className="mb-3" id="formMessage">
          <Form.Label htmlFor="mensagem">Mensagem</Form.Label>
          <Form.Control
            className="form-control"
            id="mensagem"
            as="textarea"
            name="message"
            rows={5}
            onChange={onChange}
            value={currentPost ? currentPost.message : ""}
          />
        </Form.Group>
        <Button onSubmit={onSubmit} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}
