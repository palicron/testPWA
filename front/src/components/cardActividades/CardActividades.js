import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./CardActividades.css";
import Trash from "../../assets/images/trash.png";
import { Link } from "react-router-dom";

export default function CardActividades({
  id,
  nombre,
  fecha,
  link,
  del,
  funDel,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="col-md-4 col-sm-6 col-lg-3 py-3">
      <div className="card card-actividades">
        <div className="card-body card-body-actividades">
          <div className="card-title">{nombre}</div>
          <p className="card-text text-muted">{fecha}</p>
          <Link to={link} className="btn btn-primary btn-primary-actividades">
            Ver actividad {del.eliminar}
          </Link>
          {del[0] ? null : (
            <button
              className="btn btn-light bg-white rounded-pill shadow-sm btn-edit-actividades"
              onClick={handleShow}
            >
              <img src={Trash} alt="eliminar" width="30px"></img>
            </button>
          )}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Eliminar actividad </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Está seguro de eliminar la actividad {nombre}?
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  funDel(id);
                  handleClose();
                }}
              >
                Eliminar actividad
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
