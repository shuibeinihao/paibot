/**
 * Created by Jared on 16/3/4.
 */
import _ from 'lodash'
import {
  GET_PROTECT_INFO,
  SET_INFO_USE,
  GET_INFO_USE,
  SET_INFO_LOCK,
  GET_INFO_LOCK,
  GET_CHILND_INFO,
} from '../mutation-types'

// initial state
const state = {
  protectInfo:[],
  newProtectInfo:{},
  updteSelectInfo:{},
  setpaibotInfo:{},
  getpaibotInfo:{},
  getchindInfo:{},
}
// mutations
const mutations = {

  [GET_PROTECT_INFO] (state, data) {
    for(var item in data){
      state.protectInfo.push(data[item]);
    }
    return state.protectInfo;
  },

  [SET_INFO_USE](state,data){
    state.newProtectInfo = data
    return state.newProtectInfo;
  },
  [GET_INFO_USE](state,data){
    state.updteSelectInfo = data;
    return state.updteSelectInfo;
  },
  // 获取平板信息
  [SET_INFO_LOCK](state,data){
    state.setpaibotInfo = data;
    return state.setpaibotInfo;
  },
  [GET_INFO_LOCK](state,data){
    state.getpaibotInfo = data;
    return state.getpaibotInfo;
  },
  [GET_CHILND_INFO](state,data){
    state.getchindInfo = data;
    return state.getchindInfo;
  }
};
export default {
  state,
  mutations
}
