import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function recipient(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@order/SAVE_ORDER_REQUEST': {
        draft.profile = action.payload.data;
        break;
      }
      case '@order/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      default:
        return state;
    }
  });
}
