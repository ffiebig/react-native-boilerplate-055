import { call, put, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import API from '../services/api';
import { SET_NOTICE } from '../actions/notice';

export function* runDefaultSaga(callRequest, successCallback, failureCallback) {
  try {
    const { response, timeout } = yield race({
      response: call(callRequest.request, callRequest.params),
      timeout: delay(API.getGlobalTimeout()),
    });

    if (timeout) {
      throw new Error(API.getTimeoutMessage());
    }

    if (response.ok) {
      const result = yield response.json();
      yield successCallback(result, response);
    } else {
      throw new Error('Response status not ok');
    }
  } catch (err) {
    yield failureCallback(err);
    yield put({
      type: SET_NOTICE,
      title: 'Error',
      message: err.toString(),
      kind: 'error',
    });
  }
}
