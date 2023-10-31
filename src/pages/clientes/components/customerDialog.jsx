import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { FaUserPlus, FaUserEdit } from 'react-icons/fa';
import { FiXCircle, FiSave } from 'react-icons/fi';

import { Input } from '@/components/Input';

import { createCustomer, updateCustomer } from '../service'
        
export function CustomerDialog(props) {
  const { showDialog, closeDialog, user, onConfirm } = props;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [doc, setDoc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if(user) {
      setId(user.id);
      setName(user.name)
      setDoc(user.doc)
      setPhone(user.phone)
      setEmail(user.email)
    }
  },[user]);

  const handleClickUpdate = async () => {
    await handleUpdate();
    onConfirm();
  }

  const handleClickSave = async () => {
    await handleSave();
    onConfirm();
  }

  const handleUpdate = async() => {
    const data = { name, email, phone };
    await updateCustomer(id, data);
  }

  const handleSave = async() => {
    const data = { name, doc, phone, email };
    await createCustomer(data);
  }

  const dialogHeader = () => {
    return(
      <span style={{ cursor: 'default' }}>
        { user ? (
          <FaUserEdit size={30} color={'#3459E6'} style={{margin: '-3px 20px 0 0'}} />
        ) : (
          <FaUserPlus size={30} color={'#3459E6'} style={{margin: '-3px 20px 0 0'}} />
        ) }
        Cadastro Cliente
      </span>
    )
  }

  const dialogFooter = () => {
    return(
      <div>
        { user ? (
          <button type="button" className="btn btn-success" 
            onClick={ handleClickUpdate } style={{marginRight: '30px'}}>
            <FiSave size={16} style={{marginTop:'-2px'}}/> Atualizar 
          </button>
        ) : (
          <button type="button" className="btn btn-success" 
            onClick={ handleClickSave } style={{marginRight: '30px'}}>
            <FiSave size={16} style={{marginTop:'-2px'}}/> Cadastrar 
          </button>
        ) }
        <button type="button" className="btn btn-danger" onClick={ closeDialog }>
        <FiXCircle size={16} style={{marginTop:'-2px'}}/> Cancelar
        </button>
      </div>
    )
  }

  return(
    <Dialog header={ dialogHeader } visible={ showDialog } style={{ width: '30vw' }} 
      onHide={ closeDialog } footer={ dialogFooter } user={user} >  
      <Input label='Id' htmlFor='id' type='text' value={id} disabled />
      <Input label='Nome' htmlFor='name' type='text' 
        value={name} onChange={e => setName(e.target.value)} />
      <Input label='CPF/CNPJ' htmlFor='doc' type='text' disabled={!user ? false : true}
        value={doc} onChange={e => setDoc(e.target.value)} />
      <Input label='Telefone' htmlFor='phone' type='text' 
        value={phone} onChange={e => setPhone(e.target.value)} />
      <Input label='Email' htmlFor='email' type='text' 
        value={email} onChange={e => setEmail(e.target.value)} /> 
    </Dialog>
  )
}
