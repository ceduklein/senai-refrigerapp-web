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

export const getUserById = async(id) => {
  try {
    const response =  await api.get(`/users/${id}`);
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}

export const changePassword = async(id, data) => {
  try {
    await api.patch(`/users/change-password/${id}`, data);
    toast.success('Senha Alterada.');
  } catch(err) {
    toast.error('Erro ao alterar senha.');
    console.log('Erro: ', err);
  }
}

export const updateUser = async(id, data) => {
  try {
    await api.put(`/users/${id}`, data);
    toast.success('Cadastro atualizado.');
  } catch(err) {
    toast.error('Erro ao atualizar cadastro.');
    console.log('Erro: ', err);
  }
}

export const deleteUser = async(id) => {
  console.log(id);
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

export const getUsers = async(admin_id) => {
  try {
    const response =  await api.get('/users', { params: { admin_id } });
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}