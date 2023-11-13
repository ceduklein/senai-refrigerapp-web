import { useContext, useState } from 'react';
import Head from 'next/head';
import { Button } from 'primereact/button';

import styles from '@/styles/Home.module.scss';

import { Card } from '@/components/Card';
import { InputIcon } from '@/components/InputIcon';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { canSSRGuest } from '@/utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    if (login === '' && password === '') {
      toast.warning('Preencha todos os campos.');
      return;
    }
    await signIn(login, password);
  }

  return (
    <>
      <Head>
        <title>RefrigerApp - Faça seu login</title>
      </Head>
      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerLogin}>
          <Card title="Login">
            <InputIcon placeholder="Login" primeIcon="pi pi-user" value={login} 
            onChange={ e => setLogin(e.target.value)} />
            <InputIcon placeholder="Senha" primeIcon="pi pi-key" value={password} 
            onChange={ e => setPassword(e.target.value)} type="password" />
            <Button label="Acessar" type='button' raised severity='success' onClick={handleLogin} />
          </Card>
        </div>
      </div>
      
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return { props: {} }
});
