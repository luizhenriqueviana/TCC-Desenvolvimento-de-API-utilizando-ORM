import React, { useState } from 'react';

import api from '~/services/api';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { MdImage } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';
import { registerRequest } from '~/store/modules/deliveryman/actions';
import * as Yup from 'yup';
import {
  Container,
  Content,
  BackButton,
  SaveButton,
  FormContent,
  ContainerImagePerfil,
  InputContent,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  name: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('O nome é obrigatório'),
});

export default function Register() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();

  // UPLOAD FILE
  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }
  function handleSubmit(data, { resetForm }) {
    // remove space between words
    const avatar = file;
    const name = data.name
      .replace(/\s{2,}/g, ' ')
      .trim()
      .toLowerCase();
    dispatch(registerRequest(name, data.email, avatar));
    setPreview(''); //reset image
    resetForm(); // reset form
  }
  return (
    <Container>
      <Content>
        <header>
          <strong>Cadastro de entregadores</strong>
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
        <Form schema={schema} onSubmit={handleSubmit} id="meuForm">
          <span>
            <ContainerImagePerfil>
              <label htmlFor="avatar">
                {!preview ? (
                  <MdImage size={80} color="#ddd" />
                ) : (
                  <img src={preview} alt="avatar" />
                )}
                <input
                  name="avatar_id"
                  type="file"
                  id="avatar"
                  accept="image/*"
                  data-file={file}
                  onChange={handleChange}
                />
              </label>
            </ContainerImagePerfil>

            <p>Adicionar foto</p>
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
