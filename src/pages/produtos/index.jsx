import { useState, useRef } from 'react';
import Head from "next/head";
import { parseCookies } from 'nookies';
import { Button } from 'react-bootstrap';
import { BsClipboard2PlusFill } from 'react-icons/bs'

import styles from './index.module.scss';

import { NavBar } from '@/components/NavBar';
import { Card } from '@/components/Card';
import { ProductTable } from '@/components/Table/pageTable/productTable';
import { ProductDialog } from '@/components/Dialog/productDialog';
import { Overlay } from '@/components/Overlay';
import { Modal } from '@/components/Modal';

import { canSSRAuth } from '@/utils/canSSRAuth';
import { changeStatus, deleteProduct, getProducts } from '@/services/resources/productResource';
import { getUserById } from '@/services/resources/userResource';

export default function Produtos({ user, products }) {
  const [productsList, setProductsList] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showCreateProductDialog, setShowCreateProductDialog] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const op = useRef(null);

  const handleCloseCreateProductDialog = () => setShowCreateProductDialog(false);
  const handleShowCreateProductDialog = () => setShowCreateProductDialog(true);

  const handleCloseProductDialog = () => setShowProductDialog(false);
  const handleShowProductDialog = (product) => {
    setSelectedProduct(product);
    setShowProductDialog(true);
  }

  const handleCloseDelModal = () => setShowDelModal(false);
  const handleShowDelModal = (product) => {
    setSelectedProduct(product);
    setShowDelModal(true);
  }

  const handleCloseChangeModal = () => setShowChangeModal(false);
  const handleShowChangeModal = (product) => {
    setSelectedProduct(product);
    setShowChangeModal(true);
  }

  const handleClickShow = (e, product) => {
    setSelectedProduct(product);
    op.current.toggle(e);
  }

  const refreshTable = async() => setProductsList(await getProducts());

  const handleClickOnConfirm = () => {
    handleCloseCreateProductDialog();
    handleCloseProductDialog();
    refreshTable();
  }

  const handleChangeStatus = async() => {
    await changeStatus(selectedProduct.id, user.id);
    refreshTable();
    handleCloseChangeModal();
  }

  const handleDelete = async() => {
    await deleteProduct(selectedProduct.id);
    refreshTable();
    handleCloseDelModal();
  }

  const elementsDelModal = () => {
    return(
      <p>Deseja excluir o cadastro do produto abaixo?<br/><br/>
        <strong>
          Id: { selectedProduct.id }<br />Descrição: { selectedProduct.name }<br />
          Modelo: { selectedProduct.model }<br />Marca: { selectedProduct.brand }<br />
        </strong>
      </p>
    )
  }

  const elementsModal = () => {
    return(
      <p>Deseja {selectedProduct.active ? `inativar`: `ativar`} o produto abaixo?<br/><br/>
        <strong>
          Id: { selectedProduct.id }<br />Descrição: { selectedProduct.name }<br />
          Modelo: { selectedProduct.model }<br />Marca: { selectedProduct.brand }<br />
        </strong>
      </p>
    )
  }

  return (
    <>
      <Head><title>RefrigerApp - Clientes</title></Head>
      <NavBar />
      <div className="container">
        <div className={styles.containerProduct}>
          <Card title="Produtos">
            {user.admin ? (
              <div className={styles.divHeaderButtons}>
                <Button className={styles.headerButtons} variant="outline-primary" 
                  onClick={handleShowCreateProductDialog}
                >
                  <BsClipboard2PlusFill size={20} style={{margin: "-2px 5px 0 0"}}/> Cadastrar
                </Button>
              </div>
            ) : ( <></> ) }
            <ProductTable data={productsList} onClickEdit={handleShowProductDialog}
              onClickShow={handleClickShow} onClickDelete={handleShowDelModal}
              onClickChange={handleShowChangeModal} user={user} />
            <ProductDialog showDialog={showCreateProductDialog} user={user}
              closeDialog={handleCloseCreateProductDialog} onConfirm={handleClickOnConfirm} />
            <ProductDialog showDialog={showProductDialog} product={selectedProduct} 
              closeDialog={handleCloseProductDialog} onConfirm={handleClickOnConfirm} user={user} />
            <Modal title="Excluir Produto" closeDialog={handleCloseDelModal}
              showDialog={showDelModal} showChildren={true} onConfirm={handleDelete}
              confirmButtonText="Sim" closeButtonText='Não'>
              { elementsDelModal() }
            </Modal>
            <Modal title="Alterar Status do Produto" closeDialog={handleCloseChangeModal}
              showDialog={showChangeModal} showChildren={true} onConfirm={handleChangeStatus}
              confirmButtonText="Sim" closeButtonText='Não'>
              { elementsModal() }
            </Modal>
            <Overlay image={selectedProduct.image} op={op} />
          </Card>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { '@auth.userId': id } = parseCookies(ctx);
  const user = await getUserById(id);
  const products = await getProducts();
  return { props: { user, products } }
});
