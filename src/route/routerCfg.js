/**
 * Created by Jared on 16/3/3.
 */
const RouterConfig = function(router){
  router.map({
    '/home':{
      name:'home',
      component:require('../pages/home.vue')
    },
    '/loading':{
      name:'loading',
      component:require('../pages/loading.vue')
    },
   '/manage':{
    name:'manage',
    component:require('../pages/manage.vue')
    },
    '/managelist':{
    name:'managelist',
    component:require('../pages/managelist.vue')
    },
    '/applicationmanage':{
    name:'applicationmanage',
    component:require('../pages/applicationmanage.vue')
    },
    '/recommendlist':{
    name:'recommendlist',
    component:require('../pages/recommendlist.vue')
    },
    '/whitelist':{
    name:'whitelist',
    component:require('../pages/whitelist.vue')
    },
    '/weekly':{
    name:'weekly',
    component:require('../pages/weekly.vue')
    },
    '/': {
      name:'home',
      component:require('../pages/home.vue')
    },
  });

};

module.exports = RouterConfig;
