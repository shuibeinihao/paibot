<template>
  <div class="cells-form top1">
    <div class="cell_switch bottom1">
      <div class="cell_primary">持续使用限制</div>
      <div class="cell_ft">
        <input class="toggle-switch" type="checkbox" :checked="btnstatus" @change="toggle">
      </div>
    </div>
    <div v-show="btnstatus" class="cell-menu">
      <div class="cell_switch bottom1">
        <div class="cell_primary">持续使用时长</div>
        <div class="cell_ft">
          <select name="last_time" id="lastTime" @change="selectlist">
            <option v-for ="item in items" value="{{item}}">{{item}}分钟</option>
          </select>
        </div>
      </div>
      <div class="cell_switch bottom1">
        <div class="cell_primary">休息时长</div>
        <div class="cell_ft">
          <select name="rest_time" id="restTime" @change="selectlist" >
            <option v-for ="item in items" value="{{item}}">{{item}}分钟</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div></div>
</template>
<script>
import {setInfoUse , getInfoUse} from '../../vuex/action.js';
export default {
  vuex: {
    actions:{
      setInfoUse,
      getInfoUse,
    },
    getters: {
      newProtectInfo : state => state.homeModule.newProtectInfo,
      updteSelectInfo    : state => state.homeModule.updteSelectInfo,
    }
  },
  props:{
    info:{type:Array},
    time:{type:Array},
  },
  data(){
    return{
      btnstatus:false,
      items:[5,10,15,20,25,30,40,50,60,100,120],
      dataInfo:[],
    }
  },
  // computed:{
  // },
  methods: {
    // 开启或关闭使用限制
    toggle(e) {
      let toggles = e.target.checked;
      let status = null;
      if(toggles){
        status = {status:1};
      }else{
        status = {status:0};
      };
      this.$dispatch('show-loading', {
        content: '设置中'
      });
      this.setInfoUse(status,(result) => {
        this.$dispatch('hide-loading');
        if(result['success']) {
          this.btnstatus = !this.btnstatus;
          e.target.checked = !toggles;
          if(toggles){
            this.updteSelect();
          }
        } else {
          e.target.checked = toggles;
          this.btnstatus = this.btnstatus;
        }
      });
    },
    //更新使用时长和休息时长
    updteSelect(){
      this.getInfoUse((result) => {
        this.$dispatch('hide-loading');
        if(result['success']) {
          for(let i = 0; i < this.items.length; i++){
            if(this.items[i] == this.dataInfo[0].last_time){
              document.getElementById('lastTime')[i].selected = true;
            };
            if(this.items[i] == this.dataInfo[0].rest_time){
              document.getElementById('restTime')[i].selected = true;
            }
          }
        };
      });
    },
    //修改使用时长和休息时长
    selectlist(e){
      let editType = {};
      let name = e.target.name;
      let value = e.target.value;
      if(name == 'last_time'){
        editType.last_time = value;
      }else if(name == 'rest_time'){
        editType.rest_time = value;
      };
      this.setInfoUse(editType,(result) => {
        if(result['success']) {
        } else {
          alert(2)
        }
      });
    },
    //自动执行该函数
    init(prantinfo){
      this.dataInfo = prantinfo;
      let infoStatus = prantinfo[0].status;
      if(infoStatus == 0){
        this.btnstatus =  false
      }else{
        this.btnstatus = true;
        for(let i = 0; i < this.items.length; i++){
          if(this.items[i] == prantinfo[0].last_time){
            document.getElementById('lastTime')[i].selected = true;
          };
          if(this.items[i] == prantinfo[0].rest_time){
            document.getElementById('restTime')[i].selected = true;
          }
        }
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.cell-menu{
  .cell_switch{
    font-size: 15px;
    color:#666;
    .cell_ft{
      position: relative;
      width:70px;
      &:before{
        content: "";
        display: inline-block;
        transform: rotate(135deg);
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        position: relative;
        position: absolute;
        top: 8px;
        right: 3px;
      }
      select{
        -webkit-appearance: none;
        border: 0;
        outline: 0;
        background-color: transparent;
        width:60px;
        font-size: inherit;
        line-height: inherit;
        position: relative;
        z-index: 1;
        color:#555;
        text-align: right;
      }
    }
  }
}
</style>