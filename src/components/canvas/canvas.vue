<template>
  <div class="canvas">
    <div class="canvash">
      <canvas id="canvas" height="200" width="200"></canvas>
      <div class="yes tc hide">
        孩子的各类应用 <br />时间比例
      </div>
      <div class="no tc hide">
        暂无数据
      </div>
    </div>
    <div class="canvas_con">
      <a href="javascript:;" class="right1" v-for="item in items">
        <span>{{item.appstore_category_name}}<i>{{item.scale}}%</i></span>
        <span><b></b></span>
      </a>
    </div>
    <div class="export_manage top1 bottom1">
      <a v-link="{ path: '/manage'}"><span>管理</span></a>
    </div>
  </div>
</template>
<script>
import {getAppScale} from '../../vuex/action.js';

export default {
  vuex: {
    actions:{
      getAppScale
    },
    getters: {
      newGetAppScale : state => state.manageModules.newGetAppScale,
    }
  },
  methods: {
  },
  ready:function(){
    this.getAppScale((result) => {
      if(result['success']) {
        this.items = this.newGetAppScale;
         //this.items =[{scale:0},{scale:0},{scale:0}]
        let ctx = document.getElementById("canvas").getContext("2d");
        this.dataCtx[3].value = 33;

        if(this.items[0].scale == 0 && this.items[1].scale == 0 && this.items[2].scale == 0){
          $('.no').show();
          this.dataCtx[0].value = 67;
          this.dataCtx[0].color = '#e4e4e4';
          this.dataCtx[3].value = 33;
          let defaults = {
            percentageInnerCutout:72,
            animation:false
          };
          new Chart(ctx).Doughnut(this.dataCtx,defaults);
        }else {
          $('.yes').show();
          for(let i = 0; i < this.items.length; i++){
            this.dataCtx[i].value = this.items[i].scale*73/100;
          };
          let defaults = {
            percentageInnerCutout:72
          };
          new Chart(ctx).Doughnut(this.dataCtx,defaults);
        }
      }
    });
  },
  data(){
    return{
      items:[],
      dataCtx:[
        {
          value:0,
          color:"#ff4b58"
        },
        {
          value : 0,
          color : "#ffb000"
        },
        {
          value : 0,
          color : "#21a1e0"
        },
        {
          value : 0,
          color : "#fff"
        },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
  .canvas{
    background: #fff;
    .canvash{
      height:160px;
      position:relative;
      z-index:0;
      .yes{
        padding-top: 90px;
        color:#666;
        font-size: 14px;
      }
      .no{
        padding-top: 100px;
        color: #999;
        font-size: 18px;
      }
    }
    #canvas{
      transform:rotate(-120deg) translate(-50%, 0);
      transform-origin: 10px 110px;
      position:absolute;
      left:50%;
      top:-10px;
      height:300px;
    }
    .canvas_con{
      display:flex;
      position:relative;
      z-index: 9;
      a{
        flex:1;
        margin:20px 0;
        text-align:center;
        border-right:1px #eee solid;
        b{
          display:inline-block;
        }
        &:nth-child(1){
          color:#ef5361;
          b{
            background:#ef5361;
          }
        }
        &:nth-child(2){
          color:#ffba00;
          b{
            background:#ffba00;
          }
        }
        &:nth-child(3){
          color:#49c0eb;
          border:none;
          b{
            background:#49c0eb;
          }
        }
        span{
          display:block;
          font-size: 16px;
          i{ padding-left:8px;}
          b{ width:5px; height:5px; border-radius:50%;}
          &:nth-child(2){ font-size:0;}
        }
      }
    }
  }
  .export_manage{
    a{
      display:block;
      padding:10px 0;
      position:relative;
      &:before{
        content: "";
        display: inline-block;
        transform: rotate(-45deg);
        height: 6px;
        width: 6px;
        border-width: 0px 2px 2px 0px;
        border-color: #C8C8CD;
        border-style: solid;
        position: relative;
        position: absolute;
        top: 20px;
        right: 18px;
      }
      span{
        font-size:18px;
        background:url(../../../static/images/set_icon.png) no-repeat scroll 15px center;
        background-size:20px 20px;
        display:inline-block;
        padding-left:45px;
      }
    }
  }
</style>