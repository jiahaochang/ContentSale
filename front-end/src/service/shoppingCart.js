import request from '../util/request';

export function getShoppingCartContent() {
  return request('/api/shoppingCarts');
}
