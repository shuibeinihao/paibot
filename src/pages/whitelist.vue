
<template>
  <div>
    <vueheader :title="title"  @popmake = "showSlide" :showslidedown="showslidedown" :showslideup="showslideup"></vueheader>
    <div class="containder mt20">
      <whitelistcell :items = "newSetStudyModelApp" :emptyinfo="emptyinfo"></whitelistcell>
    </div>
    <topslide @selecttext = "textcur" v-ref:titletext></topslide>
  </div>
</template>
<script>

  import vueheader from '../components/header/header.vue';
  import whitelistcell from '../components/cells/whitelistcell.vue';
  import topslide from '../components/mark/topslide.vue';
  import {setStudyModelApp} from '../vuex/action.js';
  export default {
    vuex: {
      actions:{
        setStudyModelApp
      },
      getters: {
        newSetStudyModelApp : state => state.manageModules.newSetStudyModelApp
      }
    },
    components: {
      vueheader,
      whitelistcell,
      topslide
    },
    methods: {
      showSlide(){
        var text =this.title;
        this.$refs.titletext.changetext(text);
        //控制headerslide三角icon
        this.showslidedown = !this.showslidedown;
        this.showslideup = !this.showslideup;
      },
      textcur(text,type){
        this.title = text;
        this.toggleClose = false;
        //控制headerslide三角icon
        this.showslidedown = true;
        this.showslideup = false;
        this.setStudyModelApp(type,(result) => {
          if(result['success']) {
              this.emptyinfo = true;
            //根据type值获取数据
            if(this.newSetStudyModelApp.length == 0){
              this.emptyinfo = false;
            }
          }
        });
      }
    },
    data(){
      return {
        title:'全部',
        showLeft:true,
        toggleClose:false,
        emptyinfo:true,
        showslidedown:true,//控制header下拉小三角向下显示
        showslideup:false,//控制header下拉小三角向下显示
        items:[]
      }
    },
    route: {
      data(transition){
       this.setStudyModelApp(0,(result) => {
           if(result['success']) {
            this.emptyinfo = true;
            //根据type值获取数据
            if(this.newSetStudyModelApp.length == 0){
              this.emptyinfo = false;
            }
          }
        });
      }
    },
  }
</script>
<style lang="scss" scoped>
</style>