import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { FiArrowLeftCircle, FiSave } from 'react-icons/fi';
import { MdPlaylistPlay } from 'react-icons/md';

import styles from './index.module.scss';

import { NavBar } from '@/components/NavBar';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { FormSelect } from '@/components/FormSelect';
import { Modal } from '@/components/Modal';
import { ItemsTable } from '@/components/Table/pageTable/itemsTable';

import { canSSRAuth } from '@/utils/canSSRAuth';
import { createOrder, getOrderItemsByOrder, saveOrderItem, deleteOrderItem } from '@/services/resources/orderResource';
import { getUserById } from '@/services/resources/userResource';
import { getCustomers } from '@/services/resources/customerResource';
import { getActiveProducts } from '@/services/resources/productResource';

export default function NovoPedido({ user, customers, products }) {
  const [itemsList, setItemsList] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [productValue, setProductValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  }
  
  useEffect(() => {
    products.forEach(p => {
      if (productId == p.id) 
        setProductValue(p.value);
    })
  }, [productId, quantity]);

  const refreshTable = async() => setItemsList(await getOrderItemsByOrder(orderId));
  const calculateTotalItem = () => Number(productValue) * Number(quantity);
  const handleFinishOrder = () => Router.push('/pedidos');
  const handleGoBack = () => Router.back();

  const handleInitOrder = async() => {
    if(customerId === '') {
      toast.warning('Selecione o cliente para inicar o pedido.');
      return;
    }
    const data = { idUser: user.id, idCustomer: Number(customerId) }
    const order = await createOrder(data);
    if (order) 
      setOrderId(order.id);
  }

  const handleSaveItem = async(event) => {
    if (productId === '' || quantity === ''){
      toast.warning('Selecione o produto e preencha a quantidade');
      return;
    }
    const data = { idOrder: orderId, idProduct: Number(productId), quantity: Number(quantity) };
    const item = await saveOrderItem(data);
    if(item) {
      await refreshTable();
      setProductId('');
      setProductValue('');
      setQuantity('');
    }
  }

  const handleDeleteItem = async() => {
    await deleteOrderItem(selectedItem.id);
    await refreshTable();
    handleCloseModal();
  }

  const customersOptions = () => {
    return customers.map(c => ( <option key={c.id} value={c.id}>{c.name}</option> ))
  }

  const productsOptions = () => {
    return products.map(p => ( <option key={p.id} value={p.id}>{p.name}</option> ));
  }

  return (
    <>
    <Head><title>RefrigerApp - Pedido</title></Head>
    <NavBar />
    <div className="container">
      <div className={styles.containerNewOrder}>
        <Card title="Pedido">
          <div className={styles.divHeaderButtons}>
            <Button className={styles.headerButtons} variant="outline-primary"
              disabled={!!orderId} onClick={handleInitOrder}>
              <MdPlaylistPlay size={20} style={{margin: "-2px 5px 0 0"}}/> Iniciar Pedido
            </Button>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Input label='Pedido' htmlFor='id' type='text' disabled={true} 
              value={orderId} onChange={e => setOrderId(e.target.value)} />
            </div>
            <div className="col-md-10">
              <FormSelect label="Cliente" value={customerId} disabled={!!orderId}
              onChange={e => setCustomerId(e.target.value)} >
                <option value={''}>Selecione</option>
                { customersOptions() }
              </FormSelect>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <FormSelect label="Produto" value={productId} disabled={!orderId}
                onChange={e => setProductId(e.target.value)} >
                <option value={''}>Selecione</option>
                { productsOptions() }
              </FormSelect>
            </div>
            <div className="col-md-2">
              <Input label='Valor Unitário' htmlFor='value' type='text' disabled={true} 
                value={productValue} />
            </div>
            <div className="col-md-2">
              <Input label='Quantidade' htmlFor='qtde' type='text' disabled={!orderId}
                value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>
            <div className="col-md-3">
              <Input label='Total Item' htmlFor='total' type='text' disabled={true} 
                value={calculateTotalItem()} />
            </div>
          </div>
          <div className={styles.formButtons}>
            <button className="btn btn-secondary" onClick={handleGoBack} disabled={!!orderId}>
              <FiArrowLeftCircle size={20} style={{ marginTop: '-5px' }} /> Voltar
            </button>
            <button className="btn btn-primary" type="button" onClick={ handleSaveItem }
              style={{ marginLeft: '5%' }} disabled={!orderId}>
              <FiSave size={19} style={{ marginTop: '-5px' }} /> Salvar Item
            </button>
            <button className="btn btn-success" type="button" disabled={!orderId}
              onClick={ handleFinishOrder } style={{ marginLeft: '5%' }}>
              <FiSave size={19} style={{marginTop: '-3px'}} /> Finalizar Pedido
            </button>
          </div>
          <ItemsTable  data={itemsList} user={user} onClickDelete={handleShowModal} />
          <Modal title="Excluir item" showDialog={showModal}
            closeDialog={handleCloseModal} showChildren={true} onConfirm={handleDeleteItem} 
            confirmButtonText="Sim" closeButtonText='Não'>
              <p><strong>Confirma a exclusão do item?</strong></p>
            </Modal>
        </Card>
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { '@auth.userId': id } = parseCookies(ctx);
  const user = await getUserById(id);
  const customers = await getCustomers();
  const products = await getActiveProducts();
  return { props: { user, customers, products } }
});
