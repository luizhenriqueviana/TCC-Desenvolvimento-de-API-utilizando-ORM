import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdSearch, MdAdd } from 'react-icons/md';

import api from '~/services/api';

import PopUp from '~/components/Popup';

import { Form, Input } from '@rocketseat/unform';

import { Container, Content, ContainerTable, Table, TableRow } from './styles';

export default function RecipientTable() {
  const [ListRecipient, setListRecipient] = useState([]);
  const [search, setSearch] = useState('');

  // SEARCH Recipe
  useEffect(() => {
    async function searchOrder() {
      const response = await api.get('/recipient', {
        params: {
          search: search,
        },
      });

      const data = response.data.map((recipient) => ({
        ...recipient,
      }));
      setListRecipient(data);
    }
    searchOrder();
  }, [search]);
  /*END SEARCH Recipient*/

  //LIST ALL RECIPIENT
  useEffect(() => {
    async function loadListRecipient() {
      const response = await api.get('/recipient', {
        params: {
          page: 1,
        },
      });

      const data = response.data.map((recipient) => ({
        ...recipient,
      }));

      setListRecipient(data);
    }
    loadListRecipient();
  }, []);

  function handleSubmit({ search }) {
    setSearch(search);
  }

  function deleteRows(index) {
    const recipient = Object.assign([], ListRecipient);
    recipient.splice(index, 1);
    setListRecipient(recipient);
  }

  return (
    <>
      <Container>
        <strong>Gerenciando destinatários </strong>
        <Content>
          <Form onSubmit={handleSubmit}>
            <span>
              <button>
                <MdSearch size={20} color="#999" />
              </button>
              <Input name="search" placeholder="Buscar por destinatários" />
            </span>
          </Form>

          <span>
            <MdAdd size={20} color="#fff" />
            <Link to="/recipient/register">
              <button>CADASTRAR</button>
            </Link>
          </span>
        </Content>
      </Container>

      <ContainerTable>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {ListRecipient.map((recipient, index) => (
              <TableRow key={recipient.id}>
                <td>#{recipient.id}</td>

                <td>{recipient.name}</td>
                <td>
                  Rua {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                  {recipient.state}
                </td>

                <td>
                  <PopUp
                    edit="Editar"
                    delete="Excluir"
                    id={recipient.id}
                    name="recipient"
                    delEvent={() => deleteRows(index)}
                  />
                </td>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ContainerTable>
    </>
  );
}
