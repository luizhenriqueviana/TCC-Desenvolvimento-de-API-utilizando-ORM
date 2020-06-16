import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';

import { Form, Input } from '@rocketseat/unform';
import { updateProfileRequest } from '~/store/modules/deliveryman/actions';
import * as Yup from 'yup';
import {
  Container,
  Content,
  BackButton,
  SaveButton,
  FormContent,
  InputContent,
} from './styles';
import AvatarInput from '~/components/AvatarInput';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  name: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('O nome é obrigatório'),
  avatar_id: Yup.string(),
});

export default function Edit() {
  const profile = useSelector((state) => state.deliveryman.profile);
  const dispatch = useDispatch();

  const profile_id = {
    // It's create a object with name id and value id from profile
    id: profile.id,
  };

  function handleSubmit(data) {
    const dados = Object.assign(data, profile_id);
    dispatch(updateProfileRequest(dados));
    // console.log(data);
  }
  return (
    <Container>
      <Content>
        <header>
          <strong>Edição de entregadores</strong>
        </header>
        <div>
          <BackButton>
            <Link to="/deliveryman">
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
          initialData={profile}
          schema={schema}
          onSubmit={handleSubmit}
          id="meuForm"
        >
          <span>
            <AvatarInput name="avatar_id" name_label={profile.name} />
          </span>

          <InputContent>
            <label>
              Nome
              <Input name="name" placeholder="Jhon Doe" />
            </label>
            <label>
              Email
              <Input
                type="email"
                name="email"
                placeholder="example@example.com"
              />
            </label>
          </InputContent>
        </Form>
      </FormContent>
    </Container>
  );
}
