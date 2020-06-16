import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  saveOrderRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from './actions';

export function* deleteOrder({ payload }) {
  //
  const { id } = payload;

  yield call(api.delete, `order/${id}`);
}

export function* registerOrder({ payload }) {
  try {
    const { product_name, recipient_id, deliveryman_id } = payload;

    if (!recipient_id || !deliveryman_id) {
      toast.error(
        'Encomenda não cadastrada. Verifique se todos os campos foram preenchidos'
      );
      return;
    }

    yield call(api.post, `/order`, {
      product_name,
      recipient_id,
      deliveryman_id,
    });

    toast.success('Encomenda registrada com sucesso!');
  } catch (err) {
    toast.error('Falha no registro de encomenda');
  }
}

export function* sendId({ payload }) {
  const { id } = payload;

  const response = yield call(api.get, `order/${id}`);

  const order = response.data;

  yield put(saveOrderRequest(order));

  history.push(`order/edit`);
}

export function* updateProfile({ payload }) {
  try {
    const { id, product_name, recipient_id, deliveryman_id } = payload.data;

    const response = yield call(api.put, `order/${id}`, {
      product_name,
      recipient_id,
      deliveryman_id,
    });

    toast.success('Encomenda atualizada com sucesso !');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar');
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@order/DELETE_REQUEST', deleteOrder),
  takeLatest('@order/REGISTER_ORDER_REQUEST', registerOrder),
  takeLatest('@order/SEND_ID_ORDER', sendId),
  takeLatest('@order/UPDATE_PROFILE_REQUEST', updateProfile),
]);
