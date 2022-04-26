<template>
    <div class="alertContent">
        <div class="serchGameContent serchGame_bg">
            <!-- 关闭按钮 -->
            <div class="serchClose serchClose_bg" @click="close"></div>
            <div class="serchGameText">
                <div class="text1 ft20">选择游戏</div>
                <!-- <div class="text2 ft14">Select the game</div> -->
            </div>
            <!-- 排行与搜索 -->
            <div class="rankAndSerch">
                <!-- 排行切换 -->
                <div class="rankingContent">
                    <div class="rankingItem ft14" v-for="(item,index) in toggleOptions" :class="currentIndex == index ? 'rankingItem_bg ischange ischange2_bg' : 'nochange1_bg' " @click="handRankGame(index,item.orderType)" :key='index'>{{item.title}}</div>
                </div>
                <!-- 搜索框 -->
                <div class="serchInputContent">
                    <input type="text" class="serchGame ft12" placeholder="请输入您想购买的游戏" v-model="inputValue"/>
                    <div class="serchBtn ft14" @click="serchGameBtn">搜索</div>
                </div>
            </div>
            
            <!-- 游戏展示区 -->
            <div class="gameContent">
                <div class="gameItem" v-for="(item,index) in steryGame" @click="changeGameItem(item)" :key='index'>
                    <div class="gameItem1 gameBorder_bg"></div>
                    <!-- 游戏图 -->
                    <img :src="item.image" alt="" class="gamePic" />
                    <!-- 底部阴影 -->
                    <div class="bottomShadow bottomShadow_bg"></div>
                    <!-- 游戏名称 -->
                    <div class="gameName ft12">{{item.chinaName || item.englishName}}</div>
                    <!-- 游戏价格 -->
                    <div class="gamePrice gamePrice_bg ft12">￥{{item.steamPrce}}</div>
                </div>
                
            </div>
            <!-- 按钮切换 -->
            <div class="changeBtn">
                <div class="changeBtnContent">
                    <!-- 上一页 -->
                    <div class="upBtn ft10" @click="upPageBtn">上一页</div>
                    <!-- 页码 -->
                    <!-- <ul class="pagerContent">
                        <li class="pager ft10" v-for="i in 1">{{i}}</li>
                    </ul> -->
                    <!-- 下一页 -->
                    <div class="downBtn ft10" @click="downPageBtn">下一页</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'serchGame',
    data(){
        return {
            toggleOptions:[{title:'热销排行',orderType:3},{title:'折扣畅销',orderType:1},{title:'最近上架',orderType:2}],
            currentIndex:0,//默认选项卡1
            steryGame:'',//保存游戏数据
            page:1,//默认页码
            value:'',//搜索游戏的值
            inputValue:null,//输入框的值
            orderType:3,//游戏类型
        }
    },
    mounted(){
        this.serchGameResult()
    },
    methods:{
        // 选择单个游戏
        changeGameItem(item){
            // console.log(item)
            this.$emit('changeGameItem',item,false)
        },
        // 关闭按钮
        close(){
            this.$emit('change',false)
        },
        //切换选项卡  orderType = 1 折扣 2上架时间 3热销
        handRankGame(index,orderTypes){
            this.currentIndex = index
            this.orderType = orderTypes
            this.serchGameResult()
        },
        // 点击搜索按钮
        serchGameBtn(){
            // console.log(this.inputValue)
            this.value = this.inputValue//赋值给请求要搜索的游戏
            this.serchGameResult()
        },
        // 点击上一页按钮
        upPageBtn(){
            if(this.page == 1){
                this.page = 1
            }else{
                this.page--
            }
            this.serchGameResult()
        },
        // 点击下一页按钮
        downPageBtn(){
            this.page++
            this.serchGameResult()
        },
        // 搜索游戏请求 app/index/findData
        serchGameResult(){
            var serchNum = {
                current:this.page,//当前页数
                limit:12,//页数量
                gameName:this.value,//游戏名字
                orderType:this.orderType,//游戏分类
            }
            var _this = this
            _this.$fetch('/newYear/findData',serchNum)
            .then((response) => {
                // console.log(response)
                if(response.flag){
                    _this.steryGame = response.data.rows
                }else{
                    console.log('请求游戏数据失败')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .alertContent {
        width: 100%;
        height:100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 49;
        margin: auto;
        background-color: rgba(13, 22, 30, 0.7);
        .serchGameContent {
            width: 851px;
            height: 470px;
            position: absolute;
            top: 184px;
            left: 0;
            right: 0;
            margin: 0 auto;
            // 关闭按钮
            .serchClose {
                width: 24px;
                height: 24px;
                cursor: pointer;
                position: absolute;
                top: -40px;
                right: -24px;
            }
            .serchGameText {
                width: 234px;
                height: 34px;
                margin: 31px 0 0 49px;
                display: flex;
                justify-content: space-between;
                .text1 {
                    color: #e8d694;
                    font-family: PingFang SC, PingFang SC-Semibold;
                    // font-weight: 600;
                }
                .text2 {
                    width: 134px;
                    height: 20px;
                    font-family: PingFang SC, PingFang SC-Semibold;
                    font-weight: 600;
                    margin-top: 12px;
                    background-image: linear-gradient(180deg,#d89a7f, rgba(156,99,81,0.00) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            // 排行与搜索
            .rankAndSerch {
                width: 754px;
                height: 39px;
                // border: 1px white solid;
                margin: 8px 0 0 49px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .rankingContent {
                    width: 348px;
                    height: 32px;
                    display: flex;
                    background-color: #693630;
                    // 切换按键
                    .rankingItem {
                        width: 116px;
                        height: 32px;
                        line-height: 34px;
                        font-family: PingFang SC, PingFang SC-Regular;
                        text-align: center;
                        letter-spacing: 0.28px;
                        cursor: pointer;
                        color: #e8d594;
                    }
                }
                .serchInputContent {
                    width: 300px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    // 搜索输入框
                    .serchGame {
                        width: 212px;
                        height: 32px;
                        background: rgba(40,36,56,0.90);
                        padding-left: 45px;
                        color: #a19684;
                        outline: none;
                        -webkit-appearance: none;//去掉浏览器默认样式
                        border: 0;
                    }
                    // 搜索按钮
                    .serchBtn {
                        width: 88px;
                        line-height: 28px;
                        background: rgba(68,59,101,0.9);
                        border: 2px solid;
                        border-image: linear-gradient(180deg, #d6a77d, #a76754 100%) 2 2;
                        font-family: PingFang SC, PingFang SC-Regular;
                        font-weight: 400;
                        text-align: center;
                        color: #ffd4a4;
                        cursor: pointer;
                    }
                }
            }
            // 游戏展示区
            .gameContent {
                width: 752px;
                height: 263px;
                margin: 20px 0 0 49px;
                display: flex;
                flex-wrap: wrap;
                // justify-content: space-around;
                // align-content: space-around;
                // border: 1px white solid;
                
                .gameItem {
                    width: 165px;
                    height: 79px;
                    position: relative;
                    left: 6px;
                    margin: 2px 10px 2px 10px;
                    cursor: pointer;
                    .gameItem1 {
                        width: 165px;
                        height: 82px;
                        position: absolute;
                        z-index: 5;
                    }
                    // 游戏图
                    .gamePic {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                    }
                    // 底部阴影
                    .bottomShadow {
                        width: 165px;
                        height: 54px;
                        position: absolute;
                        bottom: 0;
                    }
                    // 游戏名称
                    .gameName {
                        width: 154px;
                        height: 32px;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        font-family: Microsoft YaHei UI, Microsoft YaHei UI-Bold;
                        font-weight: 700;
                        text-align: LEFT;
                        color: #ffe8ac;
                        line-height: 32px;
                    }
                    // 游戏价格
                    .gamePrice {
                        width: 60px;
                        line-height: 24px;
                        height: 24px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
                        font-weight: 700;
                        text-align: center;
                        color: #ffffff;
                        text-shadow: 0px 1px 0.5px 0px #1a003a; 
                    }
                }
            }
            // 按钮切换
            .changeBtn {
                width: 100%;
                height: 20px;
                margin: 26px auto;
                .changeBtnContent {
                    width: 120px;
                    margin: 0 auto;
                    display: flex;
                    font-family: PingFang SC, PingFang SC-Regular;
                    font-weight: 400;
                    color: #e8be94;
                    // border: 1px white solid;
                    justify-content: space-between;
                    // 上一页
                    .upBtn {
                        width: 45px;
                        height: 20px;
                        line-height: 20px;
                        background: #282438;
                        border-radius: 2px;
                        cursor: pointer;
                        // margin-right: 10px;
                        text-align: center;
                        display: inline;
                        padding: 2px 4px;
                    }
                    .pagerContent {
                        min-width: 30px;
                        height: 20px;
                        display: flex;
                        border: 1px white solid;
                        .pager {
                           width: 20px;
                           line-height: 20px;
                           background-color: #341516;
                           margin-right: 10px;
                           text-align: center;
                        }
                    }
                    // 下一页
                    .downBtn {
                        height: 20px;
                        width: 45px;
                        line-height: 20px;
                        background: #282438;
                        border-radius: 2px;
                        cursor: pointer;
                        text-align: center;
                        padding: 2px 4px;
                    }
                }
            }
        }
    }
    // input, button, select, textarea {
    //     outline: none;
    //     -webkit-appearance: none;
    //     border-radius: 0;
    // }

    // 输入框默认字体颜色
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: #a19684;
    }
    // .nochange {color: #F6A382;}
    // .ischange {font-weight: bold;color: #FFD4A4;}
    .ischange {font-weight: bold;}
    .rankingItem_bg {
        position: relative;
    }
    .rankingItem_bg:before {
        content: "";
        width: 116px;
        height: 8px;
        display: block;
        position: absolute;
        background: url('../../assets/discountNewYear/images/rankingItem.png') no-repeat;
        background-size: cover;
        bottom: -8px;
        left: 0;
    }
</style>