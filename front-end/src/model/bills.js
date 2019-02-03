import * as billService from '../service/bill';
// import * as cardsService from "../service/cards";
import request from '../util/request';

export default {
  namespace: 'bills',

  state: {
    billList: [],
  },

  effects: {

    *getBillList({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(billService.getBillList);

      yield put({ type: 'saveBill', payload: { billList: rsp.result } });

      return rsp;
    },
    
  },

  reducers: {

    saveBill(state, { payload: { billList } }) {
      return {
        ...state,
        billList,
      }
    },

  },

};
