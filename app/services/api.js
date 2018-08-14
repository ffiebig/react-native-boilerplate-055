import store from '../config/store';
import { API_CONFIG } from '../config/configurations';

const url = () => (API_CONFIG.url + API_CONFIG.version);
const globalTimeout = API_CONFIG.timeout;
const timeoutMessage =
  'Está tardando demasiado, verifica tu conexión a internet e intenta nuevamente';

export default class API {
  static getGlobalTimeout() {
    return globalTimeout;
  }
  static getTimeoutMessage() {
    return timeoutMessage;
  }
  static genericErrorMessage(status) {
    return status === 404 ? 'Recurso no encontrado' : 'Intentelo más tarde';
  }
  static get(route) {
    return fetch(url() + route, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': store.getState().auth.headers.accessToken,
        client: store.getState().auth.headers.client,
        uid: store.getState().auth.headers.uid,
      },
    });
  }
  static post(route, params = {}) {
    return fetch(url() + route, {
      method: 'POST',
      mode: 'CORS',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': store.getState().auth.headers.accessToken,
        client: store.getState().auth.headers.client,
        uid: store.getState().auth.headers.uid,
      },
      body: JSON.stringify(params),
    });
  }
  static delete(route) {
    return fetch(url() + route, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': store.getState().auth.headers.accessToken,
        client: store.getState().auth.headers.client,
        uid: store.getState().auth.headers.uid,
      },
    });
  }
}
