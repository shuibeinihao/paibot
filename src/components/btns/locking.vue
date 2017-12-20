<template>
  <div class="locking top1">
    <div class="locking-time bottom1" v-show="toggleStatus">
      <div id="timeinfo">
        <p>自动解锁倒计时</p>
        <div class="time" id="time"><i id="m"></i>:<i id="s"></i></div>
      </div>
      <div class="hide" id="infinite">请手动解锁</div>
    </div>
    <div class="locking-btn bottom1" @click="lockingPaibot(this.toggleStatus)">
      {{lockingBtnText}}
    </div>
    <actionsheet  @listclick="itemClick" v-ref:transform ></actionsheet>
  </div>
</template>
<script>
import {setInfoLock,getInfoLock} from '../../vuex/action.js';
import actionsheet from '../../components/dialog/listHandle.vue';

export default {
  vuex: {
    actions:{
      setInfoLock,
      getInfoLock,
    },
    getters: {
      setpaibotInfo : state => state.homeModule.setpaibotInfo,
      getpaibotInfo : state => state.homeModule.getpaibotInfo,
    }
  },
  components:{
    actionsheet,
  },
  methods: {
    countdown(time){
      let minute = 0, second = 0;
      let self = this;
      let timer = setInterval(function(){
        if(time > 1){
          minute = parseInt(time/60);
          second = time%60;
        }else if(time == 1){
          minute =0;
          second = 1;
        }else if(time == 0){
          minute =0;
          second = 0;
        }
        if(minute < 10){
          $("#m").html('0'+ minute);
        }else{
          $("#m").html( minute);
        };
        if(second < 10){
          $("#s").html('0'+ second);
        }else{
           $("#s").html(second);
        }
        time --;
        console.log(minute,second,self.timestatus);
        if(minute == 0 && second == 0 || self.timestatus == false){
          self.toggleStatus = false;
          self.lockingBtnText = '锁定平板';
          clearInterval(timer);
        }
      }, 1000);
    },
    lockingPaibot(status) {
      if(!status){
        this.$refs.transform.show();
      }else{
        this.setInfoLock({status:0},(result) => {
          if(result['success']) {
            this.lockingBtnText = '锁定平板';
            this.toggleStatus = false;
            this.timestatus = false;
          }
        });
      }
    },
    itemClick(value,status){
      $('#timeinfo').removeClass('hide');
      $('#infinite').removeClass('show');
      this.$refs.transform.hide();
      if(value == '取消'){
      }else if(value != '取消'){
        var time = parseInt(value);
        let option = {status:1,time:time};
        this.setInfoLock(option,(result) => {
          if(result['success']) {
            this.lockingBtnText = '立即解锁平板';
            if(time != 0){
              $('#m,#s').html('');
              this.timeSecond = time*60;
              this.countdown(this.timeSecond);
              this.toggleStatus = true;
              this.timestatus = true;
            }else if(time == 0){
              this.toggleStatus = true;
              $('#timeinfo').addClass('hide');
              $('#infinite').addClass('show');
            }
          } else{
          }
        });
      }
    },
    //自动执行该函数
    init(prantinfo){
      console.log(prantinfo);
      let lockingStatus = prantinfo[0].status;
      if(lockingStatus == 0){
        this.toggleStatus = false;
        this.lockingBtnText = '锁定平板';
      }else if(lockingStatus == 1){
        this.lockingBtnText = '立即解锁平板';
        if(prantinfo[0].lock_time != 0){
          this.toggleStatus = true;
          this.timestatus = true;
          this.countdown(prantinfo[0].run_time);
        }
      }
    }
  },
  data(){
    return{
      toggleStatus: false,
      lockingBtnText:'锁定平板',
      timeSecond:0,
      timestatus:false,
    }
  },
}
</script>
<style lang="scss" scoped>
  .locking{
    background:#fff;
    .locking-btn{
      width:100%;
      line-height: 55px;
      font-size: 18px;
      color: rgb(239,108,121);
      text-align: center;
    }
    .locking-time{
      padding:10% 0;
      width:100%;
      background:url(../../../static/images/img_assistant_count_down@3x.png) no-repeat center center;
      background-size:60% 100%;
      text-align: center;
      p{
        line-height: 25px;
        color:#666;
      }
      .time{
        font-size: 30px;
        line-height: 30px;
      }
      #infinite{
        font-size: 24px;
        line-height: 30px;
      }
    }
  }
</style>