import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '~/services/api';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';

import { updateProfileRequest } from '~/store/modules/order/actions';
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
  const profile = useSelector((state) => state.order.profile);
  const dispatch = useDispatch();

  const recipient = {
    value: profile.recipient.id,
    label: profile.recipient.name,
  };

  const deliveryman = {
    value: profile.deliveryman.id,
    label: profile.deliveryman.name,
  };

  const [productName, setChangeProductName] = useState(profile.product_name);

  const [Recipient, setRecipient] = useState([]);
  const [Deliveryman, setDeliveryman] = useState([]);

  const [recipientSelectedOption, setRecipientSelectOption] = useState(
    recipient
  );
  const [deliverymanSelectedOption, setDeliverymanSelectOption] = useState(
    deliveryman
  );

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

  function handleSubmit(data) {
    const product_name = data.productName
      .replace(/\s{2,}/g, ' ')
      .trim()
      .toLowerCase();

    const dados = {
      id: profile.id,
      product_name: product_name,
      recipient_id: recipientSelectedOption.value,
      deliveryman_id: deliverymanSelectedOption.value,
    };

    dispatch(updateProfileRequest(dados));
  }

  return (
    <Container>
      <Content>
        <header>
          <strong>Edição de encomendas</strong>
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
        <Form
          schema={schema}
          id="meuForm"
          onSubmit={handleSubmit}
          initialData={profile}
        >
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
              <Input
                name="productName"
                type="text"
                value={productName}
                onChange={(e) => setChangeProductName(e.target.value)}
              />
            </label>
          </InputContent>
        </Form>
      </FormContent>
    </Container>
  );
}
