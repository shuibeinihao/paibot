import Vue from 'vue';
import config  from '../config/index.js';
const getUserInfo = () => ({
  uid: config['uid'],
  token: config['token'],
  uid_children: config['uid_children'],
  appid:config['appid']
});
let device_id = '';
//获取设备id
export const getDeviceId = (elment,callback) => {
  // 第一个ajax获取设备id
  let data = JSON.stringify(getUserInfo());
  Vue.http.post(config.baseUrl+'/assistant/Protection/getDeviceId',{data:data}).then(
    function (resp) {
      if(resp.data.http_status_code == 200){
        callback(resp.data.data[0].device_id);
      }
    },
    function (response){
      return false
    }
  )
};

