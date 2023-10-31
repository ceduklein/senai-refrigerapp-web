import { Column } from "primereact/column";
import { BiSolidUserDetail } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from 'react-icons/md';
import { GoShieldCheck, GoShieldX } from 'react-icons/go';

import styles from './userTable.module.scss';

import { Table } from "@/components/Table";

export function UserTable(props) {
  const { onClickShow, onClickChange, onClickDelete, data } = props;

  const formatCpf = (rowData) => {
    return rowData.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
  }

  const actionButtons = (rowData) => {
    return (
      <div className={styles.actionButtons} >
        <button type='button' className="btn btn-primary"
          title="detalhes" onClick={e => onClickShow(rowData)} >
          <BiSolidUserDetail size={21}/>
        </button>
        <button type='button' className="btn btn-success" onClick={e => onClickChange(rowData)}
          title={rowData.admin ? 'Remover Permissão' : 'Conceder Permissão'}
          disabled={ rowData.id == 1 ? true : false }>
          { rowData.admin ? (<GoShieldX size={21} />) : (<GoShieldCheck size={21}/>) }
        </button>
        <button type='button' className="btn btn-danger" title="excluir"
          disabled={ rowData.id == 1 ? true : false } onClick={e => onClickDelete(rowData)} >
          <FiTrash2 size={21}/>
        </button>
      </div>
    )
  }

  const credentialIcons = (rowData) => {
    return(
      <div className={styles.icons}>
        { rowData.admin ? (
        <MdAdminPanelSettings size={26} color='#28986D' title="Usuário Administrador" />
      ) : (
        <FaUser size={20} color="#2C6FD8" title="Usuário Padrão" />
      )}
      </div>   
    )
  }

  return (
    <Table data={ data } globalFilterFields={ ['id', 'name', 'cpf'] } >
      <Column field="id" header="Id" sortable />
      <Column field="name" header="Nome" sortable />
      <Column body={formatCpf} field="cpf" header="CPF" />
      <Column body={ credentialIcons } field="admin" header="Permissões" />
      <Column body={ actionButtons } field='acao' header="Ações" />
    </Table>
  )
}