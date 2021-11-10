<template>
    <!-- 悬浮 方式一 -->
    <div class="spareBox floatLaye_bg"  v-if="firstOrderType == 1" @click="floatClick">
        <div class="firstOrderTimerSty ft16">{{dataTime.date_m+':'+dataTime.date_s+':'+dataTime.date_ms}}</div>
    </div>
    <!-- 弹出 没有下单 方式二 -->
    <div class="firstOrderType2" v-else-if="firstOrderType == 2">
        <div class="contents firstMainBg_bg">
            <div class="closeBtn close_bg" @click="closeModel"></div>
            <div class="textBtn timerText_bg">
                剩余时间{{dataTime.date_m+':'+dataTime.date_s+':'+dataTime.date_ms}}
            </div>
        </div>
    </div>
    <!-- 弹出 有下单 方式三 -->
    <div class="firstOrderType3" v-else-if="firstOrderType == 3">
        <div class="contents firstMainBg_bg">
            <div class="closeBtn close_bg" @click="closeModel"></div>
            <div class="textBtn timerText_bg" @click="placeOrder">立即下单</div>
            <div class="textTimers">
                剩余时间 {{dataTime.date_m+':'+dataTime.date_s+':'+dataTime.date_ms}}
            </div>
        </div>
    </div>
</template>
<script>
import store from '@/store'
export default {
    name: "firstOrderFloat",
    components: {},
    inject:[],
    store,
    props:['firstOrderType'],
    data(){
        return {
            firstOrderTimer:'15:00:00',
            nowTime: 0,
            endTime:  0,
            dataTime:{
                date_d:'',
                date_h:'',
                date_m:'00',
                date_s:'00',
                date_ms:'00',
            }
        }
    },
    mounted(){
        // 获取首单全免的时间 与权限
        this.getFirstOrderTime()
        
        // console.log(this.firstOrderType)
    },
    methods:{
        // 关闭按钮
        closeModel(){
            // this.$store.commit('setFirstOrder',true)  关闭悬浮
            this.$store.commit('setFirstOrderType',1)  //改变悬浮形态 弹出还是悬浮
            // console.log(this.$store.getters.getFirstOrder)
            this.$store.commit('setIsFirstOrderClick',false)
        },
        //悬浮框点击事件
        floatClick(){
            //如果是在详情页面点击的悬浮框
            if(this.$route.path == '/gameDetails'){
                this.$store.commit('setFirstOrderType',3) 
                this.$store.commit('setIsFirstOrderClick',false)
            }else{
                this.$store.commit('setFirstOrderType',2)
                this.$store.commit('setIsFirstOrderClick',false)
            }
            
        },
        // 首单全面倒计时 15分钟
        countTime() {
            // var date = new Date()
            var now = new Date().getTime()
            var end =  this.endTime //this.treasu_data.etime * 1000     //this.treasu_data 在data中定义的,后台拿到的结束时间戳
            var leftTime = end - now //时间差
            var d, h, m, s, ms
            if (leftTime > 100) {
                // d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
                // h = Math.floor(((leftTime / 1000 / 60 / 60) % 24) + 24 * d)
                m = Math.floor((leftTime / 1000 / 60) % 60)
                s = Math.floor((leftTime / 1000) % 60)
                ms = Math.floor(leftTime % 1000 / 100)
                if (ms < 10) {
                ms = ms
                }
                if (s < 10) {
                s = '0' + s
                }
                if (m < 10) {
                m = '0' + m
                }
                // if(h < 10) {
                h =   h
                // }

                    //将倒计时赋值到div中
            // this.dataTime.date_d = d  //这里是渲染的天数
            // this.dataTime.date_h = h  //这里是渲染的小时
            this.dataTime.date_m = m  //这里是渲染的分钟
            this.dataTime.date_s = s  //这里是渲染的秒数
            this.dataTime.date_ms = ms  //这里是渲染的毫秒
            //递归每秒调用countTime方法，显示动态时间效果
            setTimeout(this.countTime, 50)
            } else {
                this.dataTime.date_m = '00' 
                this.dataTime.date_s = '00'  
                this.dataTime.date_ms = '00'

                this.countTime = null
                // 设置为false 不出现
                this.$store.commit('setFirstOrder',false)
                console.log('已截止')
            }
        },   
        // 下单按钮
        placeOrder(){
            this.$store.commit('setFirstOrderType',1) 
            this.$store.commit('setIsFirstOrderClick',true)
        },
        //获取首单权限与倒计时时间
        getFirstOrderTime(){
            this.$fetch('/activity/join')   //判断是否参加过首单活动
                .then((response) => {
                    if(response.flag){
                       this.endTime = response.data.activeLong*1000 + new Date().getTime()
                       console.log(this.endTime)
                       // 首单全面倒计时
                       this.countTime()
                    }
                })
        }

    },
    directives: {
        
    },
};

</script>
<style lang="scss" scoped>
// 第一种弹出方式 悬浮的 首单全面限时
.spareBox{
	width: 181px;
	height: 139px;
	position: fixed;
	right: 10px;
	bottom: 80px;
    cursor: pointer;
    z-index: 9;
	.firstOrderTimerSty{
		width: 100px;
		height: 20px;
		line-height: 20px;
		position: absolute;
		right: 18px;
		bottom: 34px;
		font-weight: bold;
		letter-spacing: 1px;
		-webkit-user-select: none; 
	}
} 
// 第二种弹出方式 中间的没有下单按钮
.firstOrderType2{
    width: 100%;
    height:100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    margin: auto;
    background-color: rgba(13, 22, 30, 0.8);
    .contents{
        width: 544px;
        height: 428px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9;
        margin: auto; 
        .closeBtn{
            width: 49px;
            height: 49px;
            position: absolute;
            right: -20px;
            top: -20px;
            opacity: 0.8;
            cursor: pointer;
        }
        .closeBtn:hover{opacity: 1;}
        .textBtn{
            width: 205px;
            height: 46px;
            text-align: center;
            line-height: 46px;
            color:rgba(250,165,54,1);
            font-size: 20px;
            position: absolute;
            right: 53px;
            bottom: 49px;
            font-style: italic;
            font-weight: bold;
        }
    }
}
// 第三种弹出方式 有下单按钮
.firstOrderType3{
    width: 100%;
    height:100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    margin: auto;
    background-color: rgba(13, 22, 30, 0.8);
    .contents{
        width: 544px;
        height: 428px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9;
        margin: auto; 
        .closeBtn{
            width: 49px;
            height: 49px;
            position: absolute;
            right: -20px;
            top: -20px;
            opacity: 0.8;
            cursor: pointer;
        }
        .closeBtn:hover{opacity: 1;}
        .textBtn{
            width: 205px;
            height: 46px;
            text-align: center;
            line-height: 46px;
            color:rgba(250,165,54,1);
            font-size: 20px;
            position: absolute;
            right: 53px;
            bottom: 49px;
            font-style: italic;
            font-weight: bold;
            cursor: pointer;
        }
        .textTimers{
            width: 205px;
            height: 24px;
            text-align: center;
            line-height: 46px;
            color:rgba(67, 21, 6, 1);
            font-size: 18px;
            position: absolute;
            right: 53px;
            bottom: 33px;
            font-style: italic;
            font-weight: bold;
        }
    }
}
    
</style>