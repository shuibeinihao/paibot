<template>
  <div class="nav-bar" :class="{'nav-toggle': show}">
    <ul>
      <li class="item" :class="{'active': isHome}" @click="toggleNav" >
        <a v-link="{name:'home'}"  href="javascript:;">概况</a>
      </li>
      <li class="item" :class="{'active': isResolve}" @click="toggleNav">
        <a v-link="{name:'resolve'}" href="javascript:;">内容过滤</a>
      </li>
      <li class="item" :class="{'active': isFeedback}" @click="toggleNav">
        <a v-link="{name:'feedback'}" href="javascript:;">屏蔽反馈</a>
      </li>
    </ul>
  </div>
</template>
<script>
import config from '../../config'
export default{
      props:{
        show:{
          type:Boolean,
          required:true,
          twoWay: true
        },
        isHome:{
          type:Boolean,
          default:false
        },
        isResolve:{
          type:Boolean,
          default:false
        },
        isFeedback:{
          type:Boolean,
          default:false
        }

      },
    methods:{
      toggleNav(){
        this.show=false
      }
    },
    computed: {
        getQuery() {
            return {
              'token': config.token,
              'uid': config.uid,
              'uid_children': config.uid_children
            };
        }
    }
  }

</script>
<style lang="scss" scoped>
  .nav-bar{
    position:fixed;
    background:#fff;
    left: 0;
    top: 50px;
    width:100%;
    bottom:0;
    opacity:0;
    z-index:0;
    transform: translate(0, -100%);
    backface-visibility: hidden;
    transition: all .5s;
    &.nav-toggle{
      transform: translate(0,0);
      opacity: 1;
      z-index: 3;
    }
    ul{
      list-style: none;
      position: absolute;
      width:80%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .item{
        color: #333;
        text-align: center;
        position: relative;
        a{
          display:block;
          width: 100%;
          height: 80px;
          line-height: 80px;
          color: #333;
        }
        &.active a{
          color: #9a5bcd;
        }
        &:after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #ccc;
          transform: scaleY(.5);
        }
      }
    }
  }
</style>
