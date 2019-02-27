import * as loginService from '../service/loginStatus';
// import * as cardsService from "../service/cards";

export default {
  namespace: 'loginStatus',

  state: {
    loginStatus: '',
  },

  effects: {

    *getLoginStatus({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(loginService.getLoginStatus);
      console.log(rsp);
      yield put({ type: 'saveLoginStatus', payload: { loginStatus: rsp.result } });
      return rsp;
    },

    *loginIn({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(loginService.postUserIdAndPwd, payload);
      if(rsp.code==200){
        console.log("token");
        console.log(rsp.result.authToken);
        localStorage.setItem('token', rsp.result.authToken);
      }
      yield put({ type: 'getLoginStatus' });
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
