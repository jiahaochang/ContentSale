import request from '../util/request';

export function queryList() {
  return request('/login/unpurchased');
}

export function deleteOne(id) {
  return request(`/api/unpurchased/${id}`, {
    method: 'DELETE'
  });
}

export function addOne(data) {
  return request('/api/unpurchased/add', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getStatistic(id) {
  return request(`/api/unpurchased/${id}/statistic`);
}
