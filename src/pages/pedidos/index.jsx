import { useState } from 'react';
import { parseCookies } from 'nookies';
import Router from 'next/router';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { BiListPlus } from 'react-icons/bi';

import styles from './index.module.scss';

import { NavBar } from '@/components/NavBar';
import { Card } from '@/components/Card';
import { OrderTable } from '@/components/Table/pageTable/orderTable';
import { Modal } from '@/components/Modal';
import { OrderDialog } from '@/components/Dialog/orderDialog';

import { canSSRAuth } from '@/utils/canSSRAuth';
import { formatDate } from '@/utils/formatDate';
import { deleteOrder, getOrderItemsByOrder, getOrders } from '@/services/resources/orderResource';
import { getUserById } from '@/services/resources/userResource';

export default function Produtos({user, orders}) {
  const [orderList, setOrderList] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDelModal = () => setShowDelModal(false);
  const handleShowDelModal = (order) => {
    setSelectedOrder(order);
    setShowDelModal(true);
  }

  const handleCloseDialog = () => setShowDialog(false);
  const handleShowDialog = async (order) => {
    setOrderItems(await getOrderItemsByOrder(order.id));
    setSelectedOrder(order);
    setShowDialog(true);
  }

  const refreshTable = async() => setOrderList(await getOrders());

  const handleDelete = async() => {
    await deleteOrder(selectedOrder.id);
    await refreshTable();
    handleCloseDelModal();
  }

  const onClickNew = () => Router.push('/novo-pedido');

  const elementsModal = () => {
    return(
      <p>Deseja excluir o pedido abaixo?<br/><br/>
        <strong>
          Pedido: { selectedOrder.id } <br /> Data: { formatDate(selectedOrder.created_at) }     
        </strong>
      </p>
    )    
  }

  return (
    <>
      <Head><title>RefrigerApp - Pedidos</title></Head>
      <NavBar />
      <div className="container">
        <div className={styles.containerOrders}>
          <Card title="Pedidos">
            <div className={styles.divHeaderButtons}>
              <Button className={styles.headerButtons} variant="outline-primary" onClick={onClickNew}>
                <BiListPlus size={27} style={{margin: "-2px 5px 0 0"}} /> Novo Pedido
              </Button>
            </div>
            <OrderTable data={orderList} user={user} onClickDelete={handleShowDelModal}
              onClickEdit={handleShowDialog} />
            <Modal title="Excluir Pedido" showDialog={showDelModal}
            closeDialog={handleCloseDelModal} showChildren={true} onConfirm={handleDelete} 
            confirmButtonText="Sim" closeButtonText='Não'>
              { elementsModal() }
            </Modal>
            <OrderDialog showDialog={showDialog} closeDialog={handleCloseDialog} 
              data={orderItems} order={selectedOrder} user={user} />
          </Card>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { '@auth.userId': id } = parseCookies(ctx);
  const user = await getUserById(id);
  const orders = await getOrders();
  return { props: { user, orders } }
});
