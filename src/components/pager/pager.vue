<template>
<div class="page-bar ft12 color_white_1">
    <ul>
        <!-- <li class="first">
            <span>共{{dataNum}}条记录 第 {{cur}} / {{all}} 页</span>
        </li> -->
        <li v-if="cur>1">
            <!-- //点击上一页 -->
            <a v-on:click="cur--,pageClick()"> < </a>
        </li>
        <li v-if="cur<=1">
            <!-- //点击第一页时显示 -->
            <a class="banclick"> < </a>  
        </li>
        <li  class="li_a" v-for="index in indexs" v-bind:class="{ 'active': cur == index}">
            <!-- //页码 -->
            <a v-on:click="btnClick(index)">{{ index }}</a>
        </li>
        <li  v-if="cur!=all">
            <!-- //点击下一页 -->
            <a v-on:click="cur++,pageClick()">></a>
        </li>
        <li  v-if="cur == all">
            <!-- //点击最后一页时显示 -->
            <a class="banclick"> > </a> 
        </li>
        <!-- <li class="last_li">
            // 共有多少页
            <span>共<i>{{all}}</i>页</span> 
        </li> -->
        <li class="goto—_li">
            <!-- // 跳转 -->
           <div> 跳转到</div><input ref="input1" type="text" @keyup.enter="gotoPages" v-model="curInput">
        </li>
    </ul>
</div>
</template>
<style lang="scss" scoped>
.page-bar {
   text-align: center;
   width: 100%;
   height: 36px;
 }

 .page-bar ul {
   display: block;
   overflow: hidden;
}

.page-bar li {
   display: block;
   width: 36px;
   height: 36px;
   border-radius: 4px;
   list-style: none;
   overflow: hidden;
   position: relative;
   float: left;
   margin-left: 8px;
}
// .page-bar .first{
//    display: block;
//    width: 170px;
//    height: 36px;
//    font-size: 14px;
//    line-height: 36px;
//    text-align: center;
// }
// .page-bar .last_li{
//    width: 85px;
//    height: 36px;
//    border: 1px solid rgba(255,255,255,0.1);
// }
// .page-bar .last_li span{
//     width: 100%;
//    height: 100%;
//    line-height: 36px;
//    text-align: center;
//    float: left;
// }
.page-bar .goto—_li{
    width: 122px;
    height:36px;
    display: flex;
    justify-content: center;
    align-items: center;
    input{
        width: 48px;
        height: 36px;
        color: #fff;
        outline: none;
        border-radius:4px;
        border:1px solid rgba(255,255,255,0.1);
        background-color: transparent;
        text-align: center;
        box-sizing: border-box;
        margin-left: 8px;
    }

}
.page-bar li:first-child {
   margin-left: 0px
}

.page-bar a {
   width: 34px;
   height: 34px;
   border: 1px solid rgba(255,255,255,0.1);
   text-decoration: none;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
   /*margin-left: -1px;*/
   line-height:  34px;
   color: rgba(255,255,255,0.4);
   cursor: pointer
}
.page-bar a:hover{
    color: rgba(255,255,255,1);
}
.page-bar .li_a a:hover {
   border: 1px solid rgba(172, 220, 245, 1);
   color: rgba(172, 220, 245, 1);
}

.page-bar a.banclick {
   cursor: not-allowed;
}

.page-bar .active a {
   color: #fff;
   cursor: default;
//    background-color: #FF0036;
   border-color: rgba(172, 220, 245, 1);
}

.page-bar i {
   font-style: normal;
   color: rgba(172, 220, 245, 1);
   margin: 0px 4px;
   font-size: 14px;
}
</style>
<script>
export default {
   //显示的声明组件
   name: "paging",
  //从父级组件中传值过来的，你可以自己设置名字，但是需要跟父级传入的名字一致！
    props : ["dataAll","dataCur","datanum","dataDatanum"],
   data() {
       return {
           all: this.dataAll, //总页数
           cur:  this.dataCur ,//当前页码
           num: this.datanum , //一页显示的数量  奇数
           dataNum: this.dataDatanum,//数据的数量
           curInput: this.dataCur , //跳转到多少页面
       }
   },
   watch: {
       cur: function(oldValue, newValue) {
       //父组件通过change方法来接受当前的页码
           this.$emit('change', oldValue)
          //这里是直接点击执行函数
       },
       dataAll:function(val){
           this.all = val
       },
       dataCur:function(val){
           this.cur = val
           this.curInput = val
       },
       datanum:function(val){
           this.num = val
       },
       dataDatanum:function(val){
           this.dataNum = val
       }
   },
   methods: {
       btnClick: function(data) { //页码点击事件
           if(data != this.cur) {
               this.cur = data
               this.curInput = data
           }
       },
       pageClick: function() {
            //父组件通过change方法来接受当前的页码
            //这里是点击下一页执行函数
           this.curInput = this.cur 
           this.$emit('change',  this.cur)
       },
       gotoPages(){
        //    console.log(this.indexs)
        var inputNum = this.$refs.input1.value*1;
        inputNum = inputNum >= this.all ? this.all : inputNum <= 1 ? 1 : inputNum
        this.cur = inputNum
        this.curInput = inputNum 
        this.$emit('change',  inputNum)
        //    console.log(this.$refs.input1.value)
       }
   },

   computed: {
       indexs: function() {
           var left = 1;
           var right = this.all;
           var ar = [];
           if(this.all >= this.num ) {
               if(this.cur > 3 && this.cur < this.all - 2) {
                   left = this.cur -  (this.num-1)/2
                   right = this.cur +  (this.num-1)/2
               } else {
                   if(this.cur <= 3) {
                       left = 1
                       right =  this.num
                   } else {
                       right = this.all
                       left = this.all - (this.num - 1);
                   }
               }
           }
           while(left <= right) {
               ar.push(left)
               left++
           }
           return ar
       }

   }

}
</script>