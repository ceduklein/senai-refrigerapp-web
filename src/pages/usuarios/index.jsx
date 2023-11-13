import { useState } from 'react';
import { parseCookies } from 'nookies';
import Head from "next/head";
import { Button } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';

import styles from './index.module.scss';

import { NavBar } from '@/components/NavBar';
import { Card } from '@/components/Card';
import { UserTable } from '@/components/Table/pageTable/userTable';
import { Modal } from '@/components/Modal';
import { UserDialog } from '@/components/Dialog/userDialog';

import { canSSRAuth } from '@/utils/canSSRAuth';
import { deleteUser, getUsers, setCredential } from '@/services/resources/userResource';

export default function Usuarios({ users, admin_id }) {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState({});
  const [showDelModal, setShowDelModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const refreshTable = async() => setUsersList(await getUsers(admin_id));

  const handleCloseDelModal = () => setShowDelModal(false);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseCreateDialog = () => setShowCreateDialog(false);
  const handleCloseDialog = () => setShowDialog(false);
  const handleShowCreateDialog = () => setShowCreateDialog(true);
  
  const handleShowDialog = (user) => {
    setSelectedUser(user);
    setShowDialog(true);
  }

  const handleShowDelModal = (user) => { 
    setSelectedUser(user); 
    setShowDelModal(true);
  }

  const handleShowModal = (user) => { 
    setSelectedUser(user); 
    setShowModal(true);
  }

  const handleClickOnConfirm = () => {
    handleCloseCreateDialog();
    refreshTable();
  }

  const handleChangeCredential = async() => {
    await setCredential(selectedUser.id, admin_id);
    setShowModal(false);
    refreshTable();
  }

  const handleDelete = async() => {
    await deleteUser(selectedUser.id);
    setShowDelModal(false);
    await refreshTable();
  }

  const elementsDelModal = () => {
    return(
      <p>Deseja excluir o cadastro do usuário abaixo?<br/><br/>
        <strong>Id: { selectedUser.id } <br />Nome: { selectedUser.name }</strong>
      </p>
    )
  }

  const elementsModal = () => {
    return(
      <p>{ !selectedUser.admin ? `Conceder permissões de administrador para o usuário abaixo?` : 
      `Remover permissões de admnistrador para o usuário abaixo?` }<br/><br/>
        <strong>Id: { selectedUser.id } <br />Nome: { selectedUser.name }</strong></p>
    )
  }

  return(
    <>
      <Head><title>RefrigerApp - Usuários</title></Head>
      <NavBar />
      <div className="container">
        <div className={styles.containerUser}>
          <Card title="Usuários">
            <div className={styles.divHeaderButtons}>
              <Button className={styles.headerButtons} variant="outline-primary" 
                onClick={handleShowCreateDialog}
              >
                <FaUserPlus size={20} style={{margin: "-2px 5px 0 0"}}/> Cadastrar
              </Button>
            </div>
            <UserTable data={usersList} onClickDelete={handleShowDelModal}
              onClickChange={handleShowModal} onClickShow={handleShowDialog} />
          </Card>
          <Modal title="Exlcuir Cadastro" showDialog={showDelModal}
            closeDialog={handleCloseDelModal} showChildren={true} onConfirm={handleDelete} 
            confirmButtonText="Sim" closeButtonText='Não'>
              { elementsDelModal() }
          </Modal>
          <Modal title="Alterar Permissão" showDialog={showModal}
            closeDialog={handleCloseModal} showChildren={true} onConfirm={handleChangeCredential} 
            confirmButtonText="Sim" closeButtonText='Não'>
              { elementsModal() }
          </Modal>
          <UserDialog closeDialog={handleCloseCreateDialog} 
            showDialog={showCreateDialog} onConfirm={handleClickOnConfirm} />
          <UserDialog closeDialog={handleCloseDialog} user={selectedUser}
            showDialog={showDialog} />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { '@auth.userId': id } = parseCookies(ctx);
  const users = await getUsers(id);
  return { props: { users, admin_id: id } }
});
