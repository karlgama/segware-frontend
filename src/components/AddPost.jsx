import Button from "react-bootstrap/Button";
import React, { useContext } from "react";
import Context from "../Context";

export default function AddPost() {
  const { setShow } = useContext(Context);
  const handleShow = () => setShow(true);
  return (
    <Button onClick={() => handleShow()} variant="primary">      
      Adicionar novo Post
    </Button>
  );
}
