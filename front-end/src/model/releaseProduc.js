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
      if(rsp.code==200){
        message.success("发布商品成功");
      }
      return rsp;
    },

  },

  reducers: {

  },

};
