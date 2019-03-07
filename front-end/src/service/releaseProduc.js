import request from '../util/request';



export function postReleaseInfo(data) {
  console.log(JSON.stringify(data));
  return request('/login/post/upload/info', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}


