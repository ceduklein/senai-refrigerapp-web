import { Form } from "react-bootstrap";
import { Checkbox } from "primereact/checkbox";

export function CheckBox(props) {
  const { htmlFor, label, text, admin } = props;

  return(
    <Form.Group className='mb-3' controlId={ htmlFor } >
      <Form.Label>{ label }</Form.Label>
      <div className="flex align-items-center" style={{marginTop: '5px'}}>
        <Checkbox inputId={htmlFor} value={admin} checked={true} disabled />
        <label htmlFor="htmlFor" className="ml-2" style={{marginLeft: '10px'}}>{text}</label>
      </div>
    </Form.Group>
  )
}