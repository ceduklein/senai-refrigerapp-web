import { toast } from "react-toastify";

import setupApiClient from "@/services/api"

const api = setupApiClient();

export const createUser = async(data) => {
  try {
    await api.post('/users', data);
    toast.success('Usuário cadastrado.');
  } catch(err) {
    toast.error('Erro ao cadastrar usuário.');
    console.log('Erro: ', err);
  }
}

export const deleteUser = async(id) => {
  try {
    await api.delete(`/users/${id}`);
    toast.success('Cadastro excluído.');
  } catch(err) {
    toast.error('Erro ao excluir o cadastro.');
    console.log('Erro: ', err);
  }
}

export const setCredential = async(id, admin_id) => {
  try {
    await api.patch(`/users/credentials/${id}`, { admin_id });
    toast.success('Permissões de usuário alteradas.');
  } catch(err) {
    toast.error('Erro ao mudar permissão de usuário.');
    console.log('Erro: ', err);
  }
}

export const refreshUsersList = async(admin_id) => {
  try {
    const response =  await api.get('/users', { params: { admin_id } });
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}