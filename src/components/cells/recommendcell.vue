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
          <a href="javascript:;" @click="install_btn($index)">安装</a>
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
export default {
  props:['items','emptyinfo'],
  data(){
    return{
    }
  },
  methods: {
    install_btn(index){
       $(".inputswitch a").eq(index).html("安装中").addClass('acting');
    }
  }
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
      padding:7px 5px 7px 0px;
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
      display:none;
      width:85px;
      text-align:center;
      a{
        display:inline-block;
        width:45px;
        height:22px;
        text-align: center;
        line-height: 22px;
        border-radius:5px;
        border:1px solid #9e67cc;
        color:#9e67cc;
        font-size:12px;
        margin-top:25px;
      }
      .acting{
        border:1px solid #a5a5a5;
        color:#a5a5a5;
      }
      .acted{
        border:1px solid #f5f5f5;
        background:#f5f5f5;
        color:#a5a5a5;
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