import { AsyncStorage } from 'react-native';
import { delay } from 'redux-saga';
import { takeEvery, call, put, join, fork, race } from 'redux-saga/effects';
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

const signInRequest = params => API.post('/auth/sign_in', params);

function* signIn(action) {
  const task = yield fork(signInRequest, action.params);
  const { response, timeout } = yield race({
    response: join(task),
    timeout: call(delay, API.getGlobalTimeout()),
  });

  if (timeout) {
    yield put({ type: SIGN_IN_FAILURE });
    yield put({
      type: SET_NOTICE,
      message: API.getTimeoutMessage(),
      kind: 'error',
      title: 'Error',
    });
    return;
  }
  if (response.ok) {
    const result = yield response.json();
    if (result.errors) {
      yield put({ type: SIGN_IN_FAILURE });
      yield put({
        type: SET_NOTICE,
        title: 'Error',
        message: result.errors.join('\n'),
        kind: 'error',
      });
    } else {
      yield call(AsyncStorage.setItem, 'access-token', response.headers.get('access-token'));
      yield call(AsyncStorage.setItem, 'client', response.headers.get('client'));
      yield call(AsyncStorage.setItem, 'expiry', response.headers.get('expiry'));
      yield call(AsyncStorage.setItem, 'token-type', response.headers.get('token-type'));
      yield call(AsyncStorage.setItem, 'uid', response.headers.get('uid'));
      yield put({ type: SIGN_IN_SUCCESS, result, response });
    }
  } else if (response.status === 401) {
    yield put({ type: SIGN_IN_FAILURE });
    yield put({
      type: SET_NOTICE,
      title: 'Error',
      message: 'Identidad o clave invalida',
      kind: 'error',
    });
  } else {
    yield put({ type: SIGN_IN_FAILURE });
    yield put({
      type: SET_NOTICE,
      title: 'Error',
      message: API.genericErrorMessage(response.status),
      kind: 'error',
    });
  }
}

const signOutRequest = () => API.delete('/auth/sign_out');

function* signOut() {
  const task = yield fork(signOutRequest);
  const { response, timeout } = yield race({
    response: join(task),
    timeout: call(delay, API.getGlobalTimeout()),
  });

  if (timeout) {
    yield put({ type: SIGN_OUT_FAILURE });
    yield put({
      type: SET_NOTICE,
      message: API.getTimeoutMessage(),
      kind: 'error',
      title: 'Error',
    });
    return;
  }

  if (response.ok || (response.status >= 400 && response.status < 500)) {
    const result = yield response.json();
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
      yield put({ type: SIGN_OUT_FAILURE });
      yield put({
        type: SET_NOTICE,
        message: result.errors.join('\n'),
        kind: 'error',
        title: 'Error',
      });
    }
  } else {
    yield put({ type: SIGN_OUT_FAILURE });
    yield put({
      type: SET_NOTICE,
      title: 'Error',
      message: API.genericErrorMessage(response.status),
      kind: 'error',
    });
  }
}

const validateTokenRequest = () => API.get('/auth/validate_token');

function* validateToken() {
  const clearAuthInfo = {
    type: CLEAR_AUTH_INFO,
    navigateTo: 'Auth',
  };
  try {
    const task = yield fork(validateTokenRequest);
    const { response, timeout } = yield race({
      response: join(task),
      timeout: call(delay, API.getGlobalTimeout()),
    });

    if (timeout) yield put(clearAuthInfo);

    if (response.ok) {
      const result = yield response.json();
      if (result.success) {
        yield put({
          type: VALIDATE_TOKEN_SUCCESS,
          result,
          response,
          navigateTo: 'App',
        });
      } else {
        yield put(clearAuthInfo);
      }
    } else {
      yield put(clearAuthInfo);
    }
  } catch (error) {
    yield put(clearAuthInfo);
  }
}

const recoverPasswordRequest = params => API.post('/users/recover_password', params);

function* recoverPassword(action) {
  try {
    const task = yield fork(recoverPasswordRequest, action.params);
    const { response, timeout } = yield race({
      response: join(task),
      timeout: call(delay, API.getGlobalTimeout()),
    });

    if (timeout) {
      yield put({ type: SIGN_OUT_FAILURE });
      yield put({
        type: SET_NOTICE,
        message: API.getTimeoutMessage(),
        kind: 'error',
        title: 'Error',
      });
    }
    if (response.ok) {
      const result = yield response.json();
      yield put({ type: PASSWORD_RECOVERY_FINISHED });
      if (result.success) {
        yield put({
          type: SET_NOTICE,
          title: 'Éxito',
          message: result.message,
          kind: 'success',
        });
      } else {
        yield put({
          type: SET_NOTICE,
          title: 'Error',
          message: result.errors.join('\n'),
          kind: 'error',
        });
      }
    } else {
      yield put({
        type: SET_NOTICE,
        title: 'Error',
        message: API.genericErrorMessage(),
        kind: 'error',
      });
    }
  } catch (error) {
    // TODO Handle error:q
    // console.log(error);
  }
}
export default function* authSagas() {
  yield takeEvery(SIGN_IN_REQUEST, signIn);
  yield takeEvery(SIGN_OUT_REQUEST, signOut);
  yield takeEvery(VALIDATE_TOKEN_REQUEST, validateToken);
  yield takeEvery(PASSWORD_RECOVERY_REQUEST, recoverPassword);
}
