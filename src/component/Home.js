import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from 'react-bootstrap';
import Example from './Modal';
// import { cardsData } from '../constante/cardsdata';
import axios from "axios";

export function MyCard(props) {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    if (props.searchValue && props.searchValue.length) {
      SearchData();
    } else {
      getData();
    }
  }, [props.searchValue]);

  const getData = async () => {
    try {
      setState({ ...state, isLoading: true });
      let response = await axios.get("http://localhost:3100/products");
      setState({ data: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const SearchData = async () => {
    try {
      setState({ ...state, isLoading: true });
      let response = await axios.post("http://localhost:3100/search", {
        text: props.searchValue,
      });
      setState({ data: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} className="g-4">
      <Card className="h-100">
        <Card.Img variant="top"style={{ height: '200px', objectFit: 'cover' }} src={props.image} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
          <Example />
        </Card.Body>
      </Card>
    </Col>
  );
}

function CardList() {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setState({ ...state, isLoading: true });
      let response = await axios.get("http://localhost:3100/products");
      setState({ data: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
    <Container fluid>
      <Row xs={1} md={3} className="g-7">
      {state.data.map((product, index) => (
            <MyCard key={index} image={product.image} title={product.title} text={product.text} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default CardList;
