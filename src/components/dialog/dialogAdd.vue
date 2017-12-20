<template>
    <div class="dialog" id="dialog-add">
        <div class="dialog-mask" @click.self="cancel"></div>
        <div class="dialog-info">
            <div class="dialog-head">
                <a href="javascript:;" class="btn_dialog default btn-cancel" @click="cancel" >{{ cancelText }}</a>
                <a href="javascript:;" >{{ title }}</a>
                <a href="javascript:;" class="btn_dialog defalut btn-add"
                :class="{'add-active': hasContent}" @click="hasContent&&add()">{{ addText}}</a>
            </div>
            <div class="dialog-content">
                <textarea class="textarea-noresize" rows="5" cols="30" placeholder="{{ placeholder }}" v-model="content"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import * as lodash from 'lodash'

export default {
    props: {
        title: {
            type: String,
            required: true,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        addText: {
            type: String,
            default: '添加'
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    methods: {
        init(config) {
            this.title = config['title'] || '';
            this.cancelText = config['cancelText'] || '取消';
            this.addText = config['addText'] || '添加';
            this.placeholder = config['placeholder'] || '';
            this.identity = config['identity'] || {};
            this.content = '';
        },
        cancel() {
            this.identity = {};
            this.content = '';
            this.$dispatch('dialog-cancel');
        },
        add() {
            var list = this.content.split(/\s+/g);
            lodash.remove(list, (item) => item === '');
            if(list.length) {
                this.$dispatch('dialog-add', this.identity, list);
            }
        }
    },
    data() {
        return {
            identity: {},
            content: ''
        };
    },
    computed: {
        hasContent() {
            var list = this.content.split(/\s+/g);
            var regTest;
            if(this.identity != 'search'){
                regTest = /(https?|ftp|mms):\/\/([A-z0-9]+[_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9]+\.[A-z]{2,}(\/.*)*\/?/g;
                for (var i=0; i < list.length; i++){
                    return regTest.test(list[i]);
                };
            }else{
                regTest =/\S/;
                return regTest.test(this.content);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .dialog{
        .dialog-mask{
            position: fixed;
            z-index: 2;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background:rgba(0,0,0,.4);
        }
        .dialog-info{
            width: 100%;
            position: fixed;
            background: #FAFAFC;
            bottom:0;
            left:0;
            z-index: 12;
            .dialog-head{
                line-height: 42px;
                font-size: 18px;
                display: flex;
                a{
                    font-size: 14px;
                    color: #333;
                    width:40px;
                    text-align:center;
                    &.btn-cancel{
                        padding-left:20px;
                    }
                    &.btn-add{
                        padding-right:20px;
                        color:#999;
                    }
                    &.add-active{
                        color:#333;
                    }
                    &:nth-of-type(2){
                        flex:1;
                    }
                }
            }
            .dialog-content{
                width:100%;
                padding:10px;
                box-sizing:border-box;
                .textarea-noresize{
                    width:100%;
                    min-height: 120px;
                    border-radius: 5px;
                    border-color:#ccc;
                    outline:none;
                    resize: none;
                    font-size: 12px;
                    padding: 8px;
                    box-sizing:border-box;
                }
            }
        }
    }
</style>
