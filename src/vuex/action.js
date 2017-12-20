import * as types from './mutation-types';
import Vue from 'vue';
import config  from '../config';

const getUserInfo = () => ({
  uid: config['uid'],
  token: config['token'],
  uid_children: config['uid_children'],
  appid:config['appid']
});
let page = 1;
let limit = 30;
//获取使用保护数据
export const getProtections = ({ dispatch }, endcall) => {
  if(!config.isLogin) return;
  let data = JSON.stringify(getUserInfo());
  Vue.http.get(config.baseUrl+'/assistant/Protection/getProtections', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.GET_PROTECT_INFO,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//设置保护时间
export const setInfoUse = ({ dispatch },type, endcall) => {
  let str = '',
      strValue = '',
      rest_time= '',
      status = '',
      last_time = '',
      editType ='';

  for(var item in type){
    str = item;
    strValue = type[item];
  }

  if(str == 'status'){
    status = strValue;
  }else if(str == 'last_time'){
    last_time = strValue;
  }else if(str == 'rest_time'){
    rest_time = strValue;
  }
  editType = str;
  if(!config.isLogin) return;
  let datas = Object.assign({
      status:status,
      last_time:last_time,
      rest_time:rest_time,
      type:[editType]
    }, getUserInfo());
  let data = JSON.stringify(datas);
  Vue.http.get(config.baseUrl+'/assistant/Protection/setInfoUse', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.SET_INFO_USE,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//更新已选择项
export const getInfoUse = ({ dispatch }, endcall) => {
  if(!config.isLogin) return;
  let data = JSON.stringify(getUserInfo());
  Vue.http.get(config.baseUrl+'/assistant/Protection/getInfoUse', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.GET_INFO_USE,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//设置锁定平板
export const setInfoLock = ({ dispatch },option, endcall) => {
  if(!config.isLogin) return;
  let time = option.time, status = option.status, editType =[];

  if(!option.time){
    editType = ['status'];
  }else if(option.time){
    editType = ['status','lock_time'];
  };
  let datas = Object.assign({
      status:status,
      lock_time:time || '',
      type:editType
    }, getUserInfo());
  let data = JSON.stringify(datas);

  Vue.http.get(config.baseUrl+'/assistant/Protection/setInfoLock', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.SET_INFO_LOCK,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//获取平板锁定
export const getInfoLock = ({ dispatch }, endcall) => {
  if(!config.isLogin) return;
  let data = JSON.stringify(getUserInfo());
  Vue.http.get(config.baseUrl+'/assistant/Protection/getInfoLock', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.GET_INFO_LOCK,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//应用管理界面初始状态
export const getManageStudyStatus = ({ dispatch }, endcall) => {
  if(!config.isLogin) return;
  let data = JSON.stringify(getUserInfo());
  Vue.http.get(config.baseUrl+'/assistant/AppManage/showManageStudyStatus', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.GET_MANAGE_STUDY_STATUS,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//修改实时管理
export const setManageModel = ({ dispatch }, option, endcall) =>{
  if(!config.isLogin) return;
  let datas = {};
  if(option.status != undefined){
    datas = Object.assign({
      is_open:option.status,
    }, getUserInfo());
  }else if(option.add_app_id != undefined){    datas = Object.assign({
      add_app_id:option.add_app_id,
    }, getUserInfo());
  }else if(option.delete_app_id != undefined){
    datas = Object.assign({
      delete_app_id:option.delete_app_id,
    }, getUserInfo());
  };
  let data = JSON.stringify(datas);
  Vue.http.get(config.baseUrl+'/assistant/AppManage/updateManageModel', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.SET_MANAGE_MODEL,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//修改学习模式
export const setStudyModel = ({ dispatch }, option, endcall) =>{
 if(!config.isLogin) return;
  let datas = {};
  if(option.status != undefined){
    datas = Object.assign({
      is_open:option.status,
    }, getUserInfo());
  }else if(option.week_time != undefined){
    datas = Object.assign({
      week_time:option.week_time,
    }, getUserInfo());
  }else if(option.add_app_id != undefined){
    datas = Object.assign({
      add_app_id:option.add_app_id,
    }, getUserInfo());
  }else if(option.delete_app_id != undefined){
    datas = Object.assign({
      delete_app_id:option.delete_app_id,
    }, getUserInfo());
  };
  let data = JSON.stringify(datas);
  Vue.http.get(config.baseUrl+'/assistant/AppManage/updateStudyModel', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.SET_STUDY_MODEL,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//应用模式管理的应用列表
export const setManageModelApp = ({ dispatch },type, endcall) => {
  if(!config.isLogin) return;
  let page_size,page_num;
  page_size = 100;
  page_num = 1;
  let datas = Object.assign({
      parent_category_id:type,
      page_size:page_size,
      page_num:page_num
    }, getUserInfo());
  let data = JSON.stringify(datas);
  Vue.http.get(config.baseUrl+'/assistant/AppManage/showManageModelApp', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.SET_MANAGE_MODEL_APP,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//学习模式管理的应用列表
export const setStudyModelApp = ({ dispatch },type, endcall) => {
  if(!config.isLogin) return;
  let parent_category_id,page_size,page_num;
  parent_category_id = type;
  page_size = 10;
  page_num = 1;
  let datas = Object.assign({
      parent_category_id:parent_category_id,
      page_size:page_size,
      page_num:page_num
    }, getUserInfo());
  let data = JSON.stringify(datas);
  Vue.http.get(config.baseUrl+'/assistant/AppManage/showStudyModelApp', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.SET_STUDY_MODEL_APP,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//查看孩子设备使用应用类型的时间比
export const getAppScale = ({ dispatch }, endcall) => {
  if(!config.isLogin) return;
  let data = JSON.stringify(getUserInfo());
  Vue.http.get(config.baseUrl+'/assistant/AppManage/getAppScale', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.GET_APP_SCALE,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//查看八大智能
export const getMultivariate = ({ dispatch }, endcall) => {
  if(!config.isLogin) return;
  let data = JSON.stringify(getUserInfo());
  Vue.http.get(config.baseUrl+'/assistant/AppManage/getMultivariate', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.GET_MULTIVARIATE,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//查看孩子设备推荐的八大智能应用
export const getMultivariateApp = ({ dispatch },type, endcall) => {
  if(!config.isLogin) return;
  let multivariate_id,page_size,page_num,children_age;
  multivariate_id = type;
  page_size = 10;
  page_num = 1;
  children_age = 10;
  let datas = Object.assign({
      multivariate_id:multivariate_id,
      page_size:page_size,
      page_num:page_num,
      children_age:children_age
    }, getUserInfo());
  let data = JSON.stringify(datas);
  Vue.http.get(config.baseUrl+'/assistant/AppManage/getMultivariateApp', {data:data,device_id:config.device_id}).then(
    function (resp) {
      if(resp.data.http_status_code==200){
        dispatch(types.GET_MULTIVARIATE_APP,resp.data.data || []),
        endcall({success: true});
      }else {
        endcall({success: false});
      }
  }, function (response) {
    endcall({success: false});
  });
};
//切换孩子账户
export const getchind = ({dispatch}, endcall) => {
  if(!config.isLogin) return;
  let dataChild = JSON.parse(decodeURI(config.cid));
  let datas = [];
  for(let i = 0; i < dataChild.uidlist.length; i++){
    datas.push(dataChild.uidlist[i].uid);
  };
  let info = {uid:datas,type:'paibot'};
  let data = JSON.stringify(info);
  Vue.http.get(config.baseUrl+'/user/device/getDeviceInfo', {data:data}).then(
    function (resp) {
        if(resp.data.http_code == 200) {
            let result = resp.data;
            dispatch(types.GET_CHILND_INFO, result);
            endcall({success: result['http_code']});
        } else {
          endcall({success: false});
        }
    },
    function (response) {
      endcall({success: false});
    }
  )
};









