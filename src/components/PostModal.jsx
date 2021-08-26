import { Modal, Form, Button } from "react-bootstrap";
import React, { useContext } from "react";
import Context from "../Context";

function newPost() {}

export default function PostModal() {
  const { show, setShow } = useContext(Context);
  const handleClose = () => setShow(false);
  let intialState = {
      title: "",
      message: ""
  }

  const [state, setState] = (intialState)

  return (
    //className="invisible"

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fazer novo post</Modal.Title>
      </Modal.Header>
      <Form>
        <Form.Group className="mb-3" controlId="formTitulo">
          <Form.Label htmlFor="titulo">Título</Form.Label>
          <Form.Control
            type="text"
            id="titulo"
            placeholder="Título bem bonito"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label htmlFor="mensagem">Mensagem</Form.Label>
          <Form.Control
            className="form-control"
            id="mensagem"
            as="textarea"
            rows={5}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}
