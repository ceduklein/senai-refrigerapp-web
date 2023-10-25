import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FiLogOut } from 'react-icons/fi';

import setupApiClient from "@/services/api";
import { signOut } from "@/context/AuthContext";

export function NavBar() {
  const api = setupApiClient();
  const handleSignout = () => signOut();

  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const { '@auth.userId': id } = parseCookies();

    async function fetchData() {
      const response = await api.get(`/users/${id}`);
      const { admin, name } = response.data;
      setAdmin(admin);
      const firstName = name.split(' ');
      setName(firstName[0]);
    }
    fetchData();
  })

  return (
    <Navbar className="navbar navbar-expand-lg" expand="lg" style={{backgroundColor: '#F0F4F7'}}>
      <Container fluid className="container-fluid">
        <Navbar.Brand href="/">RefrigerApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav>
            <NavDropdown id="nav-dropdown-dark-example" title="Clientes">
              <Nav.Link href="#action/3.1">Cadastrar</Nav.Link>
              <Nav.Link href="/clientes">Listar</Nav.Link>
            </NavDropdown>

            <NavDropdown id="nav-dropdown-dark-example" title="Produtos">
              <Nav.Link href="#action/3.1">Cadastrar</Nav.Link>
              <Nav.Link href="#action/3.1">Listar</Nav.Link>
            </NavDropdown>

            <NavDropdown id="nav-dropdown-dark-example" title="Pedidos">
              <Nav.Link href="#action/3.1">Cadastrar</Nav.Link>
              <Nav.Link href="#action/3.1">Listar</Nav.Link>
            </NavDropdown>

            {admin ? (
              <NavDropdown id="nav-dropdown-dark-example" title="Usuários">
                <Nav.Link href="#action/3.1">Cadastrar</Nav.Link>
                <Nav.Link href="#action/3.1">Listar</Nav.Link>
              </NavDropdown>
            ): (
              <></>
            )}

            <NavDropdown id="nav-dropdown-dark-example" title={name}>
              <Nav.Link href="#action/3.1">Minha Conta</Nav.Link>
              <Nav.Link href="#action/3.1">Trocar Senha</Nav.Link>
              <Nav.Link href="" onClick={handleSignout}>
                <FiLogOut size={18} style={{marginRight:'10px', marginBottom:'2px'}}/>Sair
              </Nav.Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}