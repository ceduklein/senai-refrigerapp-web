import { Column } from "primereact/column";
import { BiSolidUserDetail } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';

import styles from './customerTable.module.scss';

import { Table } from "@/components/Table";

export function CustomerTable(props) {

  const formatPhone = (rowData) => {
    return rowData.phone
      .replace(/\D/g,'')
      .replace(/(\d{2})(\d)/,"($1) $2")
      .replace(/(\d)(\d{4})$/,"$1-$2")
  }

  const actionButtons = (rowData) => {
    return (
      <div className={styles.actionButtons} >
        <button type='button' className="btn btn-primary"
          title="detalhes" onClick={e => props.onClickEdit(rowData)} >
          <BiSolidUserDetail size={21}/>
        </button>

        <button type='button' className="btn btn-danger"
          title="excluir" onClick={e => props.onClickDelete(rowData)} >
          <FiTrash2 size={21}/>
        </button>
      </div>
    )
  }

  return (
    <Table data={ props.data } globalFilterFields={ ['id', 'name', 'email', 'phone'] } >
      <Column field="id" header="Id" sortable />
      <Column field="name" header="Nome" sortable />
      <Column field="email" header="Email" />
      <Column field="phone" body={ formatPhone } header="Telefone" />
      <Column body={ actionButtons } field='acao' header="Ações" />
    </Table>
  )
}