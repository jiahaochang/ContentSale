import * as billService from '../service/bill';

export default {
  namespace: 'bills',

  state: {
    billList: [],
  },

  effects: {

    *getBillList({ _ }, { call, put }) {
      const rsp = yield call(billService.queryBillsList());
      console.log(rsp);
      yield put({
        type: 'saveBill',
        payload: { billList: rsp.result }
      });
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
