<template>
  <div>
    <vueheader :title="title"></vueheader>
  <div class="weekly_wrap" v-if="emptyinfo">
    <div class="weekly_list bottom1" name="slidedelect" v-for="item in items" v-if="item != ''">
      <div class="weekly_title">周{{item.week_start_cn}}至周{{item.week_end_cn}}</div>
      <div class="weekly_info" v-for="time in items[$index].time">
         <span>
            {{time.time_start}}
         </span>
         <span>
            <i></i>
         </span>
         <span>
           {{time.time_end}}
         </span>
      </div>
      <div class="delect bottom1" name={{$index}} @click="delect_weekly($index)"><span>删除</span></div>
    </div>
  </div>
  <div class="empty" v-else="emptyinfo">
    <div class="empty_img">
      <img src="../../static/images/appama.png" alt="">
       <p>没有相关应用</p>
    </div>
  </div>
  </div>
</template>
<script>
  import vueheader from '../components/header/header.vue';
  import utils from '../utils/index.js';
  import {getManageStudyStatus,setStudyModel} from '../vuex/action.js';
export default {
  vuex: {
    actions:{
      getManageStudyStatus,
      setStudyModel
    },
    getters:{
      newGetManageStudyStatus : state => state.manageModules.newGetManageStudyStatus,
      newSetStudyModel : state => state.manageModules.newSetStudyModel
    }
  },
  data(){
    return{
      title:'白名单周期',
      emptyinfo:true,
      items:[]
    }
  },
  components: {
    vueheader
  },
  methods: {
    delect_weekly(index){
      let arr = utils.clone(this.items);
      arr.splice(index,1);
      var option = {'week_time':arr};
      this.setStudyModel(option,(result) => {
        if(result['success']) {
          this.items = [''].concat(arr);
        }
      });
    }
  },
  route: {
    data(transition){
        this.getManageStudyStatus((result) => {
          this.items = [];
          if(result['success']) {
            this.items = this.newGetManageStudyStatus.study_model.week_time;
            this.emptyinfo = true;
            //根据type值获取数据
            if(this.newGetManageStudyStatus.study_model.week_time.length == 0){
              this.emptyinfo = false;
            }
          }
        });
      }
  },
}

window.addEventListener('load', function() {
    var initX; //触摸位置
    var moveX; //滑动时的位置
    var X = 0; //移动距离
    var objX = 0; //目标对象位置

    window.addEventListener('touchstart', function(event) {
      var obj = event.target.parentNode.parentNode;
      if (obj.className.indexOf("weekly_list")>-1) {
        initX = event.targetTouches[0].pageX;
        objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
      }
      if (objX == 0) {
        window.addEventListener('touchmove', function(event) {
          var obj = event.target.parentNode.parentNode;
          if (obj.className.indexOf("weekly_list")>-1) {
            moveX = event.targetTouches[0].pageX;
            X = moveX - initX;
            if (X >= 0) {
              obj.style.transform = "translateX(" + 0 + "px)";
            } else if (X < 0) {
              var l = Math.abs(X);
              obj.style.transform = "translateX(" + -l + "px)";
              if (l > 70) {
                l = 70;
                obj.style.transform = "translateX(" + -l + "px)";
              }
            }
          }
        });
      } else if (objX < 0) {
        window.addEventListener('touchmove', function(event) {
          var obj = event.target.parentNode.parentNode;
           if (obj.className.indexOf("weekly_list")>-1) {
            moveX = event.targetTouches[0].pageX;
            X = moveX - initX;
            if (X >= 0) {
              var r = -70 + Math.abs(X);
              obj.style.transform = "translateX(" + r + "px)";
              if (r > 0) {
                r = 0;
                obj.style.transform = "translateX(" + r + "px)";
              }
            } else { //向左滑动
              obj.style.transform = "translateX(" + -70 + "px)";
            }
          }
        });
      }

    });
    window.addEventListener('touchend', function(event) {
      var obj = event.target.parentNode.parentNode;
       if (obj.className.indexOf("weekly_list")>-1) {
        objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
        if (objX > -35) {
          obj.style.transform = "translateX(" + 0 + "px)";
          objX = 0;
        } else {
          obj.style.transform = "translateX(" + -70 + "px)";
          objX = -70;
        }
      }
    });
});
</script>
<style lang="scss" scoped>
.weekly_wrap{
  background:#fff;
  overflow:hidden;
  .weekly_list{
    padding:5px 10px 10px 10px;
    transform: translateX(0px);
    position:relative;
    .weekly_title{
      font-size: 16px;
      color:#797979;
      margin-bottom:5px;
      padding-left:20px;
      background:url(../../static/images/weekly_icon.png) no-repeat scroll left 40%;
      background-size:18px;
    }
    .delect{
      width:70px;
      background:#ef5361;
      text-align: center;
      color:#fff;
      font-size:14px;
      height:100%;
      position:absolute;
      right:-70px;
      top:0px;
      span{
        display:inline-block;
        position:absolute;
        top:50%;
        margin-top: -10px;
        left:50%;
        margin-left: -12px;
      }
    }
    .weekly_info{
      background:#f5f5f5;
      margin-bottom:1px;
      padding:10px 0;
      display:flex;
      span{
        text-align:center;
        font-size: 20px;
        color:#313131;
        position:relative;
        top:5px;
        i{
         display:inline-block;
         font-style:normal;
         width:25px;
         height:25px;
         border-radius:50%;
         background:#fff;
         position:relative;
          &:before{
            content: "";
            display: inline-block;
            transform: rotate(45deg);
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #a5a5a5;
            border-style: solid;
            position: relative;
            position: absolute;
            top: 9px;
            right: 9px;
          }
        }
        b{
          display:inline-block;
          font-weight: normal;
          font-size:15px;
          padding-left:5px;
        }
      }
      span:nth-child(1){
        flex:2;
      }
      span:nth-child(2){
        flex:1;
      }
      span:nth-child(3){
        flex:2;
      }
    }
  }
}
.empty{
  .empty_img{
    position:absolute;
    left:50%;
    top:30%;
    margin-left:-70px;
    img{ width:140px;}
    p{
      text-align:center;
      font-size:16px;
      color:#959595;
      margin-top:30px;
    }
  }
}
</style>