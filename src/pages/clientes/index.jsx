import Head from 'next/head';

import styles from './index.module.scss';

import { Card } from "@/components/Card";
import { NavBar } from "@/components/NavBar";

import { canSSRAuth } from '@/utils/canSSRAuth';

export default function Clientes({ user }) {


  return(
    <>
      <Head>
        <title>RefrigerApp - Clientes</title>
      </Head>
      <NavBar />

      <div className="container">
        <div className={styles.containerCustomer}>
          <Card title="Clientes">
            <h1>Clientes</h1>
          </Card>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  // const api = setupApiClient(ctx);
  // const { '@auth.userId': id } = parseCookies(ctx);
  // const response = await api.get(`/users/${id}`);

  // return { props: { user: response.data } }

  return { props: {} }
});