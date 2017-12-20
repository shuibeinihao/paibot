<template>
  <div class="header">
    <div class="titlebar bottom1">
      <a :showLeft="showLeft" class="icon" href="javascript:;" @click = "btnback">
        <i class="back"></i>
      </a>
      <a href="javascript:;" class="title" @click="events">{{title}}<i :class="{'managehelp':showpop,'slidetriangedown':showslidedown,'slidetriangeup':showslideup}"></i></a>
      <a class="userimg icon" href="javascript:;" @click="showUserList"><img v-if="userimg" :src="userimg"></a>
    </div>
  </div>
</template>

<script>
export default{
  props:['showLeft','title','showRight','showpop','showslidedown','showslideup','userimg'],
  methods:{
    dispatchEvent(){
      this.$dispatch('show-nav');
    },
    events(){
      this.$dispatch('popmake');
    },
    btnback(){
      if(this.$route.name == 'applicationmanage' || this.$route.name == 'home'){
        location.href= 'http://www.putao.com';
      }else{
        history.go(-1);
      }
    },
    showUserList(){
      this.$dispatch('showuserlist');
    },
  }
}
</script>
<style lang="scss" scoped>
  .header{
    height:50px;
    width:100%;
    background:#fff;
    position: relative;
    z-index: 2;
    .titlebar{
      width:100%;
      height:50px;
      background:#fff;
      position:fixed;
      top:0;
      left:0;
      display:flex;
      z-index: 4;
      a{
        outline: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        &.icon{
          width:40px;
          height:100%;
          &.userimg{
            img{
              margin-top: 5px;
              width:35px;
              height:35px;
              border-radius:50%;
            }
          }
          i.back{
            width:20px;
            height:30px;
            vertical-align: middle;
            display:inline-block;
            position: relative;
            color:#995acc;
            left:5px;
            right:5px;
            top:5px;
            &:after{
              content: '';
              width: 15px;
              height: 3px;
              position: absolute;
              bottom: 0;
              left: 0px;
              box-shadow: inset 0 0 0 25px;
              transform-origin: right;
              transform:rotate(45deg);
            }
            &:before{
              content: '';
              width: 15px;
              height: 3px;
              transform:rotate(-45deg);
              position: absolute;
              top: 7px;
              left:0px;
              box-shadow: inset 0 0 0 25px;
              transform-origin: right;
            }
          }
        }
        &.title{
          flex:1;
          line-height: 48px;
          text-align: center;
          position:relative;
          .managehelp{
            display:inline-block;
            font-style:normal;
            width:13px;
            height:13px;
            background:url(../../../static/images/managehelp_icon.png) no-repeat;
            background-size:cover;
            margin-left:5px;
            position:absolute;
            top:18px;
          }
          .slidetriangedown{
            content: "";
            display: inline-block;
            transform: rotate(135deg);
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #C8C8CD;
            border-style: solid;
            position: absolute;
            top: 19px;
            margin-left: 5px;
          }
          .slidetriangeup{
            content: "";
            display: inline-block;
            transform: rotate(-45deg);
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #C8C8CD;
            border-style: solid;
            position: absolute;
            top: 22px;
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
