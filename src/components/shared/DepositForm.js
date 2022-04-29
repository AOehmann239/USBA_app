import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';

const DepositForm = (props) => {
  const { deposit, handleChange, handleSubmit, heading } = props;

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="name?"
          value={deposit.name}
          name="name"
          onChange={handleChange}
        />
        <Form.Label>Image</Form.Label>
        <Form.Control
          placeholder="img url?"
          value={deposit.image}
          name="image"
          onChange={handleChange}
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="description?"
          value={deposit.description}
          name="description"
          onChange={handleChange}
        />
        <Form.Label>Price</Form.Label>
        <Form.Control
          placeholder="price?"
          value={deposit.price}
          type="number"
          name="price"
          onChange={handleChange}
        />
        <Form.Label>Category</Form.Label>
        <Form.Control
          placeholder="category?"
          value={product.category}
          name="category"
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default DepositForm;