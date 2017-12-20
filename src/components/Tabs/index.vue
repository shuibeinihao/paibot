<template>
  <div class="nav-tab">
    <div class="fixed">
      <div class="list" v-bind:class="tab.active?'active':''" v-for="tab in tabs" @click="dispatchEvent('exchange-tab',tab.id)">
        {{tab.title}}
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:['tabs'],
    methods:{
      dispatchEvent(event, payload) {
        this.$dispatch(event, payload);
      },
    }
  }
</script>
<style lang="scss" scoped>
  .nav-tab{
    width: 100%;
    height:48px;
    background:#fff;
    font-size: 16px;
    .fixed{
      width: 100%;
      height:48px;
      background:#fff;
      line-height: 40px;
      display:flex;
      position:fixed;
      left:0;
      top:50px;
      z-index: 2;
      .list{
        flex:1;
        text-align: center;
        color:#bbb;
        &.active{
          border-bottom:solid 2px #8c3dc3;
          color:#555;
        }
        /*position:relative;
        &:after{
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          width: 1px;
          height:100%;
          background:#ccc;
          transform: scaleX(0.5);
        }
        &:last-child:after{
          width:0px;
        }*/
      }
      &:after{
        content: "";
        position: absolute;
        left:0;
        top: 48px;
        width: 100%;
        height:1px;
        background:#ccc;
        transform: scaleY(0.5);
      }
    }
  }
</style>
