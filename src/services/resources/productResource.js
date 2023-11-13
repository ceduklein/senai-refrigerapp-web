import { toast } from "react-toastify";

import setupApiClient from "@/services/api"

const api = setupApiClient();

export const createProduct = async (data) => {
  if (validateProduct(data)) {
    data.value = Number(data.value);
    data.quantity = Number(data.quantity);

    try {
      const response = await api.post(`/products`, data);
      toast.success('Produto cadastrado.');
      return response.data;
    } catch(err) {
      toast.error('Erro ao cadastrar produto.');
      console.log('Erro: ', err);
    }
  }
}

export const updateProduct = async(id, data) => {
  if (validateProduct(data)) {
    data.value = Number(data.value);
    data.quantity = Number(data.quantity);

    try {
      const response = await api.put(`/products/${id}`, data);
      toast.success('Produto atualizado.');
      return response.data;
    } catch(err) {
      toast.error('Erro ao atualizar produto.');
      console.log('Erro: ', err);
    }
  }
}

export const changeStatus = async (id, admin_id) => {
  try {
    await api.patch(`/products/status/${id}`, { admin_id });
    toast.success('Status Alterado..');
  } catch(err) {
    toast.error('Erro ao alterar status do produto.');
    console.log('Erro: ', err);
  }
}

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    toast.success('Produto exlcuído.');
  } catch(err) {
    toast.error('Erro ao excluir produto.');
    console.log('Erro: ', err);
  }
}

export const getProducts = async() => {
  try {
    const response = await api.get(`/products`);
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}

export const getActiveProducts = async() => {
  try {
    const response = await api.get(`/products/actives`);
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}

export const validateProduct = (prod) => {
  if(prod.name === "" || prod.model === "" || prod.brand === "" || prod.category === "" ||
      prod.voltage === "" || prod.value === "" || prod.quantity === "" || prod.ean === "" ||
      prod.image === "") {
        toast.warning('Preencha todos os campos.');
        return false;
  } else {
    return true;
  }
}