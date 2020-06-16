import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo2.svg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <NavLink to="/order">ENCOMENDAS</NavLink>
          <NavLink to="/deliveryman">ENTREGADORES</NavLink>
          <NavLink to="/recipient">DESTINATÁRIOS</NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button onClick={handleSignOut}>sair do sistema</button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
