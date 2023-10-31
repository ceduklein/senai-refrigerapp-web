import Form from 'react-bootstrap/Form'

export function Input(props) {
  const { htmlFor, label, type, placeholder, value, onChange, disabled } = props

  return (
    <Form.Group className='mb-3' controlId={ htmlFor} >
      <Form.Label>{ label }</Form.Label>
      <Form.Control type={ type } placeholder={ placeholder } disabled={ disabled }
        value={ value } onChange={ onChange } />
    </Form.Group>
  )
}