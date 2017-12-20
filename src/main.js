import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig  from './route/routerCfg'
import ajaxplugin from 'vue-resource'
import App from './App.vue'
import config from './config'
import utils from './utils';

const token = (utils.getQueryString('token') || []).pop();
const uid = (utils.getQueryString('uid') || []).pop();
const uid_children = (utils.getQueryString('uid_children') || []).pop();
const appid = (utils.getQueryString('appid') || []).pop();
const device_id = (utils.getQueryString('device_id') || []).pop();
const cid = (utils.getQueryString('cid') || []).pop();

if(!(token && uid && appid)) {
    alert('请先登录');
} else {
    config.token = token;
    config.uid = uid;
    config.uid_children = uid_children;
    config.appid = appid;
    config.device_id = device_id;
    config.isLogin = true;
    config.cid = cid;
}

var FastClick = require('fastclick');
FastClick.attach(document.body);

Vue.use(VueRouter);
Vue.use(ajaxplugin);
Vue.config.debug = true;
var router = new VueRouter({
//     history:true,
//     saveScrollPosition:false,
    hashbang: true,
    history: false,
    saveScrollPosition: false,
    transitionOnLoad: false
});
routerConfig(router);

router.start(App,'#app');

