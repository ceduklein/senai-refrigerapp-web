import { useState } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';

import styles from './index.module.scss';

import { Card } from "@/components/Card";
import { NavBar } from "@/components/NavBar";
import { CustomerTable } from './components/customerTable';
import { Modal } from '@/components/Modal';
import { CustomerDialog } from './components/customerDialog';

import { canSSRAuth } from '@/utils/canSSRAuth';
import setupApiClient from '@/services/api';
import { deleteCustomer, refreshCustomersList } from './service';

export default function Clientes({ customers }) {
  const [customersList, setCustomersList] = useState(customers)
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [showDelModal, setShowDelModal] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showCreateCustomerDialog, setShowCreateCustomerDialog] = useState(false);

  const refreshTable = async() => setCustomersList(await refreshCustomersList());

  const handleCloseDelModal = () => setShowDelModal(false);
  const handleCloseCustomerDialog = () => setShowCustomerDialog(false);
  const handleCloseCreateCustomerDialog = () => setShowCreateCustomerDialog(false);
  const handleShowCreateCustomerDialog = () => setShowCreateCustomerDialog(true);

  const handleShowDelModal = (customer) => { 
    setSelectedCustomer(customer); 
    setShowDelModal(true); 
  }
  const handleShowCustomerDialog = (customer) => { 
    setSelectedCustomer(customer); 
    setShowCustomerDialog(true); 
  };
  
  const handleClickOnConfirm = () => {
    handleCloseCustomerDialog();
    handleCloseCreateCustomerDialog();
    refreshTable();
  }

  const elementsModal = () => {
    return(
      <p>Deseja excluir o cadastro do cliente abaixo?<br/><br/>
        <strong>Id: { selectedCustomer.id } <br />Nome: { selectedCustomer.name }</strong>
      </p>
    )
  }

  const handleDelete = async() => {
    await deleteCustomer(selectedCustomer.id);
    refreshTable();
    setShowDelModal(false);
  }

  return(
    <>
      <Head><title>RefrigerApp - Clientes</title></Head>
      <NavBar />
      <div className="container">
        <div className={styles.containerCustomer}>
          <Card title="Clientes">
            <div className={styles.divHeaderButtons}>
              <Button className={styles.headerButtons} variant="outline-primary" 
                onClick={handleShowCreateCustomerDialog}
              >
                <FaUserPlus size={20} style={{margin: "-2px 5px 0 0"}}/> Cadastrar
              </Button>
            </div>

            <CustomerTable data={customersList} onClickDelete={handleShowDelModal}
              onClickEdit={handleShowCustomerDialog} />
          </Card>

          <Modal title="Excluir Cadastro" closeDialog={handleCloseDelModal}
            showDialog={showDelModal} showChildren={true} onConfirm={handleDelete}
            confirmButtonText="Sim" closeButtonText='Não'>
              { elementsModal() }
          </Modal>
          <CustomerDialog closeDialog={handleCloseCustomerDialog} user={selectedCustomer}
            showDialog={showCustomerDialog} onConfirm={handleClickOnConfirm} />

          <CustomerDialog closeDialog={handleCloseCreateCustomerDialog}
            showDialog={showCreateCustomerDialog} onConfirm={handleClickOnConfirm} />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);
  const response = await api.get(`/customers`);
  return { props: { customers: response.data } }
});
