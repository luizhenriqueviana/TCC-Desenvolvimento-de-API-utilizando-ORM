export function registerRequest(name, email, avatar_id) {
  return {
    type: '@deliveryman/REGISTER_REQUEST',
    payload: { name, email, avatar_id },
  };
}

export function deleteDeliverymanRequest(id) {
  return {
    type: '@deliveryman/DELETE_REQUEST',
    payload: { id },
  };
}

export function sendIdDeliverymanRequest(id) {
  return {
    type: '@deliveryman/SEND_ID_DELIVERYMAN',
    payload: { id },
  };
}

export function saveDeliverymanRequest(data) {
  return {
    type: '@deliveryman/SAVE_DELIVERYMAN_REQUEST',
    payload: { data },
  };
}

export function updateProfileRequest(data) {
  return {
    type: '@deliveryman/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@deliveryman/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@deliveryman/FAILURE_PROFILE_REQUEST',
  };
}
