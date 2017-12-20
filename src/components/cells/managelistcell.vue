<template>
  <div>
    <div class="appmanagewrap" v-if="emptyinfo">
      <div class="appmanagelist bottom1" v-for="item in items">
        <div class="list_img">
          <img :src=item.icon>
        </div>
        <div class="list_con">
          <div class="list_limit">
            <p>{{item.name}}</p>
            <span>{{item.description}}</span>
          </div>
        </div>
        <div class="inputswitch">
          <input class="toggle-switch fr mt23 mr15" type="checkbox" name={{item.app_id}} id={{item.parent_category_id}} :checked="item.is_manage == 1" @change="toggle">
        </div>
      </div>
    </div>
    <div class="empty" v-else="emptyinfo">
      <div class="empty_img">
        <img src="../../../static/images/appama.png" alt="">
         <p>没有相关应用</p>
      </div>
    </div>
  </div>
</template>
<script>
import {setManageModel} from '../../vuex/action.js';
export default {
  vuex: {
    actions:{
      setManageModel
    },
    getters: {
      newSetManageModel : state => state.manageModules.newSetManageModel
    }
  },
  props:['items','emptyinfo'],
  data(){
    return{
      toggleStatus: false
    }
  },
  methods: {
  //开启或关闭使用限制
    toggle(e) {
      let isManage = e.target.text;
      let option ;
      let toggles = e.target.checked;
      let app_id = e.target.name;
      let categoryId = e.target.id;
      if(toggles){
        option = {'add_app_id':[{parent_category_id:categoryId,app_id:app_id}]};
      }else{
        option = {'delete_app_id':[{parent_category_id:categoryId,app_id:app_id}]};
      };
      this.setManageModel(option,(result) => {
        if(result['success']) {
        } else {
        }
      });
    },
  },
}
</script>
<style lang="scss" scoped>
.appmanagewrap{
  .appmanagelist{
    background: #fff;
    display:flex;
    .list_img{
      width:50px;
      height:50px;
      margin:12px 10px 10px 10px;
      img{
        width:100%;
        border-radius:8px;
      }
    }
    .list_con{
      padding:7px 0px;
      width:60%;
      flex:1;
        p{
          font-size:16px;
          color:#313131;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        span{
          display:block;
          font-size:12px;
          color:#959595;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
    }
    .inputswitch{
      width:85px;
    }
  }
}
.empty{
  .empty_img{
    position:absolute;
    left:50%;
    top:30%;
    margin-left:-70px;
    img{
      width:140px;
    }
    p{
      text-align:center;
      font-size:16px;
      color:#959595;
      margin-top:30px;
    }
  }
}
</style>