import 'bootswatch/dist/zephyr/bootstrap.min.css';

import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primeicons/primeicons.css';

import '../styles/globals.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} theme='colored' />
    </AuthProvider>
  )
}
