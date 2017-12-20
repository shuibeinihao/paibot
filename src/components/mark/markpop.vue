<template>
  <div class="markpop" :class="{'toggle': toggleStatus}">
    <div class="real_info">
      <p>实时管理</p>
      <span>实时管理孩子已安装应用</span>
    </div>
    <div class="learn">
      <p>学习模式</p>
      <span>自定义时间段内的可用应用管理，<br>满足学习使用场景</span>
    </div>
    <a href="javascript:;" @click="markClose()"></a>
  </div>
</template>
<script>
export default {
  data(){
    return{
      toggleStatus:false
    }
  },
  methods: {
    markClose(){
      this.toggleStatus = false;
    },
    changetext(){
      this.toggleStatus = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.markpop{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(230,230,230,0.98);
  z-index:10;
  text-align:center;
  transform:translate(0,-100%);
  transition:all .5s;
    &.toggle{
      transform:translate(0,0px);
    }
    .real_info{
      margin-top:100px;
      margin-bottom:50px;}
        p{
          font-size:24px;
          color:#313131;
        }
        span{
          font-size:16px;
          color:#646464;
        }
       a{
        width:55px;
        height:55px;
        border-radius:50%;
        display:block;
        background:#fff url(../../../static/images/mark_close.png) no-repeat scroll center center;
        background-size:30px;
        position:absolute;
        left:50%;
        margin-left:-28px;
        bottom:5%;
      }
}

</style>