import { AsyncStorage } from 'react-native';
import { takeEvery, call, put } from 'redux-saga/effects';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  PASSWORD_RECOVERY_FINISHED,
  PASSWORD_RECOVERY_REQUEST,
  VALIDATE_TOKEN_REQUEST,
  VALIDATE_TOKEN_SUCCESS,
  CLEAR_AUTH_INFO,
} from '../actions/auth';
import { SET_NOTICE } from '../actions/notice';
import API from '../services/api';
import { runDefaultSaga } from './default';

// SIGN IN
const signInRequest = params => API.post('/auth/sign_in', params);
function* signInSuccessCallback(result, response) {
  if (result.errors) {
    throw new Error(result.errors.join('\n'));
  } else {
    yield call(AsyncStorage.setItem, 'access-token', response.headers.get('access-token'));
    yield call(AsyncStorage.setItem, 'client', response.headers.get('client'));
    yield call(AsyncStorage.setItem, 'expiry', response.headers.get('expiry'));
    yield call(AsyncStorage.setItem, 'token-type', response.headers.get('token-type'));
    yield call(AsyncStorage.setItem, 'uid', response.headers.get('uid'));
    yield put({ type: SIGN_IN_SUCCESS, result, response });
  }
}
function* signInFailureCallback() {
  yield put({
    type: SIGN_IN_FAILURE,
  });
}
function* signIn(action) {
  yield runDefaultSaga(
    { request: signInRequest, params: action.params },
    signInSuccessCallback,
    signInFailureCallback,
  );
}

// SIGN OUT
const signOutRequest = () => API.delete('/auth/sign_out');
function* signOutSuccessCallback(result) {
  if (result.success) {
    yield call(AsyncStorage.removeItem, 'access-token');
    yield call(AsyncStorage.removeItem, 'client');
    yield call(AsyncStorage.removeItem, 'expiry');
    yield call(AsyncStorage.removeItem, 'token-type');
    yield call(AsyncStorage.removeItem, 'uid');
    yield put({ type: SIGN_OUT_SUCCESS });
    yield put({
      type: SET_NOTICE,
      message: 'Sesión cerrada corectamente',
      kind: 'success',
      title: 'Éxito',
    });
  } else {
    throw new Error(result.errors.join('\n'));
  }
}
function* signOutFailureCallback() {
  yield put({ type: SIGN_OUT_FAILURE });
}
function* signOut() {
  yield runDefaultSaga({ request: signOutRequest }, signOutSuccessCallback, signOutFailureCallback);
}

// VALIDATE TOKENS
const validateTokenRequest = () => API.get('/auth/validate_token');
function* validateTokensSuccessCallback(result, response) {
  if (result.success) {
    yield put({
      type: VALIDATE_TOKEN_SUCCESS,
      result,
      response,
      navigateTo: 'App',
    });
  } else {
    throw new Error(response.errors.join('\n'));
  }
}
function* validateTokensFailureCallback() {
  yield put({ type: CLEAR_AUTH_INFO, navigateTo: 'Auth' });
}
function* validateToken() {
  yield runDefaultSaga(
    { request: validateTokenRequest },
    validateTokensSuccessCallback,
    validateTokensFailureCallback,
  );
}

// RECOVER PASSWORD
const recoverPasswordRequest = params => API.post('/users/recover_password', params);
function* recoverPasswordSuccessCallback(result) {
  yield put({ type: PASSWORD_RECOVERY_FINISHED });
  if (result.success) {
    yield put({
      type: SET_NOTICE,
      title: 'Éxito',
      message: result.message,
      kind: 'success',
    });
  } else {
    throw new Error(result.errors.join('\n'));
  }
}
function* recoverPasswordFailureCallback() {
  // Error handled by runDefaultSaga
  yield null;
}
function* recoverPassword(action) {
  yield runDefaultSaga(
    { request: recoverPasswordRequest, params: action.params },
    recoverPasswordSuccessCallback,
    recoverPasswordFailureCallback,
  );
}

// DEFINE authSagas
export default function* authSagas() {
  yield takeEvery(SIGN_IN_REQUEST, signIn);
  yield takeEvery(SIGN_OUT_REQUEST, signOut);
  yield takeEvery(VALIDATE_TOKEN_REQUEST, validateToken);
  yield takeEvery(PASSWORD_RECOVERY_REQUEST, recoverPassword);
}
