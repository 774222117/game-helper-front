<template>
    <!-- 常见问题汇总组件 -->
    <div class="content">
        <div class="questionTitle">
            <div class="titleBox">
                <div class="questionLogo questionLogo_bg"></div>
                <div class="text1 ft20">常见问题汇总</div>
            </div>
            <div class="text2 ft14">游戏有问题？先看这里，可能解决80%的问题！</div>
        </div>
        <!-- 问题帖子 -->
        <div class="questionBody">
            <div class="questionItem" v-for="item in gameQuestion.slice(0,6)" :key="item.id">
                <div class="bluePoint bluePoint_bg"></div>
                <div class="title ft14 textOver" @click="openQuestion(item.problemUrl)">{{item.problemName}}</div>
                <div class="time ft12">{{item.createTime.slice(0,10)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'gameQuestion',
    props:['openGameInfo'],
    data(){
        return {
            gameId:'',//记录游戏appid
            gameQuestion:'',//记录游戏问题
        }
    },
    mounted(){
      this.init();  
    },
    methods:{
        // 请求常见问题汇总数据
        init(){
            var _this = this;
            _this.gameId = _this.openGameInfo;
            // console.log(this.gameId)
            _this.$fetch('/game/problem',{'appId':this.gameId}).then(res => {
                // console.log(res.data);
                _this.gameQuestion = res.data
            })
        },
        // 打开游戏问题外链
        openQuestion(url){
            if(!!window.sendCef){
              window.sendCef("open_url", url);  
            }else{
                console.log('打开链接失败');
            }
             
        }
    }
}
</script>

<style lang="scss" scoped>
    .content {
        width: 100%;
        height: 100%;
        background: #051824;
        position: relative;
        //问题汇总
        .questionTitle {
            width: 701px;
            height: 70px;
            margin: 16px 0 0 25px;
            position: absolute;
            border-bottom: 1px solid rgba(255,255,255,0.12);
            // title盒子
            .titleBox {
                width: 197px;
                height: 40px;
                display: flex;
                // 问题logo
                .questionLogo {
                    width: 40px;
                    height: 40px;
                }
                .text1 {
                    width: 153px;
                    line-height: 32px;
                    margin-left: 4px;
                    font-weight: 600;
                    text-align: left;
                    color: rgba(255,255,255,0.87);
                }
            }
            .text2 {
                width: 320px;
                height: 22px;
                margin-left: 44px;
                text-align: LEFT;
                color: rgba(255,255,255,0.45);
            }
        }
        // 问题帖子
        .questionBody {
            width: 720px;
            height: 248px;
            position:absolute;
            top: 96px;
            left: 24px;
            // border: 1px white solid;
            // 单个问题
            .questionItem {
                width: 694px;
                height: 40px;
                border-bottom: 1px solid rgba(235,235,245,0.08);
                display: flex;
                // border: 1px white solid;
                // 蓝点
                .bluePoint {
                    width: 4px;
                    height: 4px;
                    // border: 1px white solid;
                    margin-top: 18px;
                }
                // 帖子名称
                .title {
                    width: 600px;
                    line-height: 20px;
                    // border: 1px white solid;
                    margin-left: 9px;
                    margin-top: 10px;
                    text-align: left;
                    color: rgba(255,255,255,0.87);
                    text-shadow: 0px 1px 0px 0px rgba(255,255,255,0.25) inset;
                    cursor: pointer; 
                }
                // 时间
                .time {
                    margin-left: 10px;
                    width: 68px;
                    height: 17px;
                    margin-top: 13px;
                    text-align: left;
                    color: rgba(255,255,255,0.30);
                    text-shadow: 0px 1px 0px 0px rgba(255,255,255,0.25) inset; 
                }
            }
        }
    }
</style>