import request from '../util/request';

export function getShoppingCartContent() {
  return request('/login/shoppingCarts');
}


export function buyProducts() {
  return request('/login/buy');
}
