import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MyCard from './Home';
import im from './src/assests/bootcamp.67d60f1581f3d4b745a0 (1).jpg';
class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;

    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          voir plus
        </Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>voir plus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Modal.img src={im} alt="Téléchargement" />
            <p>This course is your gateway to IT. Explore the foundational concepts and gain a strong understanding of information technology. Perfect for beginners looking to build a solid IT knowledge base.</p></Modal.Body>
            
        <Modal.Footer>
        
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Example;
