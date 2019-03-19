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

    /**getOriginPrice({ payload }, { call, put }) {
      const rsp = yield call(detailService.getOriginPriceById, payload);
      yield put({
        type: 'saveOriginPrice',
        payload: {
          id: payload,
          originPrice: rsp.result,
        },
      });
      return rsp;
    },*/

  },

  reducers: {
    saveDetail(state, { payload: { id, data } }) {
      return {
        ...state,
        data,
      }
    },

    /*saveOriginPrice(state, { payload: { id, originPrice } }) {
      return {
        ...state,
        originPrice,
      }
    },*/

  },
};
