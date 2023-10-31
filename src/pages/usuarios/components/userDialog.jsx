import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { FaUserPlus, FaUser } from 'react-icons/fa';
import { FiXCircle, FiSave } from 'react-icons/fi';

import { Input } from '@/components/Input';

import { createUser } from '../service';

export function UserDialog(props) {
  const { showDialog, closeDialog, user, onConfirm} = props;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [login, setLogin] = useState("");

  useEffect(() => {
    if(user) {
      setId(user.id)
      setName(user.name)
      setCpf(user.cpf)
      setLogin(user.login)
    }
  },[user]);

  const handleClickSave = async() => {
    const data = { name, cpf, login }
    await createUser(data);
    onConfirm();
  }

  const dialogHeader = () => {
    return(
      <span style={{ cursor: 'default' }}>
        { user ? (
          <FaUser size={30} color={'#3459E6'} style={{margin: '-3px 20px 0 0'}} />
        ) : (
          <FaUserPlus size={30} color={'#3459E6'} style={{margin: '-3px 20px 0 0'}} />
        ) }
        Cadastro Usuário
      </span>
    )
  }

  const dialogFooter = () => {
    return(
      <div>
        { user ? (
          <></>
        ) : (
          <button type="button" className="btn btn-success" 
            onClick={ handleClickSave } style={{marginRight: '30px'}}>
            <FiSave size={16} style={{marginTop:'-2px'}}/> Cadastrar 
          </button>
        ) }
        <button type="button" className="btn btn-danger" onClick={ closeDialog }>
        <FiXCircle size={16} style={{marginTop:'-2px'}}/> { user ? `Fechar` : `Cancelar` }
        </button>
      </div>
    )
  }

  return(
    <Dialog header={ dialogHeader } visible={ showDialog } style={{ width: '30vw' }} 
    onHide={ closeDialog } footer={ dialogFooter } user={user} >
      <Input label='Id' htmlFor='id' type='text' value={id} disabled />
      <Input label='Nome' htmlFor='name' type='text' disabled={ user ? true : false }
        value={name} onChange={e => setName(e.target.value)} />
      <Input label='CPF' htmlFor='cpf' type='text' disabled={ user ? true : false }
        value={cpf} onChange={e => setCpf(e.target.value)} />
      <Input label='Login' htmlFor='login' type='text' disabled={ user ? true : false }
        value={login} onChange={e => setLogin(e.target.value)} />
    </Dialog>
  )
}