<template>
    <!-- 顶部玩家抽游戏滚动信息 -->
    <div class="content">
        <div class="InfoBox">
            <div class="gameInfo ft14 ft_weight" v-text="scrollInfo"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'scrollInfo',
    components:{},
    data(){
        return {
            timer:null,//设置时间为null
            scrollInfo:"",//保存获取到的数据
            randomGameBag:['三国志14 威力加强版','使命召唤大礼包','帝国时代大礼包','极限竞速：地平线 5','漫漫长路','红色警戒：重制版/红警','文明6','方舟','欢乐共斗','赛博朋克2077','狙击精英4标准版','觅长生','城市：天际线','春节福利礼包'],
            randomNumBag:['138','158','177','176','153','139','199','186','188'],
        }
    },
    activated(){
        this.show();
    },
    mounted(){
        this.init()
    },
    methods:{
        show(){
            if(this.timer != null) return;
                this.timer = setInterval(()=>{
                    //获取到头的第一个字符
                    let start = this.scrollInfo.substring(0,1);
                    //获取到后面的所有字符
                    let end = this.scrollInfo.substring(1);
                    //重新拼接得到新的字符串，并赋值给this.message
                    this.scrollInfo = end + start;
            },300)
        },
        stop(){
            // 清除定时器
            clearInterval(this.timer);
            //清除定时器之后，需要重新将定时器置为null
            this.time = null;
        },
        init(){
            for(var i = 0;i < 15;i++){
                this.scrollInfo += this.randomPhoneTitle() + '****' + this.randomNum() + ' 刚抽到了 ' + this.randomGame() + ' , '
            }
            // console.log(this.scrollInfo)

            //真是获取用户抽奖轮播信息
            // _this.$fetch('/lucky/turntable/all/card').then(response => {
            //     // console.log(response.data)
            //     if(response.data.length > 0){
            //         var stringStr="";
            //         response.data.forEach(element => {
            //          stringStr += element.username+ ' 刚刚抽到了 '+element.chinaName + '  ,  '
            //         });
            //         _this.scrollInfo = stringStr
            //     }
            // })
        },
        // 随机取游戏
        randomGame(){
            var lengthGame = this.randomGameBag.length
            return this.randomGameBag[Math.floor(Math.random()*lengthGame)]
        },
        // 随便取手机前3位
        randomPhoneTitle(){
            var lengths = this.randomNumBag.length
            return this.randomNumBag[Math.floor(Math.random()*lengths)]
        },
        // 随机取手机后四位
        randomNum(){
            // debugger
            var random = Math.floor(Math.random()*10000)
            if(random < 10){
                random = random * 1000;
            }else if(random < 100){
                random = random * 100;
            }else if(random < 1000){
                random = random * 10;
            }
            return random;
        }
    },
    created() {
        this.stop()
        //清除定时器  多清除两边 怕了
        clearInterval(this.timer)
        //清除定时器之后，需要重新将定时器置为null
        this.timer = null
    },
    destroyed() {
        this.stop()
        //清除定时器  多清除两边 怕了
        clearInterval(this.timer)
        //清除定时器之后，需要重新将定时器置为null
        this.timer = null
    },
}
</script>

<style lang="scss" scoped>
    .content {
        margin-left: 60px;
        width: 925px;
        height: 45px;
        overflow: hidden;
        .InfoBox {
            margin-left: 2%;
            width: 95%;
            line-height: 26px;
            display: flex;
            flex-wrap: nowrap;
            .gameInfo {
                min-width: 200px;
                height: 20px;
                color: #FFFFFF;
                line-height: 30px;
                margin: 8px 0 0 0px;
            }
        }
    }
</style>