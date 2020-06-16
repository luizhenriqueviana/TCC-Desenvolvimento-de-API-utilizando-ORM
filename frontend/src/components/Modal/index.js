import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import OrderModal from './OrderModal';

export default function Modal(props) {
  const MODAL_OPEN_CLASS = 'body--modal-open';

  // componentWillUnmount - remove class MODAL_OPEN_CLASS ,when modal is unmounted
  useEffect(() => {
    document.body.classList.add(MODAL_OPEN_CLASS);

    return () => {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    };
  }, []);

  return (
    <Container>
      {props.name === 'order' && <OrderModal id={props.id} />}
    </Container>
  );
}

Modal.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
};
