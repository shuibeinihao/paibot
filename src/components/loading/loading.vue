<template>
    <div class="loading" v-show="showLoading">
        <div class="contents">
            <div class="img-load">
                <img src="./loading.png" width="100%">
            </div>
            <p class="text">{{ content }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: '数据加载中'
        }
    },
    methods: {
        init(config) {
            this.content = config['content'];
            return this;
        },
        show() {
            this.showLoading = true;
            return this;
        },
        hide() {
            this.content = null;
            this.showLoading = false;
            return this;
        }
    },
    data() {
        return {
            'showLoading': false
        };
    }
}
</script>
<style lang="scss" scoped>
    .loading{
        position: fixed;
        z-index: 5;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        .contents{
            width: 110px;
            height: 110px;
            border-radius:5px;
            position: absolute;
            top: 50%;
            transform:translate(-50%,-50%);
            left: 50%;
            background: rgba(0,0,0,.5);
            text-align: center;
            .img-load{
                margin:25px 0 10px 0;
                width:30px;
                display:inline-block;
                img{
                    opacity: .7;
                    animation: loading 1.4s linear infinite;
                }
            }
            p{
                color:#eee;
                font-size: 12px;
            }
        }
    }
    @keyframes loading {
        form{
            transform:rotate(0);
        }
        to{
            transform:rotate(360deg);
        }
    }
</style>