import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function deliveryman(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@deliveryman/SAVE_DELIVERYMAN_REQUEST': {
        draft.profile = action.payload.data;
        break;
      }
      case '@deliveryman/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      default:
        return state;
    }
  });
}
