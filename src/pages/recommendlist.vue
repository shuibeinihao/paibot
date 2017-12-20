
<template>
  <div>
    <vueheader :title="title"  @popmake ="showSlide" :showslidedown="showslidedown" :showslideup="showslideup"></vueheader>
    <div class="containder">
      <recommendcell :items = "newGetMultivariateApp" :emptyinfo="emptyinfo"></recommendcell>
    </div>
    <topslide @selecttext="textcur" v-ref:titletext></topslide>
  </div>
</template>
<script>
  import vueheader from '../components/header/header.vue';
  import recommendcell from '../components/cells/recommendcell.vue';
  import topslide from '../components/mark/topslide.vue';
  import {getMultivariate,getMultivariateApp} from '../vuex/action.js';
  export default {
    vuex: {
      actions:{
        getMultivariate,
        getMultivariateApp
      },
      getters:{
        newGetMultivariate : state => state.manageModules.newGetMultivariate,
        newGetMultivariateApp : state => state.manageModules.newGetMultivariateApp
      }
    },
    components: {
      vueheader,
      recommendcell,
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
        this.getMultivariateApp(type,(result) => {
          if(result['success']) {
            this.emptyinfo = true;
            //根据type值获取数据
            if(this.getMultivariateApp.length == 0){
              this.emptyinfo = false;
            }
          }
        });

      }
    },
    data(){
      return {
        title:'语言智能',
        showLeft:true,
        toggleClose:false,
        emptyinfo:true,
        showslidedown:true,//控制header下拉小三角向下显示
        showslideup:false,//控制header下拉小三角向下显示
        items:[]
      }
    },
    computed:{

    },
    route: {
      data(transition){
        let typeId = location.hash.split('=')[1];
        if(0 < typeId && typeId < 9){
          this.getMultivariateApp(typeId,(result) => {
            if(result['success']) {
              this.emptyinfo = true;
              //根据type值获取数据
              if(this.getMultivariateApp.length == 0){
                this.emptyinfo = false;
              }
            }
          });
          this.getMultivariate((result) => {
           if(result['success']) {
            var names = [];
            for (var i = 0; i < 8; i++){
             names.push({text:this.newGetMultivariate[i].name,type:i+1});
            }
            this.$refs.titletext.infos = names;
            this.title = names[typeId-1].text;
            }
          });
        }else{
          return false;
        };
      }
    },
  }
</script>
<style lang="scss" scoped>
</style>