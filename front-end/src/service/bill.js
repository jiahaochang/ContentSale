import request from '../util/request';

export function getBillList() {
  return request('/login/bills');
}

