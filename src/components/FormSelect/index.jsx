import { useState } from "react";
import { Form } from "react-bootstrap";

export function FormSelect(props) {
  const { label, disabled, value, onChange, children } = props;

  return (
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Select aria-label="Selecione a categoria" disabled={disabled}
        value={ value } onChange={ onChange }
      >
        {children}
      </Form.Select>
    </Form.Group>
  )
}