import request from '../util/request';

export function getBillList() {
  return request('/api/bills');
}

