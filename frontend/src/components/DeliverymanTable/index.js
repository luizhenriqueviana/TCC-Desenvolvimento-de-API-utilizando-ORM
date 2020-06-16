import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initialLetter } from '~/utils/format';
import { MdSearch, MdAdd } from 'react-icons/md';

import api from '~/services/api';

import PopUp from '~/components/Popup';

import { Form, Input } from '@rocketseat/unform';

import {
  Container,
  Content,
  ContainerTable,
  Table,
  TableRow,
  Avatar,
} from './styles';

export default function OrderTable() {
  const [ListDeliveryman, setListDeliveryman] = useState([]);
  const [search, setSearch] = useState('');

  // SEARCH DELIVERYMAN
  useEffect(() => {
    async function searchOrder() {
      const response = await api.get('/deliveryman', {
        params: {
          search: search,
        },
      });

      const data = response.data.map((order) => ({
        ...order,
      }));
      setListDeliveryman(data);
    }
    searchOrder();
  }, [search]);
  /*END SEARCH deliveryman*/

  //LIST ALL deliveryman
  useEffect(() => {
    async function loadListDeliveryman() {
      const response = await api.get('/deliveryman', {
        params: {
          page: 1,
        },
      });

      const data = response.data.map((deliveryman) => ({
        ...deliveryman,
        initials: initialLetter(deliveryman.name),
      }));

      setListDeliveryman(data);
    }
    loadListDeliveryman();
  }, []);

  function handleSubmit({ search }) {
    setSearch(search);
  }

  function deleteRows(index) {
    const deliveryman = Object.assign([], ListDeliveryman);
    deliveryman.splice(index, 1);
    setListDeliveryman(deliveryman);
  }
  return (
    <>
      <Container>
        <strong>Gerenciamento de entregadores</strong>
        <Content>
          <Form onSubmit={handleSubmit}>
            <span>
              <button>
                <MdSearch size={20} color="#999" />
              </button>
              <Input name="search" placeholder="Buscar por entregadores" />
            </span>
          </Form>

          <span>
            <MdAdd size={20} color="#fff" />
            <Link to="/deliveryman/register">
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
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {ListDeliveryman.map((deliveryman, index) => (
              <TableRow key={deliveryman.id}>
                <td>#{deliveryman.id}</td>
                <td>
                  <Avatar>
                    <span>
                      {deliveryman.avatar ? (
                        <img src={deliveryman.avatar.url} alt="avatar" />
                      ) : (
                        deliveryman.initials
                      )}
                    </span>
                  </Avatar>
                </td>
                <td>{deliveryman.name}</td>
                <td>{deliveryman.email}</td>

                <td>
                  <PopUp
                    edit="Editar"
                    delete="Excluir"
                    id={deliveryman.id}
                    name="deliveryman"
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
