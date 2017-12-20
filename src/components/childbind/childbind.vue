<template>
  <div class="child-bar" :class="{'toggle': show}" >
    <div class="title"><span @click="closechild">取消</span>选择孩子账户</div>
    <div class="list">
      <ul>
        <li v-for="item in items">
          <a :href="item.url">
            <img  v-bind:src="item.avatar">
            <span>{{item.name}}</span>
            <i class="" :class="{'putao_icon_success_no_circle':item.active}"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import config from '../../config/index.js';
import utils from '../../utils/index.js';
export default{
  props:{
   show:{
      type:Boolean,
      required:true,
      twoWay: true
    },
    userimg:{
      type:String,
      required:true,
      twoWay: true
    },
  },
  ready:function(){
    this.items = JSON.parse(localStorage.getItem('childrenlist')).userlist;
    console.log(this.items)
    this.items.map(function(item){
      item.active = false;
    });
    for(let i = 0; i < this.items.length; i++){
      let urlObj = utils.getQueryList(location.href);
      let option = {
        token:urlObj.token,
        appid:urlObj.appid,
        uid : urlObj.uid,
        uid_children : this.items[i].uid,
        device_id: this.items[i].device_id,
      };
      this.items[i].url =utils.setQueryStringURL(option);
      if(this.items[i].avatar == ''){
        this.items[i].avatar= 'http://mall.file.putaocdn.com/file/371d81ef9e84aa33975fb214968e00df3c2f6bd6.png';
      }else{
        this.items[i].avatar = 'http://account.file.dev.putaocloud.com/file/' + this.items[i].avatar;
      }
      if(config['uid_children'] == this.items[i].uid){
        this.items[i].active = true;
        this.userimg = this.items[i].avatar;
        this.items[i].url = "javascript:;";
      }
    }
  },
  methods:{
    closechild(){
      this.show = false;
    },
    openchild(){
      this.show = true;
    },
  },
  data(){
    return{
      items:[],
    }
  }
}
</script>
<style lang="scss" scoped>
.child-bar{
    position:fixed;
    background:#fff;
    left: 0;
    top: 0px;
    width:100%;
    bottom:0;
    z-index:10;
    height:100%;
    transform: translate(0, -100%);
    backface-visibility: hidden;
    transition: all .5s;
    &.toggle{
      transform: translate(0,0);
    }
    .title{
      width:100%;
      height:48px;
      line-height: 48px;
      position: relative;
      text-align: center;
      font-size:18px;
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
      span{
        width:50px;
        display:block;
        position: absolute;
        height:48px;
        left:0;
        top:0;
        font-size:16px;
        color: #999;
      }
    }
    .list{
      width:100%;
      height:calc(100% - 50px);
      ul{
        overflow-y: scroll;
        height: 100%;
        li{
          padding:10px;
          position: relative;
          line-height: 40px;
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
          a{
            display:flex;
            color:#555;
            img{
              width:40px;
              height:40px;
              border-radius:50%;
              margin-right:10px;
            }
            span{
              flex:1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            i{
              width:25px;
              &.putao_icon_success_no_circle:before{
                color:#a96ed5;
                font-size:20px;
              }
            }
          }
        }
      }
    }
  }
</style>
