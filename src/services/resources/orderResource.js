import { toast } from "react-toastify";

import setupApiClient from "@/services/api"

const api = setupApiClient();

export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(`/items/order/${id}`);
    toast.success('Pedido excluído.');
    return response.data;
  } catch(err) {
    toast.error('Erro ao excluir o pedido.');
    console.log('Erro: ', err);
  }
}

export const createOrder = async (data) => {
  try {
    const response = await api.post(`/orders`, data);
    toast.success('Pedido iniciado.');
    return response.data;
  } catch(err) {
    toast.error('Erro iniciar o pedido.');
    console.log('Erro: ', err);
  }
}

export const saveOrderItem = async(data) => {
  try {
    const response = await api.post(`/items`, data);
    toast.success('Item adicionado ao pedido.');
    return response.data;
  } catch(err) {
    toast.error('Erro ao adicionar item.');
    console.log('Erro: ', err);
  }
}

export const getOrderItems = async() => {
  try {
    const response = await api.get('/items');
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}

export const deleteOrderItem = async(id) => {
  try {
    await api.delete(`/items/${id}`);
    toast.success('Item excluído do pedido.');
  } catch(err) {
    toast.error('Erro ao excluir item.');
    console.log('Erro: ', err);
  }
}

export const getOrderItemsByOrder = async(idOrder) => {
  try {
    const response = await api.get('/items/order', { params: { idOrder } });
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}

export const getOrderItemsByProduct = async(idProduct) => {
  try {
    const response = await api.get('/items/product', { params: { idProduct } });
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}

export const getOrders = async() => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}

export const getOrderById = async(id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
  }
}

export const getOrdersByUser = async(idUser) => {
  try {
    const response = await api.get(`orders/user/${idUser}`);
    return response.data;
  } catch(err) {
    console.log('Erro: ', err);
    toast.warning(err.response.data);
  }
}