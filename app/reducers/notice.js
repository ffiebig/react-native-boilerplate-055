import { SET_NOTICE, CLEAR_NOTICE } from '../actions/notice';

const initialState = {
  title: '',
  message: '',
  kind: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTICE:
      return {
        ...state,
        title: action.title,
        message: action.message,
        kind: action.kind,
      };
    case CLEAR_NOTICE:
      return {
        ...state,
        title: '',
        message: '',
        kind: '',
      };
    default:
      return { ...state };
  }
};

export default reducer;
