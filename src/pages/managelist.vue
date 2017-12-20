
<template>
  <div>
    <vueheader :title="title"  @popmake = "showSlide" :showslidedown="showslidedown" :showslideup="showslideup"></vueheader>
    <div class="containder mt20">
      <managelistcell  :items = "newSetManageModelApp" :emptyinfo="emptyinfo"></managelistcell>
    </div>
    <topslide :infos = "newGetAppScale" @selecttext="textcur" v-ref:titletext></topslide>
  </div>
</template>
<script>

  import vueheader from '../components/header/header.vue';
  import managelistcell from '../components/cells/managelistcell.vue';
  import topslide from '../components/mark/topslide.vue';
  import {setManageModelApp} from '../vuex/action.js';
  export default {
    vuex: {
      actions:{
        setManageModelApp
      },
      getters: {
        newSetManageModelApp : state => state.manageModules.newSetManageModelApp,
      }
    },
    components: {
      vueheader,
      managelistcell,
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

        this.setManageModelApp(type,(result) => {
          if(result['success']) {
              this.emptyinfo = true;
            //根据type值获取数据
            if(this.newSetManageModelApp.length == 0){
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
        items:[{
           icon: '/static/images/appama.png',
           name:'显示这个应用的名称显示这个应用的名称',
           dedescriptionsc:'这里显示应用的简介字数控制在两行即可这里显示应用的简介字数控制在两行即可'
        },
        {
           icon: '/static/images/appama.png',
           name:'显示这个应用的名称显示这个应用的名称',
           description:'这里显示应用的简介字数控制在两行即可这里显示应用的简介字数控制在两行即可'
        }]
      }
    },
    computed:{

    },
    route: {
      data(transition){
        this.setManageModelApp(0,(result) => {
          if(result['success']) {
            this.emptyinfo = true;
            //根据type值获取数据
            if(this.newSetManageModelApp.length == 0){
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