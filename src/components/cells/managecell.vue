<template>
  <div>
  <div class="cells-form top1">
    <div class="cell_switch bottom1">
      <div class="cell_primary">实时管理</div>
      <div class="cell_ft">
        <input class="toggle-switch" type="checkbox" :checked="toggleStatus" @change="toggle">
      </div>
    </div>
    <div v-show="toggleStatus" class="managelist">
      <a v-link="{ path: '/managelist' }">
        <div class="list_l">应用列表</div>
      </a>
    </div>
  </div>
  </div>
</template>
<script>
import {setManageModel} from '../../vuex/action.js';
export default {
  vuex: {
    actions:{
      setManageModel,
    },
    getters: {
      newSetManageModel : state => state.manageModules.newSetManageModel
    }
  },
  props:{
    manageinfo:{type:Object}
  },
  data(){
    return{
      toggleStatus: false
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
      this.setManageModel(status,(result) => {
        this.$dispatch('hide-loading');
        if(result['success']) {
          this.toggleStatus = !this.toggleStatus;
          e.target.checked = !toggles;

          //get学习模式按钮状态
          this.$parent.getManageStudyStatus((result) => {
            if(result['success']) {
              this.$parent.$refs.getstudydata.init(this.$parent.newGetManageStudyStatus.study_model);
            }
          });

        } else {
          e.target.checked = toggles;
          this.toggleStatus = this.toggleStatus;
        }
      });
    },
    init(managedatainfo){
      let isOpen = managedatainfo.is_open;
      if(isOpen == 0){
        this.toggleStatus =  false
      }else{
        this.toggleStatus = true;
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.managelist{
  a{
    display:block;
    overflow:hidden;
    position:relative;
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
  .list_l{
    display:inline-block;
    float:left;
    padding:10px 15px;
  }
}
</style>