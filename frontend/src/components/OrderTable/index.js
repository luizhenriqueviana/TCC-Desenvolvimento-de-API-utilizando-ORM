import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoPrimitiveDot } from 'react-icons/go';
import { MdSearch, MdAdd } from 'react-icons/md';
import { initialLetter } from '~/utils/format';
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
  Status,
} from './styles';

export default function OrderTable() {
  const [ListOrders, setListOrders] = useState([]);
  const [search, setSearch] = useState('');

  // SEARCH ORDER
  useEffect(() => {
    async function searchOrder() {
      const response = await api.get('/order', {
        params: {
          search: search,
        },
      });

      const data = response.data.map((order) => ({
        ...order,
        status: order.end_date
          ? 'entregue'
          : order.canceled_at
          ? 'cancelada'
          : order.start_date
          ? 'retirada'
          : 'pendente',
      }));
      setListOrders(data);
    }
    searchOrder();
  }, [search]);
  /*END SEARCH ORDER*/

  //LIST ALL ORDERS
  useEffect(() => {
    async function loadListOrders() {
      const response = await api.get('/order', {
        params: {
          page: 1,
        },
      });

      const data = response.data.map((order) => ({
        ...order,
        initials: initialLetter(order.deliveryman.name),
        status: order.end_date
          ? 'entregue'
          : order.canceled_at
          ? 'cancelada'
          : order.start_date
          ? 'retirada'
          : 'pendente',
      }));

      setListOrders(data);
    }
    loadListOrders();
  }, []);

  function handleSubmit({ search }) {
    setSearch(search);
  }

  function deleteRows(index) {
    const orders = Object.assign([], ListOrders);
    orders.splice(index, 1);
    setListOrders(orders);
  }

  return (
    <>
      <Container>
        <strong>Gerencimento de encomendas</strong>
        <Content>
          <Form onSubmit={handleSubmit}>
            <span>
              <button>
                <MdSearch size={20} color="#999" />
              </button>
              <Input name="search" placeholder="Buscar por encomendas" />
            </span>
          </Form>

          <span>
            <MdAdd size={20} color="#fff" />
            <Link to="/order/register">
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
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {ListOrders.map((order, index) => (
              <TableRow key={order.id}>
                <td>#{order.id}</td>
                <td>{order.recipient.name}</td>
                <td>
                  <Avatar>
                    <span>
                      {order.deliveryman.avatar ? (
                        <img src={order.deliveryman.avatar.url} alt="avatar" />
                      ) : (
                        order.initials
                      )}
                    </span>
                    <p>{order.deliveryman.name}</p>
                  </Avatar>
                </td>
                <td>{order.recipient.city}</td>
                <td>{order.recipient.state}</td>
                <td>
                  <Status status={order.status}>
                    <GoPrimitiveDot />
                    <p>{order.status}</p>
                  </Status>
                </td>
                <td>
                  <PopUp
                    edit="Editar"
                    delete="Excluir"
                    view="Visualizar"
                    id={order.id}
                    name="order"
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
