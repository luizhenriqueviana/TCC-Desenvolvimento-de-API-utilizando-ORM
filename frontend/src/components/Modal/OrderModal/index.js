import React, { useState, useEffect } from 'react';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container, Content, Info, Date } from './styles';

import api from '~/services/api';

export default function OrderModal({ id }) {
  const [orders, setOrder] = useState([]);
  console.log(id);
  useEffect(() => {
    async function loadOrder() {
      const ArrayOrder = [];
      const response = await api.get(`/order/${id}`);
      ArrayOrder.push(response.data);

      const data = ArrayOrder.map((order) => ({
        ...order,
        dateStartFormatted:
          order.start_date &&
          format(parseISO(order.start_date), 'dd/MM/yyyy', { locale: pt }),
        dateEndFormatted:
          order.end_date &&
          format(parseISO(order.end_date), 'dd/MM/yyyy', { locale: pt }),
      }));

      setOrder(data);
    }
    loadOrder();
  }, [id]);

  return (
    <Container>
      {orders.map((order) => (
        <Content key={order.id}>
          <Info>
            <strong>Informações da encomenda</strong>
            <p>
              Rua {order.recipient.street}, {order.recipient.number}
            </p>
            <p>
              {order.recipient.city} - {order.recipient.state}
            </p>
            <p>{order.recipient.zip_code}</p>
          </Info>

          <Date>
            <strong>Datas</strong>
            <p>
              <strong>Retirada:</strong>
              {order.dateStartFormatted}
            </p>
            <p>
              <strong>Entrega:</strong>
              {order.dateEndFormatted}
            </p>
          </Date>
        </Content>
      ))}
    </Container>
  );
}
