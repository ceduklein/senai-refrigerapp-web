import { toast } from "react-toastify";

import setupApiClient from "@/services/api"

const api = setupApiClient();

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