import * as shoppingCartService from '../service/shoppingCart';

export default {
  namespace: 'shoppingCartList',

  state: {
    shoppingCartContent: [],
  },

  effects: {

    *getContent({ payload }, { call, put }) {
      // console.log(payload);
      const rsp = yield call(shoppingCartService.getShoppingCartContent);
      yield put({ type: 'saveContent', payload: { shoppingCartContent: rsp.result } });
      return rsp;
    },

    *buy({ payload }, { call, put }) {
      const rsp = yield call(shoppingCartService.buyProducts, payload);
      return rsp;
    },

    *deleteProductFromShoppingCart({ payload }, { call, put }) {
      const rsp = yield call(shoppingCartService.deleteOneFromShoppingCart, payload);
      return rsp;
    },

    *changeProductNumInshoppingCart({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(shoppingCartService.changeProductNum, payload);
      return rsp;
    },

  },

  reducers: {

    saveContent(state, { payload: { shoppingCartContent } }) {
      return {
        ...state,
        shoppingCartContent,
      }
    },

  },

};
