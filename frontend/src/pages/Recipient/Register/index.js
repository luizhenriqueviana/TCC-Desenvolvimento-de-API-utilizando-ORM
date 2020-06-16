import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { cepMask } from '~/utils/mask';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';

import { registerRequest } from '~/store/modules/recipient/actions';
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
  name: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('O campo é obrigatório'),

  complement: Yup.string().required('O campo é obrigatório'),

  street: Yup.string().required('O campo é obrigatório'),

  number: Yup.number()
    .typeError('O campo deve ser um numero')
    .positive('O numero deve ser positivo')
    .integer('O numero deve ser inteiro')
    .required('O campo é obrigatório'),

  city: Yup.string().required('O campo é obrigatório'),

  state: Yup.string().required('O campo é obrigatório'),

  zipcode: Yup.string().required('O campo é obrigatório'),
});

export default function Register() {
  const [zipcode, setZipCode] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(data, { resetForm }) {
    const name = data.name
      .replace(/\s{2,}/g, ' ')
      .trim()
      .toLowerCase();

    dispatch(
      registerRequest(
        name,
        data.complement,
        data.number,
        data.street,
        data.city,
        data.state,
        data.zipcode
      )
    );

    resetForm(); // reset form
  }
  return (
    <Container>
      <Content>
        <header>
          <strong>Cadastro de destinatário</strong>
        </header>
        <div>
          <BackButton>
            <Link to="/recipient">
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
        <Form schema={schema} onSubmit={handleSubmit} id="meuForm">
          <InputContent>
            <label className="name">
              Nome
              <Input type="text" name="name" placeholder="Jhon Doe" />
            </label>
            <div className="subgrid">
              <label className="street">
                Rua
                <Input type="text" name="street" placeholder="Rua Emerald" />
              </label>
              <label className="number">
                Número
                <Input name="number" placeholder="304" />
              </label>
              <label className="complement">
                Complemento
                <Input type="text" name="complement" placeholder="Quadra 20" />
              </label>
            </div>
            <label className="city">
              Cidade
              <Input type="text" name="city" placeholder="Porto Alegre" />
            </label>
            <label className="state">
              Estado
              <Input type="text" name="state" placeholder="Santa Catarina" />
            </label>
            <label className="zipcode">
              CEP
              <Input
                type="text"
                name="zipcode"
                placeholder="76129-367"
                value={cepMask(zipcode)}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </label>
          </InputContent>
        </Form>
      </FormContent>
    </Container>
  );
}
