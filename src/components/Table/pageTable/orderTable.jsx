import { Column } from "primereact/column";
import { FcViewDetails } from 'react-icons/fc';
import { FiTrash2 } from 'react-icons/fi';

import styles from './pageTable.module.scss';

import { Table } from "@/components/Table";
import { formatDate } from "@/utils/formatDate";

export function OrderTable(props) {
  const { data, user, onClickEdit, onClickShow, onClickChange, onClickDelete } = props;

  const formatTableDate = (rowData) => {
    return formatDate(rowData.created_at);
  }

  const formatCurrency = (rowData) => {
    return rowData.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  const actionButtons = (rowData) => {
    return (
      <div className={styles.actionButtons} >
        <button type='button' className="btn btn-light"
          title="detalhes" onClick={e => onClickEdit(rowData)} >
          <FcViewDetails size={24}/>
        </button>
        { user.admin ? (
          <button type='button' className="btn btn-danger" 
            title="excluir" onClick={e => onClickDelete(rowData)} >
            <FiTrash2 size={21}/>
          </button>
        ) : ( <></> ) }
      </div>
    )
  }

  return (
    <Table data={ data } globalFilterFields={ ['id', 'customer.name', 'created_at', 'user.name', 'total'] } >
      <Column field="id" header="Id" sortable />
      <Column field="created_at" body={formatTableDate} header="Data" sortable />
      <Column field="customer.name" header="Cliente" sortable />
      <Column field="total" body={formatCurrency} header="Total" sortable />
      <Column field="user.name" header="Vendedor" sortable />
      <Column body={ actionButtons } field='acao' header="Ações" />
    </Table>
  )
}