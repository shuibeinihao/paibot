<template>
  <div>
    <vueheader :title="title" @showuserlist="showList" :userimg.sync="showuserimg"></vueheader>
    <childbind :show.sync="showUserList" :userimg.sync="showuserimg"></childbind>
    <div class="containder">
      <appcanvas v-ref:proportion></appcanvas>
      <applicationrecom></applicationrecom>
    </div>
  </div>
</template>
<script>
  import vueheader from '../components/header/header.vue';
  import appcanvas from '../components/canvas/canvas.vue';
  import applicationrecom from '../components/cells/applicationrecom.vue';
  import childbind from '../components/childbind/childbind.vue';
  export default {
    components: {
      vueheader,
      appcanvas,
      applicationrecom,
      childbind
    },
    methods: {
      showList(){
        this.showUserList = !this.showUserList;
      },
    },
    data(){
      return {
        title:'应用管理',
        showUserList:false,
        showuserimg:'',
      }
    },
    route: {
      data(transition){
      }
    },
  }
</script>
<style lang="scss" scoped>
</style>