import React, { useState } from 'react';
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Rooms({ rooms, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='row bs'>
        <div className="col-md-4">
          <img src={rooms.imageurls[0]} className='smallimg' />
        </div>
        <div className="col-md-7">
          <h1>{rooms.name}</h1>
          <b>
            <p>Max Count: {rooms.maxcount}</p>
            <p>Phone number: {rooms.phonenumber}</p>
            <p>type: {rooms.type}</p>
          </b>

          <div style={{ float: "right" }}>
            {(fromdate && todate)&& (
            <Link to={`/book/${rooms._id}/${fromdate}/${todate}`}>
              <button className='btn m-2'>Book now</button>
            </Link>
)}
            <button className='btn' onClick={handleShow}>View Details</button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{rooms.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {rooms.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{rooms.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Rooms;
