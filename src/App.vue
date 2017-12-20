<template>
  <div class="wrapper">
    <pt-routerview></pt-routerview>
    <loading v-ref:loading></loading>
  </div>
</template>
<script>
import Vue from 'vue';
import vuerouter from 'vue-router';
import routeview from './route/index.vue';
import loading from './components/loading/loading.vue';
import store from './vuex/store';

export default {
  components:{loading},
  store,
  methods: {
    showLoading(config = {}) {
      this.$refs.loading.show();
    },
    hideLoading() {
      this.$refs.loading.hide();
    }
  },
  events: {
    'show-loading': 'showLoading',
    'hide-loading': 'hideLoading'
  }
}
</script>
<style lang="scss">
body {
  background:#F6F6F6;
 }
 .cells-form{
  width:100%;
  background:#fff;
  position: relative;
  .cell_switch{
  display:flex;
  padding:10px 15px;
  .cell_primary{
    flex:1;
    line-height: 32px;
  }
  .cell_ft{
    width:52px;
    height:32px;
    overflow: hidden;
    }
  }
}
/*开关*/
 .toggle-switch{
  appearance: none;
  position: relative;
  width: 52px;
  height: 32px;
  border: 1px solid #DFDFDF;
  outline: 0;
  border-radius: 16px;
  box-sizing: border-box;
  background: #DFDFDF;
  &:before{
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 30px;
    border-radius: 15px;
    background-color: #FDFDFD;
    transition:transform .3s;
  }
  &:after{
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition:transform .3s;
  }
  &:checked{
    border-color: #04BE02;
    background-color: #04BE02;
    &:before{
      transform: scale(0);
    }
    &:after{
      transform: translateX(20px);
    }
  }
}
</style>