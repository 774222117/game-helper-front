<template>
  <!-- 十一活动包模板 -->
  <!-- testbg_bg -->
  <div class="commentMain"  :style="{backgroundImage: 'url('+ items.backGround +')'}"  v-if="!!items">
   <transition v-for="itemData in items.groups">
     <!-- 0单品标准包 1单品竖向包 2组合包' -->
      <!-- 组合包 2-->
      <!-- <packagesTemplates :itemData="itemData" v-if="itemData.groupType == 2"/> -->
      <packagesBanner :itemData="itemData" v-if="itemData.groupType == 2"/>
      <!-- 单品标准包 0-->
      <horizontalChart :itemData="itemData" v-if="itemData.groupType == 0"/>
   </transition>
   
  </div>
</template>

<script>
import packagesTemplates from '@/components/elevenActivity/packagesTemplates'
import horizontalChart from '@/components/elevenActivity/horizontalChart'
import packagesBanner from '@/components/elevenActivity/packagesBanner'

export default {
  name: 'packages',
  props: ['items'],
  components:{packagesTemplates,packagesBanner,horizontalChart},
  data(){
      return {
         
      }
  },
  mounted(){

  },
  methods:{

  }
};
</script>
<style lang="scss" scoped>
.commentMain{
   width: 1164px;
   padding-top: 77px;
   margin-bottom: 45px;
   box-sizing: border-box;
   background-repeat: no-repeat;
   background-size: 100% auto;
}
</style>
