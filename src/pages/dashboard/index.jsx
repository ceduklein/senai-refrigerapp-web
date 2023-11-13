import { useState, useEffect } from "react";
import Head from "next/head";
import { parseCookies } from "nookies";
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from "react-bootstrap";
import { TbFilterCheck } from 'react-icons/tb';

import styles from './index.module.scss';

import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/Card";
import { FormSelect } from "@/components/FormSelect";
import { OrderProductTable } from "@/components/Table/pageTable/orderProductsTable";
import { OrderUserTable } from "@/components/Table/pageTable/orderUserTable";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { getOrderItems, getOrderItemsByProduct, getOrders, getOrdersByUser } from "@/services/resources/orderResource";
import { getUserById, getUsers } from "@/services/resources/userResource";
import { getProducts } from "@/services/resources/productResource";

export default function Dashboard({ user, products, items, orders }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [productId, setProductId] = useState('');
  const [userId, setUserId] = useState('');
  const [itemsList, setItemsList] = useState(items);
  const [orderList, setOrderList] = useState(orders);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fecthData() {
      if(user.admin) {
        const users = await getUsers(user.id);
        setUserList(users);
      } else {
        const userOrders = await getOrdersByUser(user.id);
        setOrderList(userOrders);
      }  
    }
    fecthData();
  }, [user])

  const handleFilterProduct = async() => {
    const items = await getOrderItemsByProduct(productId);
    setItemsList(items);
  }

  const handleFilterUser = async() => {
    if (userId) {
      const ordersByUser = await getOrdersByUser(userId);
      setOrderList(ordersByUser);
    } else {
      setOrderList(orders);
    }
  }

  const productsOptions = () => {
    return products.map(p => ( <option key={p.id} value={p.id}>{p.name}</option> ));
  }

  const usersOptions = () => {
    return userList.map(u => ( <option key={u.id} value={u.id}>{u.name}</option> ));
  }

  return(
    <>
      <Head>
        <title>RefrigerApp - Dashboard</title>
      </Head>
      <NavBar />

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerDashboard}>
          <Card title={`Olá, ${user.name}`}>
            { user.admin ? (
              <TabView activeIndex={activeIndex} onTabChange={ e => setActiveIndex(e.index) }>
              <TabPanel header="Vendas por produto">
                <div className="row">
                  <div className="col-md-8">
                      <FormSelect label="Produto" value={productId} onChange={e => setProductId(e.target.value)} >
                        <option value={''}>Selecione</option>
                        { productsOptions() }
                      </FormSelect>
                  </div>
                  <div className="col-md-4">
                    <Button className={styles.headerButtons} variant="primary" 
                    disabled={!productId} onClick={handleFilterProduct}>
                      <TbFilterCheck style={{marginTop: '-3px'}} size={21} /> Filtrar
                    </Button>
                  </div>
                </div>
                <OrderProductTable data={itemsList} />
              </TabPanel>

              <TabPanel header="Vendas por usuário">
                <div className="row">
                  <div className="col-md-8">
                      <FormSelect label="Usuário" value={userId} onChange={e => setUserId(e.target.value)} >
                        <option value={''}>Todos</option>
                        { usersOptions() }
                      </FormSelect>
                  </div>
                  <div className="col-md-4">
                    <Button className={styles.headerButtons} variant="primary" onClick={handleFilterUser}>
                      <TbFilterCheck style={{marginTop: '-3px'}} size={21} /> Filtrar
                    </Button>
                  </div>
                </div>
                <OrderUserTable data={orderList} />
              </TabPanel>
             </TabView>
            ) : (
              <TabView activeIndex={activeIndex} onTabChange={ e => setActiveIndex(e.index) }>
                <TabPanel header="Minhas Vendas">
                  <OrderUserTable data={orderList} />
                </TabPanel>
              </TabView>
            ) }   
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
  const items = await getOrderItems();
  const orders = await getOrders();

  return { props: { user, products, items, orders } }
});