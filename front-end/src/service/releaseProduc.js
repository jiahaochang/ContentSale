import request from '../util/request';



export function postReleaseInfo(data) {
  // console.log(JSON.stringify(data));
  return request('/login/post/upload/info', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export function postReleaseInfoByType1(data) {
  return request('/login/post/upload/picurl', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export function postModifiedInfo(data) {
  return request('/login/post/modified/info', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export function postModifiedInfoByType1(data) {
  return request('/login/post/modified/type1', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}
