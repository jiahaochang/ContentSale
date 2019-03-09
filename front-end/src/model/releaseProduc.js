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
      const rsp = yield call(releaseService.postReleaseInfoByType1, payload);
      return rsp;
    },

    //保存修改过的商品信息,通过上传图片的方式
    *saveModifiedProduct({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(releaseService.postModifiedInfo, payload);
      return rsp;
    },

    //保存修改过的商品信息,通过图片url的方式
    *saveModifiedProductByImgUrl({ payload }, { call, put }) {
      console.log(payload);
      const rsp = yield call(releaseService.postModifiedInfoByType1, payload);
      return rsp;
    },

  },

  reducers: {

  },

};
