import * as detailService from '../service/detail';

export default {

  namespace: 'details',

  state: {
    detail: {},
  },

  effects: {
    *getDetail({ payload }, { call, put }) {
      const rsp = yield call(detailService.getDetailById, payload);
      yield put({
        type: 'saveDetail',
        payload: {
          id: payload,
          data: rsp.result,
        },
      });
      return rsp;
    },

    *addToShoppingCart({ payload }, { call, put }) {
      const rsp = yield call(detailService.addProductToShoppingCart, payload);
      return rsp;
    },

  },

  reducers: {
    saveDetail(state, { payload: { id, data } }) {
      return {
        ...state,
        data,
      }
    },

  },
};
