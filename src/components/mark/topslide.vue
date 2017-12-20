<template>
  <div class="mark" @click="topSlideClose" :class="{'toggle' : toggleStatus}">
  <div class="topslide">
    <div class="slide_list_wrap">
    <span class="triange_icon"></span>
    <div class="slide_list bottom1" v-for="info in infos" type={{info.type}} @click="clicktext(info.text,info.type)">
      <span >{{info.text}}</span>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
export default {
  methods: {
    topSlideClose(){
      this.toggleStatus = false;
      //控制父组件headerslide小icon显示
      this.$parent.showslidedown = true;
      this.$parent.showslideup = false;
    },
    clicktext(text,type){
      this.$dispatch('selecttext',text,type);
      this.toggleStatus = false;
    },
    changetext(text){
      this.toggleStatus = !this.toggleStatus;
      for(let i=0; i < this.infos.length; i++){
        if(this.infos[i].text == text){
          $('.slide_list').removeClass('act');
          $('.slide_list').eq(i).addClass('act')
        }
      }
    },
  },
  data(){
    return {
      toggleStatus:false,
      infos:[
        {text:'全部',type:0},
        {text:'游戏',type:1},
        {text:'绘本',type:2},
        {text:'应用',type:3}
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
  .mark{
    position:fixed;
    top:0px;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    z-index:2;
    transform:translate(0,-100%);
    transition:all .5s;
    &.toggle{
      transform:translate(0,50px);
    }
  }
  .topslide{
    width:100%;
    text-align:center;
    .slide_list_wrap{
      background:#f5f5f5;
      position:relative;
      .triange_icon{
        display: inline-block;
        transform: rotate(-45deg) scale(.5);
        height: 12px;
        width: 12px;
        background:#f5f5f5;
        border-width: 2px 2px 0 0;
        border-color: #d2d2d2;
        border-style: solid;
        position: relative;
        position: absolute;
        top: -8px;
        left: 50%;
        margin-left:-4px;
      }
    }
    .slide_list{
      height:40px;
      line-height:40px;
      width:90%;
      margin:0 auto;
      text-align:center;
      font-size:14px;
      &.act{
        color:#b38bd7;
      }
    }
  }
</style>