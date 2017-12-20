<template>
  <div>
    <vueheader :title="title" @popmake="showMake()" :showpop="showpop"></vueheader>
    <div class="containder mt20">
      <managecell :manageinfo="managedata" v-ref:getmanagedata></managecell>
      <div class="mt20">
      <realcell :studyinfo="studydata" v-ref:getstudydata></realcell>
      </div>
    </div>
    <markpop v-ref:titletext></markpop>
  </div>
</template>
<script>
  import vueheader from '../components/header/header.vue';
  import managecell from '../components/cells/managecell.vue';
  import realcell from '../components/cells/realcell.vue';
  import markpop from '../components/mark/markpop.vue';
  import {getManageStudyStatus} from '../vuex/action.js';
  export default {
  vuex: {
    actions:{
      getManageStudyStatus
    },
    getters:{
      newGetManageStudyStatus : state => state.manageModules.newGetManageStudyStatus
    }
  },
    components: {
      vueheader,
      managecell,
      realcell,
      markpop
    },
    methods: {
      showMake(){
        this.$refs.titletext.changetext();
      }
    },
    data(){
      return {
        title:'应用管理',
        showLeft:true,
        toggleClose:false,
        managedata:{},
        studydata:{},
        //控制顶部帮助按钮的显示
        showpop:true
      }
    },
    route: {
      data(transition){
        this.getManageStudyStatus((result) => {
          if(result['success']) {
            this.managedata = this.newGetManageStudyStatus.manage_model;
            this.studydata = this.newGetManageStudyStatus.study_model;
            this.$refs.getmanagedata.init(this.managedata);
            this.$refs.getstudydata.init(this.studydata);
          }
        });
      }
    },
  }
</script>
<style lang="scss" scoped>
</style>