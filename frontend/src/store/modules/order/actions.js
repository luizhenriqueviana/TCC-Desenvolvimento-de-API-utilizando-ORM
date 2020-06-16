export function DeleteRequest(id) {
  return {
    type: '@order/DELETE_REQUEST',
    payload: { id },
  };
}

export function RegisterRequest(product_name, recipient_id, deliveryman_id) {
  return {
    type: '@order/REGISTER_ORDER_REQUEST',
    payload: { product_name, recipient_id, deliveryman_id },
  };
}

export function sendIdOrderRequest(id) {
  return {
    type: '@order/SEND_ID_ORDER',
    payload: { id },
  };
}

export function saveOrderRequest(data) {
  return {
    type: '@order/SAVE_ORDER_REQUEST',
    payload: { data },
  };
}

export function updateProfileRequest(data) {
  return {
    type: '@order/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@order/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@order/FAILURE_PROFILE_REQUEST',
  };
}
