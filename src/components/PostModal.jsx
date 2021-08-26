import { Modal, Form, Button } from "react-bootstrap";
import React, { useContext, useState } from "react";
import Context from "../Context";
import axios from "axios";

export default function PostModal() {
  const { show, setShow, baseUrl } = useContext(Context);
  const handleClose = () => setShow(false);

  const intialState = {
    title: "",
    message: "",
  };

  const [formState, setFormState] = useState(intialState);

  function onChange(ev) {
    const { name, value } = ev.target;
    setFormState({ ...formState, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    axios.post(`${baseUrl}/posts`, formState).then((res) => {
      setShow(false)

    });
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
          />
        </Form.Group>
        <Button onSubmit={onSubmit} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}
