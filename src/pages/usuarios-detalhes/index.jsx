import { useState, useEffect } from "react";
import Router from "next/router";
import { parseCookies } from "nookies";
import Head from "next/head";
import { FiArrowLeftCircle, FiSave } from "react-icons/fi";
import { RiLockPasswordLine } from 'react-icons/ri';

import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { CheckBox } from "@/components/CheckBox";
import { PasswordDialog } from "./components/passwordDialog";

import { canSSRAuth } from "@/utils/canSSRAuth";
import setupApiClient from "@/services/api";
import { updateUser } from "./service";

export default function DetalhesUsuario({ user }) {
  const [id, setId] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [cpf, setCpf] = useState(user.cpf);
  const [login, setLogin] = useState(user.login);
  const [admin, setAdmin] = useState(user.admin);
  const [disableButton, setDisableButton] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDialog = () => setShowDialog(false);
  const handleOpenDialog = () => setShowDialog(true);

  useEffect(() => {
    if(name === user.name && login === user.login)
      setDisableButton(true);
    else
      setDisableButton(false);
  }, [name, login]);

  const handleGoBack = () => Router.back();
  
  const handleUpdate = async() => {
    const data = { name, login }
    await updateUser(id, data);
  }

  return(
    <>
      <Head>
        <title>RefrigerApp - Minha Conta</title>
      </Head>
      <NavBar />
      <div className="container" style={{marginTop: '100px'}}>
        <Card title="Minha Conta">
          <div className="row">
            <div className="col-md-2">
              <Input label='Id' htmlFor='id' type='text' disabled={true} placeholder="Id"
              value={id} onChange={e => setId(e.target.value)} />
            </div>
            <div className="col-md-10">
              <Input label='Nome' htmlFor='name' type='text'
              value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <Input label='CPF' htmlFor='cpf' type='text' value={cpf} disabled />
            </div>
            <div className="col-md-5">
              <Input label='Login' htmlFor='login' type='text' value={login} 
                onChange={e => setLogin(e.target.value)} />
            </div>
            <div className="col-md-2">
            <CheckBox label="Permissões" htmlFor='admin' admin={admin}
              text={ admin ? `Administrador` : `Vendedor` } />
            </div>
          </div>

          <div style={{marginTop: '5px'}}>
            <button className="btn btn-secondary" onClick={handleGoBack} 
              style={{fontSize: '1.15rem', width: '30%'}}>
              <FiArrowLeftCircle size={20} style={{ marginTop: '-5px' }} /> Voltar
            </button>
            <button className="btn btn-primary" type="button" onClick={ handleOpenDialog }
              style={{ fontSize: '1.15rem', width: '30%', marginLeft: '5%' }}>
              <RiLockPasswordLine size={20} style={{ marginTop: '-5px' }} /> Trocar Senha
            </button>
            <button className="btn btn-success" type="button" disabled={disableButton}
              onClick={ handleUpdate } 
              style={{ fontSize: '1.15rem', marginLeft: '5%' , width: '30%' }}>
              <FiSave size={19} style={{marginTop: '-3px'}} /> Salvar Alterações
            </button>
          </div>
        </Card>

        <PasswordDialog showDialog={showDialog} closeDialog={handleCloseDialog}
          onConfirm={handleCloseDialog} userId={id} />
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
