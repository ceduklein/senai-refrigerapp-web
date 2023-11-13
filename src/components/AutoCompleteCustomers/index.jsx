import { useState } from "react";
import { Form } from "react-bootstrap";
import { AutoComplete } from "primereact/autocomplete";

export default function AutoCompleteCustomers(props) {
  const { list, htmlFor, label } = props;

  const [customers, setCustomers] = useState(list);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filteredCustomers, setFilteredCustomers] = useState(null);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
        let _filteredCustomers;

        if (!event.query.trim().length) {
            _filteredCustomers = [...customers];
        }

        else {
            _filteredCustomers = customers.filter((customer) => {
                return customer.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        setFilteredCustomers(_filteredCustomers);
    }, 250);
  }

  return (
    <Form.Group className='mb-3' controlId={htmlFor} >
        <Form.Label>{ label }</Form.Label>
        <AutoComplete field="name" value={selectedCustomer} suggestions={filteredCustomers}
            completeMethod={search} onChange={(e) => setSelectedCustomer(e.value)} />
    </Form.Group>
  )
}