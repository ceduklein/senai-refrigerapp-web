import { toast } from "react-toastify";

import setupApiClient from "@/services/api"

const api = setupApiClient();

export const createCustomer = async(data) => {
  try {
    await api.post('/customers', data);
    toast.success('Cliente cadastrado.');
  } catch(err) {
    toast.error('Erro ao cadastrar cliente.');
    console.log('Erro: ', err);
  }
}

export const updateCustomer = async(id, data) => {
  try {
    await api.put(`/customers/${id}`, data);
    toast.success('Cadastro Atualizado.');
  } catch(err) {
    toast.error('Erro ao atualizar cadastro.');
    console.log('Erro: ', err);
  }
}

export const deleteCustomer = async(id) => {
  try {
    await api.delete(`/customers/${id}`);
    toast.success('Cadastro excluído.');
  } catch(err) {
    toast.error('Erro ao excluir o cadastro.');
    console.log('Erro: ', err);
  }
}

export const refreshCustomersList = async() => {
  try {
    const response =  await api.get('/customers');
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}
