import React, { Component } from 'react';
import { Card, Container, Row, Col,Button } from 'react-bootstrap';
import Example from './Modal';
import { cardsData } from '../constante/cardsdata';
class MyCard extends Component {
  constructor(props){
  super()
  }
  render(){
  return (
    <Col>
      <Card style={{ width: '18rem' }}>
        
        <Card.Img variant="top" src={this.props.image} />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.text}</Card.Text>
          {/* <Button variant="primary" onClick={props.onClick}>Button</Button> */}
          <Example />
        </Card.Body>
      </Card>
    </Col>
  );}
}

class CardList extends Component {
  constructor(props){
  super()

  }
  render(){
  return (
    <div>
    <Container fluid>
      <Row xs={1} sm={2} md={4}>
        {cardsData.map((card, index) => (
          <MyCard key={index} image={card.image} title={card.title} text={card.text} />
       ))}
      </Row>
    </Container></div>
  );
}
}
export default CardList;
