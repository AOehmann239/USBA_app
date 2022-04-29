import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';

const ExpenseForm = (props) => {
  const { expense, handleChange, handleSubmit, heading } = props;

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          placeholder="amount?"
          value={expense.amount}
          type="number"
          name="amount"
          onChange={handleChange}
        />
        <Form.Label>Vendor</Form.Label>
        <Form.Control
          placeholder="vendor?"
          value={expense.vendor}
          name="vendor"
          onChange={handleChange}
        />
        <Form.Label>Category</Form.Label>
        <Form.Control
          placeholder="category?"
          value={expense.category}
          name="category"
          onChange={handleChange}
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="description?"
          value={expense.description}
          name="description"
          onChange={handleChange}
        />
        <Form.Label>Date</Form.Label>
        <Form.Control
          placeholder="date?"
          value={expense.date}
          type="date"
          name="date"
          onChange={handleChange}
        />
       
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default ExpenseForm;