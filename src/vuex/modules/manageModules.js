/**
 * Created by Jared on 16/3/4.
 */
import _ from 'lodash';
import {
  SET_MANAGE_MODEL,
  GET_MANAGE_STUDY_STATUS,
  SET_STUDY_MODEL,
  SET_MANAGE_MODEL_APP,
  SET_STUDY_MODEL_APP,
  GET_APP_SCALE,
  GET_MULTIVARIATE,
  GET_MULTIVARIATE_APP,
  GET_CHILND_INFO,
} from '../mutation-types';

// initial state
const state = {
  newSetManageModel:{},
  newGetManageStudyStatus:{},
  newSetStudyModel:{},
  newSetManageModelApp:{},
  newSetStudyModelApp:{},
  newGetAppScale:{},
  newGetMultivariate:{},
  newGetMultivariateApp:{},
  getchindInfo:{},
}

// mutations
const mutations = {

  [SET_MANAGE_MODEL](state,data){
    state.newSetManageModel = data;
    return state.newSetManageModel;
  },
  [GET_MANAGE_STUDY_STATUS](state,data){
    state.newGetManageStudyStatus = data;
    return state.newGetManageStudyStatus;
  },
  [SET_STUDY_MODEL](state,data){
    state.newSetStudyModel = data;
    return state.newSetStudyModel;
  },
  [SET_MANAGE_MODEL_APP](state,data){
    state.newSetManageModelApp = data;
    return state.newSetManageModelApp;
  },
  [SET_STUDY_MODEL_APP](state,data){
    state.newSetStudyModelApp = data;
    return state.newSetStudyModelApp;
  },
  [GET_APP_SCALE](state,data){
    state.newGetAppScale = data;
    return state.newGetAppScale;
  },
  [GET_MULTIVARIATE](state,data){
    state.newGetMultivariate = data;
    return state.newGetMultivariate;
  },
  [GET_MULTIVARIATE_APP](state,data){
    state.newGetMultivariateApp = data;
    return state.newGetMultivariateApp;
  },
  [GET_CHILND_INFO](state,data){
    state.getchindInfo = data;
    return state.getchindInfo;
  },
};


export default {
  state,
  mutations
}
