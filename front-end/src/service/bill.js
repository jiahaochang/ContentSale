import request from '../util/request';

export function getBillList() {
  return request('/login/bills');
}


export function postImageNameToGetId(data) {
  console.log(JSON.stringify(data));
  return request('/login/post/id/get/imgName', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}
