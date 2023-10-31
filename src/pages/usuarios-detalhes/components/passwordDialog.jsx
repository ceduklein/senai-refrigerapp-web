import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"
import { RiLockPasswordLine } from 'react-icons/ri';

import { Input } from "@/components/Input";

import { changePassword } from "../service";

export function PasswordDialog(props) {
  const { showDialog, closeDialog, onConfirm, userId } = props;

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleClickChange = async() => {
    const data = { oldPassword, password, passwordConfirmation };
    await changePassword(userId, data);
    onConfirm();
    setOldPassword('');
    setPassword('');
    setPasswordConfirmation('');
  }

  const dialogHeader = () => {
    return(
      <span style={{ cursor: 'default' }}>
          <RiLockPasswordLine size={30} color={'#3459E6'} style={{margin: '-3px 20px 0 0'}} />
        Alterar Senha
      </span>
    )
  }

  const dialogFooter = () => {
    return(
      <div>
        <button type="button" className="btn btn-success" onClick={ handleClickChange } 
        style={{marginRight: '30px'}}>
          <FiCheckCircle size={16} style={{marginTop:'-2px'}}/> Alterar
        </button>
        <button type="button" className="btn btn-danger" onClick={ closeDialog }>
          <FiXCircle size={16} style={{marginTop:'-2px'}}/> Cancelar
        </button>
      </div>
    )
  }

  return (
    <Dialog header={ dialogHeader } visible={ showDialog } style={{ width: '30vw' }} 
      onHide={ closeDialog } footer={ dialogFooter }>  
      <Input label='Senha Antiga' htmlFor='oldPass' type='password' value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}  />
      <Input label='Nova Senha' htmlFor='pass' type='password' 
        value={password} onChange={e => setPassword(e.target.value)} />
      <Input label='Confirmação Nova Senha' htmlFor='passConfirmation' type='password'
        value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
    </Dialog>
  )
}