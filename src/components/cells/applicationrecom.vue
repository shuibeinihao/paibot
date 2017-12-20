<template>
  <div class="application_recommend">
    <h2>八大智能应用推荐</h2>
    <div class="recom_con">
      <a v-for="item in items" v-link="{ path: '/recommendlist?id='+ item.multivariate_id}" >
        <span> <img :src="item.icon" /> </span>
        <i>{{item.name}}</i>
      </a>
    </div>
  </div>
</template>
<script>
  import {getMultivariate} from '../../vuex/action.js';
  export default {
  vuex: {
    actions:{
      getMultivariate
    },
    getters:{
      newGetMultivariate : state => state.manageModules.newGetMultivariate
    }
  },
  created: function () {
    this.getMultivariate((result) => {
      if(result['success']) {
        this.items = this.newGetMultivariate;
      }
    });
  },
  data(){
    return{
      items:{}
    }
  }
}
</script>
<style lang="scss" scoped>
  .application_recommend{
    padding:10px 0;
    h2{
      font-size:18px;
      font-weight:normal;
      color:#646464;
      text-align: center;
      padding:10px 0;
    }
    .recom_con{
      overflow:hidden;
      padding-bottom:1px;
      background: #fff;
      a{
        display:inline-block;
        border:1px solid #e1e1e1;
        border-right:none;
        margin-left:-1px;
        margin-bottom: -1px;
        text-align: center;
        padding:15px 0px 5px 0px;
        float:left;
        width:25%;
        i{
          font-style:normal;
          display:block;
          font-size: 16px;
          color:#797979;
        }
        span{
          display:inline-block;
          width:50px;
          height:50px;
          img{
            display:block;
            width:100%;
          }
        }
      }
    }
  }
</style>