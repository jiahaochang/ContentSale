import * as releaseService from '../service/releaseProduc';
import { message } from 'antd';

export default {
  namespace: 'release',

  state: {
  },

  effects: {


    *releaseProduct({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(releaseService.postReleaseInfo, payload);
      return rsp;
    },

    *releaseProductByImgUrl({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(releaseService.postReleaseInfo, payload);
      return rsp;
    },

  },

  reducers: {

  },

};
