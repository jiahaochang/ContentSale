import request from '../util/request';

export function getDetailById(id) {
  return request(`/login/detail/${id}`);
}

export function addProductToShoppingCart(data) {
  return request(`/login/add/to/shopping/cart`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getOriginPriceById(id) {
  return request(`/login/get/origin/price/${id}`);
}
