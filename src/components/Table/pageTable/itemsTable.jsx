import { Column } from "primereact/column";
import { FiTrash2 } from 'react-icons/fi';

import styles from './pageTable.module.scss';

import { DataTable } from "primereact/datatable";

export function ItemsTable(props) {
  const { data, onClickDelete } = props;

  const formatTotal = (rowData) => {
    return rowData.totalItem.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
  }

  const formatValue = (rowData) => {
    return rowData.product.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
  }

  const actionButtons = (rowData) => {
    return (
      <div className={styles.actionButtons} >
        <button type='button' className="btn btn-danger" 
          title="excluir" onClick={e => onClickDelete(rowData)} >
          <FiTrash2 size={21}/>
        </button>
      </div>
    )
  }

  return (
    <DataTable value={ data }>
      <Column field="product.name" header="Produto" />
      <Column field="product.value" body={ formatValue } header="Valor unitário" sortable />
      <Column field="quantity" header="Quantidade" sortable />
      <Column field="totalItem" body={ formatTotal } header="Total Item" sortable />
      <Column body={ actionButtons } field='acao' header="Ações" />
    </DataTable>
  )
}