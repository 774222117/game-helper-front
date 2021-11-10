<template>
    <!-- 今日特惠内容 -->
    <div class="commentMain">
        <div class="contents">
            <div class="contentsItems" v-for="(item,index) in items" :style="{transform:'translateX('+distance+'px)'}">
                <todaySpecialAllItems :items="item"/>
            </div>
             <div class="contentsItems" v-for="(item,index) in items" :style="{transform:'translateX('+distance+'px)'}">
                <todaySpecialAllItems :items="item"/>
            </div>
             <div class="contentsItems" v-for="(item,index) in items" :style="{transform:'translateX('+distance+'px)'}">
                <todaySpecialAllItems :items="item"/>
            </div>
        </div>
        <div class="leftBtn btnSty backLogoActive_bg opc_hover8" @click="leftClick"></div>
        <div class="rightBtn  btnSty rotateZ backLogoActive_bg opc_hover8" @click="rightClick"></div>
    </div>
</template>

<script>
import todaySpecialAllItems from '@/components/indexs/todaySpecial/todaySpecialAllItems';//今日特惠后面的 6个
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'todaySpecial',
  props: ['items'],
  components:{todaySpecialAllItems},
  data(){
      return {
          distance:-0,
          itemsLength:0,
          num:291,
          data:0
      }
  },
  activated(){

  },
  mounted(){
    
  },
  methods:{
   leftClick(){
       this.data = this.data - 2 < 0? 0:this.data-2
       this.distance = this.data*this.num*-1
   },
   rightClick(){
        if(this.data >= this.items.length){
            this.data = 0
        }
       this.data = this.data + 2 >=this.items.length?this.items.length :this.data + 2
       this.distance = this.data*this.num*-1
   },
  }
};
</script>
<style lang="scss" scoped>
.commentMain{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    position: relative;
    transition: all 0.2s linear;
    .contents{
        // width: 1900px;
        height: 100%;
        background-color: #051824;
        display: flex;
        transition: all 0.2s linear;
        .contentsItems{
            width: 276px;
            height: 217px;
            margin-right: 15px;
            transition: all 0.2s linear;
        }
    }
    // 左右按钮样式
    .btnSty{
        width: 28px;
        height: 117px;
        position: absolute;
        z-index: 9;
        cursor: pointer;
    }
    .leftBtn{
        left: 0;
    }
    .rightBtn{
        right: 0;
    }
    .rotateZ{
        transform: rotateZ(180deg);
    }
}
</style>
