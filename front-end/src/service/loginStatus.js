import request from '../util/request';

export function getLoginStatus() {
  var token = localStorage.getItem('authToken');
  return request('/login/get/loginStatus', {
    headers: {
      'authToken': token,
    },
    method: 'GET',
  });
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

export function getLoginInfo() {
  var token = localStorage.getItem('authToken');
  return request('/login/get/login/info', {
    headers: {
      'authToken': token,
    },
    method: 'GET',
  });
}
