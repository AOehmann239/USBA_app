import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';

const DepositForm = (props) => {
  const { deposit, handleChange, handleSubmit, heading } = props;

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          placeholder="amount"
          value={deposit.amount}
          type="number"
          name="amount"
          onChange={handleChange}
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="description"
          value={deposit.description}
          name="description"
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default DepositForm;