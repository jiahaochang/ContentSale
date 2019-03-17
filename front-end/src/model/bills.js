import * as billService from '../service/bill';

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

    *getIdByImageName({ payload }, { call, put }) {
      console.log(payload);
      var postData = {imgUrl : payload};
      const rsp = yield call(billService.postImageNameToGetId, postData);
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
