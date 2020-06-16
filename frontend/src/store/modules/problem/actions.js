export function CancelRequest(id) {
  return {
    type: '@problem/CANCEL_REQUEST',
    payload: { id },
  };
}
