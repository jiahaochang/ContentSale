import * as loginService from '../service/loginStatus';

export default {
  namespace: 'loginStatus',

  state: {
    loginStatus: '',
  },

  effects: {

    *getLoginStatus({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(loginService.getLoginStatus);

      yield put({ type: 'saveLoginStatus', payload: { loginStatus: rsp.result } });

      return rsp;
    },

  },

  reducers: {

    saveLoginStatus(state, { payload: { loginStatus } }) {
      return {
        ...state,
        loginStatus,
      }
    },

  },

};
