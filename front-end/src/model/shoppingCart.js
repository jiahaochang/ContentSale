import * as shoppingCartService from '../service/shoppingCart';

export default {
  namespace: 'shoppingCartList',

  state: {
    shoppingCartContent: [],
  },

  effects: {

    *getContent({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(shoppingCartService.getShoppingCartContent);

      yield put({ type: 'saveContent', payload: { shoppingCartContent: rsp.result } });

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
