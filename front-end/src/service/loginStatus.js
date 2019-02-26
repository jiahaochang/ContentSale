import request from '../util/request';

export function getLoginStatus() {
  return request('/api/get/loginStatus');
}

export function postUserIdAndPwd(data) {
  console.log(JSON.stringify(data));
  return request('/login/post/userId/and/pwd', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}
