import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';
import {
  saveDeliverymanRequest,
  updateProfileFailure,
  updateProfileSuccess,
} from './actions';

export function* register({ payload }) {
  try {
    const { name, email, avatar_id } = payload;

    yield call(api.post, 'deliveryman', {
      name,
      email,
      avatar_id,
    });
    toast.success('Entregador adicionado com sucesso!');
  } catch (err) {
    toast.error('Usuário com esse e-mail já existe');
  }
}

export function* deleteDeliveryman({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `deliveryman/${id}`);
  } catch (err) {
    console.log(err);
  }
}

export function* sendId({ payload }) {
  const { id } = payload;

  const response = yield call(api.get, `deliveryman/${id}`);

  const deliveryman = response.data;

  yield put(saveDeliverymanRequest(deliveryman));

  history.push(`deliveryman/edit`);
}

export function* updateProfile({ payload }) {
  try {
    const { name, email, id, avatar_id } = payload.data;
    const response = yield call(api.put, `deliveryman/${id}`, {
      avatar_id,
      name,
      email,
    });

    toast.success('Entregador atualizado com sucesso !');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil');
    yield put(updateProfileFailure());
  }
}
//
export default all([
  takeLatest('@deliveryman/REGISTER_REQUEST', register),
  takeLatest('@deliveryman/DELETE_REQUEST', deleteDeliveryman),
  takeLatest('@deliveryman/SEND_ID_DELIVERYMAN', sendId),
  takeLatest('@deliveryman/UPDATE_PROFILE_REQUEST', updateProfile),
]);
