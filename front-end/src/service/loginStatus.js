import request from '../util/request';

export function getLoginStatus() {
  return request('/api/get/loginStatus');
}

