<template>
  <div class="cells-form top1">
    <div class="cell_switch bottom1">
      <div class="cell_primary">学习模式</div>
      <div class="cell_ft">
        <input class="toggle-switch" type="checkbox" :checked="toggleStatus" @change="toggle">
      </div>
    </div>
    <div v-show="toggleStatus" class="cell-menu">
      <div class="export_white bottom1">
        <a v-link = "{ path: '/whitelist'}">白名单应用列表</a>
      </div>
       <div class="export_white bottom1">
        <a v-link = "{ path: '/weekly'}">周期<span>{{weekly_num}}</span></a>
      </div>
    </div>
  </div>
  <div></div>
</template>
<script>
import {setStudyModel,getManageStudyStatus} from '../../vuex/action.js';
export default {
   vuex: {
    actions:{
      setStudyModel,
      getManageStudyStatus
    },
    getters: {
      newSetStudyModel : state => state.manageModules.newSetStudyModel,
      newGetManageStudyStatus : state => state.manageModules.newGetManageStudyStatus
    }
  },
  props:{
    studyinfo:{type:Object}
  },
  data(){
    return{
      toggleStatus: false,
      weekly_num:""
    }
  },
  methods: {
     // 开启或关闭使用限制
    toggle(e) {
      let toggles = e.target.checked;
      let status;
      if(toggles){
        status = {status:1};
      }else{
        status = {status:0};
      };
      this.$dispatch('show-loading', {
        content: '设置中'
      });
      this.setStudyModel(status,(result) => {
        this.$dispatch('hide-loading');
        if(result['success']) {
          this.toggleStatus = !this.toggleStatus;
          e.target.checked = !toggles;

          //get实时管理按钮状态
          this.$parent.getManageStudyStatus((result) => {
            if(result['success']) {
              this.$parent.$refs.getmanagedata.init(this.$parent.newGetManageStudyStatus.manage_model);
            }
          });

        } else {
          e.target.checked = toggles;
          this.toggleStatus = this.toggleStatus;
        }
      });
    },
    //自动执行该函数
    init(studydatainfo){
      let infoStatus = studydatainfo.is_open;
      let weekly_num = studydatainfo.week_time_count;
      this.weekly_num = weekly_num;
      if(infoStatus == 0){
        this.toggleStatus =  false
      }else{
        this.toggleStatus = true;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cell-menu{
  .export_white{
    a{
      display:block;
      padding:10px 15px;
      cursor: pointer;
      position:relative;
      span{
        display:inline-block;
        position:absolute;
        top:11px;
        right:30px;
        color:#313131;
        font-size:15px;
      }
      &:before{
        content: "";
        display: inline-block;
        transform: rotate(-45deg);
        height: 6px;
        width: 6px;
        border-width: 0px 2px 2px 0px;
        border-color: #C8C8CD;
        border-style: solid;
        position: relative;
        position: absolute;
        top: 18px;
        right: 18px;
      }
    }
  }
}
</style>