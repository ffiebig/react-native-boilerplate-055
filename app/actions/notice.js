export const SET_NOTICE = 'SET_NOTICE';
export const CLEAR_NOTICE = 'CLEAR_NOTICES';

export const setNotice = ({ params }) => ({
  type: SET_NOTICE,
  title: params.title,
  alert: params.alert,
  kind: params.kind,
});
export const clearNotice = () => ({ type: CLEAR_NOTICE });
