import { Column } from "primereact/column";
import { FcViewDetails } from 'react-icons/fc';
import { FiTrash2 } from 'react-icons/fi';
import { IoImageOutline } from 'react-icons/io5';
import { BiBlock, BiCheck } from 'react-icons/bi';

import styles from './pageTable.module.scss';

import { Table } from "@/components/Table";

export function ProductTable(props) {
  const { data, user, onClickEdit, onClickShow, onClickChange, onClickDelete } = props;

  const formatCurrency = (rowData) => {
    return rowData.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
  }

  const formatStatus = (rowData) => { return rowData.active ? `Ativo` : `Inativo` }

  const actionButtons = (rowData) => {
    return (
      <div className={styles.actionButtons} >
        <button type='button' className="btn btn-light"
          title="detalhes" onClick={e => onClickEdit(rowData)} >
          <FcViewDetails size={24}/>
        </button>
        <button type='button' className="btn btn-success"
          title="imagem" onClick={e => onClickShow(e, rowData)} >
          <IoImageOutline size={21}/>
        </button>
        { user.admin ? (
          <>
          <button type='button' className="btn btn-warning" 
            title={ rowData.active ? `Inativar` : `Ativar`}
            onClick={e => onClickChange(rowData)} >
            { rowData.active ? ( <BiBlock size={21} /> ) : (<BiCheck size={22} />) }
          </button>
          <button type='button' className="btn btn-danger" 
            title="excluir" onClick={e => onClickDelete(rowData)} >
            <FiTrash2 size={21}/>
          </button>
          </>
        ) : ( <></> ) }
      </div>
    )
  }

  return (
    <Table data={ data } globalFilterFields={ ['id', 'name', 'model', 'brand', 'category', 'active'] } >
      <Column field="id" header="Id" sortable />
      <Column field="name" header="Nome" sortable />
      <Column field="model" header="Modelo" />
      <Column field="brand" header="Marca" sortable />
      <Column field="category" header="Categoria" sortable />
      <Column field="value" body={ formatCurrency } header="Preço" sortable />
      <Column field="active" body={ formatStatus } header="Situação" sortable />
      <Column body={ actionButtons } field='acao' header="Ações" />
    </Table>
  )
}