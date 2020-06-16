import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '~/services/api';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';

import { RegisterRequest } from '~/store/modules/order/actions';
import { Form, Input } from '@rocketseat/unform';
import Select from 'react-select';
import * as Yup from 'yup';
import {
  Container,
  Content,
  BackButton,
  SaveButton,
  FormContent,
  InputContent,
} from './styles';

const schema = Yup.object().shape({
  productName: Yup.string().required('O campo é obrigatorio'),
});

export default function Register() {
  const dispatch = useDispatch();

  const [Recipient, setRecipient] = useState([]);
  const [Deliveryman, setDeliveryman] = useState([]);

  const [recipientSelectedOption, setRecipientSelectOption] = useState('');
  const [deliverymanSelectedOption, setDeliverymanSelectOption] = useState('');

  //LOAD SELECT OPTION RECIPIENT
  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('/recipient');

      const data = response.data.map((recipient) => ({
        value: recipient.id,
        label: recipient.name,
      }));
      setRecipient(data);
    }
    loadRecipient();
  }, []);

  //LOAD SELECT OPTION DELIVERYMAN
  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get('/deliveryman', {
        params: {
          page: 1,
        },
      });

      const data = response.data.map((deliveryman) => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));
      setDeliveryman(data);
    }
    loadDeliveryman();
  }, []);

  function handleSubmit(data, { resetForm }) {
    const product_name = data.productName
      .replace(/\s{2,}/g, ' ')
      .trim()
      .toLowerCase();
    const recipient_id = recipientSelectedOption.value;
    const deliveryman_id = deliverymanSelectedOption.value;
    dispatch(RegisterRequest(product_name, recipient_id, deliveryman_id));
    resetForm(); // reset product name field
    setRecipientSelectOption(''); //reset recipient field
    setDeliverymanSelectOption(''); // reset deliveryman field
  }

  return (
    <Container>
      <Content>
        <header>
          <strong>Cadastro de encomendas</strong>
        </header>
        <div>
          <BackButton>
            <Link to="/order">
              <span>
                <FaChevronLeft size={10} />
              </span>
              VOLTAR
            </Link>
          </BackButton>
          <SaveButton type="submit" form="meuForm">
            <span>
              <FaCheck size={10} />
            </span>
            SALVAR
          </SaveButton>
        </div>
      </Content>

      <FormContent>
        <Form onSubmit={handleSubmit} schema={schema} id="meuForm">
          <InputContent>
            <span>
              <strong>Destinatário</strong>
              <Select
                value={recipientSelectedOption}
                onChange={setRecipientSelectOption}
                options={Recipient}
                noOptionsMessage={() => 'Nenhum destinatário encontrado :('}
                placeholder="Carla santos"
                isSearchable
                name="recipient"
              />
            </span>

            <span>
              <strong>Entregador</strong>
              <Select
                value={deliverymanSelectedOption}
                onChange={setDeliverymanSelectOption}
                options={Deliveryman}
                noOptionsMessage={() => 'Nenhum entregador encontrado :('}
                placeholder="Julia ribeiro"
                isSearchable
                name="deliveryman"
              />
            </span>
            <label className="productName">
              Nome do produto
              <Input type="text" name="productName" />
            </label>
          </InputContent>
        </Form>
      </FormContent>
    </Container>
  );
}
