import { createContext, useState, useEffect } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';

import setupApiClient from '@/services/api';

export const AuthContext = createContext();

export function signOut() {
  try {
    destroyCookie(undefined, '@auth.userId');
    Router.push('/');
  } catch {
    console.log('Erro ao efetuar o logout.')
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  const api = setupApiClient();

  useEffect(() => {
    const { '@auth.userId': id } = parseCookies();

    if (id) {
      async function fetchData() {
        try {
          const response = await api.get(`/users/${id}`);
          
          const { name, login, cpf, isAdmin } = response.data;
          setUser({ id, name, login, cpf, isAdmin });

        } catch(err) {
          signOut();
        }  
      }
      fetchData();
    } else {
      signOut();
    }
  },[]);

  async function signIn(login, password) {
    let data = { login, password };

    try {
      const response = await api.post('/users/login', data);
      
      const { id, name, login, cpf, isAdmin } = response.data;

      setCookie(undefined, '@auth.userId', id, {
        maxAge: 15 * 15 * 24 * 30,
        path: '/'
      });

      setUser({ id, name, login, cpf, isAdmin });
      
      toast.success('Login efetuado com sucesso.');

      Router.push('/dashboard');

    } catch(err) {
      toast.error('Erro ao efetuar o login.');
      console.log('Erro: ', err);
    }
  }

  return(
    <AuthContext.Provider value = {{ user, isAuthenticated, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  )
}