<template>
  <div class="loading-data" id="getdata">
    <i></i>
  </div>
</template>
<script>
import config from '../config/index.js';
import utils from '../utils/index.js';
import {getchind} from '../vuex/action.js';
export default{
  vuex: {
    actions:{
      getchind,
    },
    getters: {
      getchindInfo : state => state.homeModule.getchindInfo
    }
  },
  ready:function(){
    this.getchind((result) => {
      if(result['success'] == 200) {
        localStorage.setItem("childrenlist",'');
        let dataArr = [];
        let dataChild = JSON.parse(decodeURI(config.cid)).uidlist;
        for(let i = 0; i < dataChild.length; i++){
          for (let g = 0 ; g < this.getchindInfo.data.length; g++){
            if(dataChild[i].uid == this.getchindInfo.data[g].user_id){
              dataChild[i].device_id = this.getchindInfo.data[g].opcode;
              dataArr.push(dataChild[i]);
            }
          }
        };
        let newChiildData = {userlist:dataArr};
        let str = JSON.stringify(newChiildData);

        localStorage.setItem("childrenlist",str);
        let option = {
          token:config.token,
          appid:config.appid,
          uid : config.uid,
          uid_children :this.getchindInfo.data[0].user_id,
          device_id: this.getchindInfo.data[0].opcode,
        };
        //console.log(utils.setQueryStringURL1(option) + '#!/' + this.$route.query.type);

       location.href = utils.setQueryStringURL1(option) + '#!/' + this.$route.query.type;
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.loading-data{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  background: rgba(255,255,255,1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  i{
    display: inline-block;
    background: url(../../static/images/icon-loading.png) no-repeat center center;
    background-size: 100%;
    width: 64px;
    height: 64px;
    animation: rotate .5s linear 0s infinite;
  }
  @keyframes rotate{
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
  }
}
</style>