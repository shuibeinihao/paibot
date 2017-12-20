/**
 * Created by Jared on 16/3/3.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './action';
import homeModule from './modules/homeModules';
import manageModules from './modules/manageModules';
import createLogger from 'vuex/logger';

Vue.use(Vuex);
Vue.config.debug =true;
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules:{
    homeModule,
    manageModules
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
