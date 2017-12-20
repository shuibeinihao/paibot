<template>
    <div class="dialog" id="dialog-del">
        <div class="dialog-mask" @click.self="cancel"></div>
        <div class="dialog-info">
            <div class="dialog-content">
                <p>{{ content }}</p>
                <div class="dialog-button">
                    <a href="javascript:;" class="default btn-cancel" @click="cancel">{{ cancelText }}</a>
                    <a href="javascript:;" class="default btn-confirm" @click="del">{{ confirmText}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: String ,
            default: '确认删除吗？'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确认'
        }
    },
    data() {
        return {
            identity: {}
        }
    },
    methods: {
        init(config) {
            this.content = config['content'] || '';
            this.cancelText = config['cancelText'] || '取消';
            this.confirmText = config['confirmText'] || '确认';
            this.identity = config['identity'] || {};
        },
        cancel() {
            this.identity = {};
            this.content = '';
            this.$dispatch('dialog-cancel');
        },
        del() {
            this.$dispatch('dialog-del', this.identity);
        }
    }
}
</script>
<style lang="scss" scoped>
   .dialog{
        .dialog-mask{
            position: fixed;
            z-index: 3;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background:rgba(0,0,0,0);
        }
        .dialog-info{
            width: 85%;
            box-shadow:2px 8px 20px 0px #ddd;
            position: fixed;
            background:rgb(249,249,249);
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            z-index: 12;
            .dialog-content{
                padding:10px;
                p{
                    font-size: 16px;
                    color: #666;
                    text-align: center;
                    line-height: 1.25;
                    padding: 20px 0;
                }
                .dialog-button{
                    display: flex;
                    padding:20px;
                    a{
                        border:solid 1px #eee;
                        margin-right:15px;
                        color:#666;
                        flex:1;
                        height:32px;
                        text-align: center;
                        line-height:32px;
                        font-size:14px;
                        border-radius:16px;
                        background:linear-gradient(to top, #fafafa 0%,#fff 100%);
                        &.btn-confirm{
                            color:#ac79bd;
                        }
                    }
                }
            }
        }
    }
</style>
