<template>
    <div class="swiperBox" v-if="gamelist.length > 0">
        <swiper :options='swiperOption' ref='mySwiperbox' :key='again'>
            <swiper-slide v-for="(item,index) in slicelist" :key="index" class="swiperSlide swiper-no-swiping">
                <swiperItem :item='item'/>
            </swiper-slide>
        </swiper>
       
    </div>
</template>



<script>
import swiperItem from '@/components/newYear/swiper/swiperItem'; //单个轮播图片

export default {
    name:'bannerSwiper',
    components:{swiperItem},
    data(){
        const self = this;
        return {
           again:+new Date(),//再次进入页面创建一个时间搓，出来改变swiper的key值，让swiper重新运动
           gamelist:[],//游戏所有数据
           slicelist:[],//轮播遍历的数据
           newlist:[],//截取所有数据字段并保存到需要遍历的数据中
           page:0,//截取的长度 头
           num:10,//截取的长度 尾
           realIndex:0,//记录swiper下标
           swiperOption:{
                loop:false,
                loopedSlides: 6,//slide还剩几个时自动补齐
                autoplay:{
                    delay:1000,
                    stopOnLastSlide:false,//如果设置为true，当切换到最后一个slide时停止自动切换。
                    disableOnInteraction:false,//用户操作swiper之后，是否禁止autoplay。
                    noSwiping:true,//关闭轮播可鼠标手动拖动，并在swiperSlide上添加class:swiper-no-swiping
                },
                lazyLoading : true,//懒加载开启
                observer:false,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:false,//修改swiper的父元素时，自动初始化swiper
                speed:2000,
                slidersPerView:6,//设置slider容器能够同时显示的slides数量
                spaceBetween:16,//在slide之间设置距离（单位px）
                width:156,
                on:{
                    // 获取swiper轮播swiperItem的下标
                    slideChangeTransitionEnd(){
                        self.realIndex = this.realIndex;
                        self.getMoreData()
                        // console.log(this.realIndex);
                    }
                }
            },
        }
    },
    computed:{
        swiper(){
            return this.$refs.mySwiperbox.swiper;
        }
    },
    watch:{
        $route(to, from) {
            if(to.path == '/newYear'){
                this.again = +new Date()
            }   
        }
    },
    mounted(){
        // console.log(this.aaa)
        this.init()
        this.getMoreData()
    },
    methods:{
        init(){
            var _this = this;
            _this.$fetch('/lucky/bag/card')
            .then((response) => {
                if(response.flag){
                    _this.gamelist = response.data
                    _this.slicelist = response.data.slice(_this.page,_this.num)
                    // console.log(_this.gamelist)
                }else{
                    console.log('没有轮播图数据')
                }
            })
        },
        //每次轮播到第三个数据时，重新截取游戏数量并合并到所遍历的游戏数组中
        getMoreData(){
            if(this.realIndex % 10 === 3){
                this.page += 10;
                this.num += 10;
                this.newlist = this.gamelist.slice(this.page,this.num)
                this.slicelist = this.slicelist.concat(this.newlist)
                // console.log(this.slicelist)
            }
        }
    }
}
</script>


<style lang="scss" scoped>
    .swiperBox {
        width: 934px;
        height: 235px;
        // overflow: hidden;
        display: flex;
    }

</style>