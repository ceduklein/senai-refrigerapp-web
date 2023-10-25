import { useState } from "react";
import Head from "next/head";
import { parseCookies } from "nookies";

import styles from './index.module.scss';

import { NavBar } from "@/components/NavBar";
import { canSSRAuth } from "@/utils/canSSRAuth";
import setupApiClient from "@/services/api";
import { Card } from "@/components/Card";

export default function Dashboard({ user }) {
  const [name, setName] = useState(user.name);

  return(
    <>
      <Head>
        <title>RefrigerApp - Dashboard</title>
      </Head>
      <NavBar />

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerDashboard}>
          <Card title="Dashboard">
            <h1>Olá, {user.name} </h1>
          </Card>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);
  const { '@auth.userId': id } = parseCookies(ctx);
  const response = await api.get(`/users/${id}`);

  return { props: { user: response.data } }
});