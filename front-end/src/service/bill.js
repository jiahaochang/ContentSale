import request from '../util/request';

export function queryBillsList() {
  var data=request('/api/bills');
  console.log(data);
  return request('/api/bills');
}

