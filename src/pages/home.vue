<template>
  <div>
    <vueheader :title="title" :blcktoggle="blcktoggles" @showuserlist="showList" :userimg.sync="showuserimg"></vueheader>
    <childbind :show.sync="showUserList" :userimg.sync="showuserimg"></childbind>
    <div class="containder mt20">
      <protectcell :info="protect1" v-ref:getprtection></protectcell>
      <locking class="mt20" :time="protect2" v-ref:getlocking></locking>
    </div>
  </div>
</template>
<script>
  import vueheader from '../components/header/header.vue';
  import protectcell from '../components/cells/protectcell.vue';
  import locking from '../components/btns/locking.vue';
  import childbind from '../components/childbind/childbind.vue';
  import {getProtections} from '../vuex/action.js';
  export default {
    vuex: {
      actions:{
        getProtections
      },
      getters: {
        protectInfo : state => state.homeModule.protectInfo,
      }
    },
    components: {
      vueheader,
      protectcell,
      locking,
      childbind
    },
    methods: {
      showList(){
        this.showUserList = !this.showUserList;
      },
    },
    data(){
      return {
        title:'使用保护',
        blcktoggles:false,
        protect1:[],
        protect2:[],
        showUserList:false,
        showuserimg:'',
      }
    },
    computed:{
    },
    route: {
      data(transition){
        if(this.protectInfo.length == 0){
          this.$dispatch('show-loading', {
            content: '加载中'
          });
          this.getProtections((result) => {
            this.$dispatch('hide-loading');
             if(result['success']) {
              this.protect1 = [this.protectInfo[0]];
              this.protect2 = [this.protectInfo[1]];
              this.$refs.getprtection.init(this.protect1);
              this.$refs.getlocking.init(this.protect2);
            } else {
              //this.$dispatch('show-globaltip', '获取数据失败');
            }
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>