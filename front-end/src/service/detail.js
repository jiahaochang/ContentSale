import request from '../util/request';

export function getDetailById(id) {
  return request(`/login/detail/${id}`);
}
