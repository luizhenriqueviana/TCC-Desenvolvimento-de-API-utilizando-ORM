import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  DeleteRequest,
  sendIdOrderRequest,
} from '~/store/modules/order/actions';
import { CancelRequest } from '~/store/modules/problem/actions';
import {
  deleteDeliverymanRequest,
  sendIdDeliverymanRequest,
} from '~/store/modules/deliveryman/actions';
import {
  deleteRecipientRequest,
  sendIdRecipientRequest,
} from '~/store/modules/recipient/actions';

import PropTypes from 'prop-types';

import { MdVisibility, MdEdit, MdDeleteForever } from 'react-icons/md';
import { PopUp, OptionList, Options, Badge, Overlay } from './styles';
import { GoPrimitiveDot } from 'react-icons/go';

import Modal from '~/components/Modal';

export default function Popup(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState();
  const [changeDisplayView, setChangeDisplayView] = useState('flex');
  const [changeDisplayEdit, setChangeDisplayEdit] = useState('flex');
  const [displayModal, setDisplayModal] = useState(false);
  const [TableName] = useState(props.name);

  function handleEdit() {
    // TableName pega a referencia de em qual tabela o popup foi clicado
    if (TableName === 'deliveryman') {
      dispatch(sendIdDeliverymanRequest(props.id));
    }
    if (TableName === 'recipient') {
      dispatch(sendIdRecipientRequest(props.id));
    }
    if (TableName === 'order') {
      dispatch(sendIdOrderRequest(props.id));
    }
  }

  function handleDelete() {
    setVisible(!visible);
    if (window.confirm('Tem certeza que deseja excluir?') === true) {
      if (TableName === 'order') {
        // TableName pega a referencia de em qual tabela o popup foi clicado
        dispatch(DeleteRequest(props.id));
        props.delEvent();
      }
      if (TableName === 'problem') {
        dispatch(CancelRequest(props.id_problem));
      }
      if (TableName === 'deliveryman') {
        dispatch(deleteDeliverymanRequest(props.id));
        props.delEvent();
      }
      if (TableName === 'recipient') {
        dispatch(deleteRecipientRequest(props.id));
        props.delEvent();
      }
    }
  }

  function handleToggleVisible() {
    setVisible(!visible);
    if (!props.view) {
      setChangeDisplayView('none');
    }
    if (!props.edit) {
      setChangeDisplayEdit('none');
    }
  }

  function handleModal() {
    setDisplayModal(!displayModal);

    if (visible === true) {
      setVisible(false);
    }
  }

  return (
    <>
      <Overlay displayModal={displayModal} onClick={handleModal}>
        {/* checks the modal,then after Unmout on
        file src/components/Modal*/}
        {displayModal ? <Modal id={props.id} name={props.name} /> : false}
      </Overlay>
      <Badge onClick={handleToggleVisible}>
        <GoPrimitiveDot size={8} />
        <GoPrimitiveDot size={8} />
        <GoPrimitiveDot size={8} />
      </Badge>
      <PopUp>
        <OptionList visible={visible}>
          <Options style={{ display: changeDisplayView }}>
            <span>
              <MdVisibility color="#8E5BE8" />
            </span>

            <button onClick={handleModal}>{props.view}</button>
          </Options>

          <Options style={{ display: changeDisplayEdit }}>
            <span>
              <MdEdit color="#4D85EE" />
            </span>
            <button onClick={handleEdit}>{props.edit}</button>
          </Options>

          <Options>
            <span>
              <MdDeleteForever color="#DE3B3B" />
            </span>
            <button onClick={handleDelete}>{props.delete}</button>
          </Options>
        </OptionList>
      </PopUp>
    </>
  );
}

PopUp.propTypes = {
  edit: PropTypes.string,
  delete: PropTypes.string,
  view: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
};
