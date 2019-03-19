import * as loginService from '../service/loginStatus';
// import * as cardsService from "../service/cards";
import { message } from 'antd';

export default {
  namespace: 'loginStatus',

  state: {
    loginStatus: '',
  },

  effects: {

    *getLoginStatus({ payload }, { call, put }) {
      const rsp = yield call(loginService.getLoginStatus);
      // console.log(rsp);
      yield put({ type: 'saveLoginStatus', payload: { loginStatus: rsp.result } });
      return rsp;
    },

    *getLoginInfo({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(loginService.getLoginInfo);
      console.log(rsp);
      yield put({ type: 'saveLoginInfo', payload: { loginInfo: rsp.result } });
      return rsp;
    },

    *loginIn({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(loginService.postUserIdAndPwd, payload);
      if(rsp.code==200){
        //console.log("authToken");
        //console.log(rsp.result.authToken);
        localStorage.setItem('authToken', rsp.result.authToken);
      }
      // yield put({ type: 'getLoginStatus' });
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

    saveLoginInfo(state, { payload: { loginInfo } }) {
      return {
        ...state,
        loginInfo,
      }
    },

  },

};
