import request from '../util/request';

export function getDetailById(id) {
  return request(`/api/detail/${id}`);
}
