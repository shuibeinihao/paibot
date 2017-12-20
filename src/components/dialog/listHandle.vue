<template>
  <div class="dialog">
    <div class="dialog-mask" @click="menuClick('取消')" :class="{'toggle': toggleAction}"></div>
    <div class="list top1" :class="{'toggle': toggleAction}">
      <div class="handle-list">
        <div class="dialog-cell bottom1" v-for="text in menus" @click="menuClick(text)">
          {{text}}
        </div>
        <div class="dialog-cell bottom1" @click="menuClick(0)">手动解锁
        </div>
      </div>
      <div class="handle-list">
        <div class="dialog-cell top1" @click="menuClick('取消')">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
  },
  data(){
    return {
      menus:['5分钟','30分钟','60分钟'],
      toggleAction:false,
    }
  },
  methods: {
    menuClick(text){
      this.$dispatch('listclick',text);
    },
    show(){
      this.toggleAction = true;
    },
    hide(){
      this.toggleAction = false;
    }
  }
}
</script>
<style lang="scss" scoped>
  .dialog{
    .dialog-mask{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background:rgba(0,0,0,.1);
      z-index:6;
      display:none;
      &.toggle{
        display:block;
      }
    }
    .list{
      position: fixed;
      left: 0;
      bottom: 0;
      transform: translateY(100%);
      backface-visibility: hidden;
      z-index: 8;
      width: 100%;
      background: #efeff4;
      transition:transform .5s;
      .handle-list{
        background:#fff;
        text-align: center;
        font-size: 18px;
        margin-bottom:5px;
        .dialog-cell{
          position: relative;
          padding: 10px 0;
        }
        &:last-child{
          margin-bottom:0px;
        }
      }
      &.toggle{
        transform: translateY(0);
      }
    }
  }
</style>