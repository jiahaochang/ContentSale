import request from '../util/request';

export function getBillList() {
  var data = request('/api/bills');
  console.log(data);
  return request('/api/bills');
}

