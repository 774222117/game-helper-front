<template>
  <div class="main" v-if="!!testData" :style="{backgroundImage: 'url('+ testData.data.page.backGround +')'}">
    <div class="contents" v-ga_pv="{'page_title':testData.data.page.title}" >
      <packages v-for="i in testData.data.modes" :items="i"/>
    </div>
  </div>
</template>

<script>
import packages from '@/components/elevenActivity/packages'
import { setInterval, clearInterval } from "timers";
import loading from '@/components/Loading/loading';
import {setStore,getStore,removeStore}  from '@/utils/storage'
import JumpTo from '@/utils/jumpTo'  //跳转函数

// import package from '@/components/elevenActivity/package';
export default {
  inject:['reload'],
  name: "elevenActivity",
  components: {loading,packages},
  data() {
    return {
      queryWeb:'',
      testData:'',
      // testData: {"code":"","data":{"modes":[{"back_style":"","description":"模块描述","groups":[{"button":"购买","groupType":"2","salePrice":"37.00,","groupPrice":"37.00,","games":[{"steamSalePrce":37.00,"englishName":"Bloons TD 6","image":"https://media.st.dl.pinyuncloud.com/steam/apps/960090/header.jpg","sixVideo":"https://cdn.cloudflare.steamstatic.com/steam/apps/256798821/microtrailer.webm","chinaName":"气球塔防6","steamPrce":37.00,"appId":960090,"intro":"你刚刚与 PAH 公司，即超自然活动帮手公司，签约","libraryCapsule":"https://media.st.dl.pinyuncloud.com/steam/apps/960090/library_600x900.jpg","attributes":{"category3":[{"title":"恐怖"}]},"state":1}],"description":"包描述","discount":"37.00,","title":"包标题","radio":"2"},{"button":"","groupType":"0","salePrice":"","groupPrice":"","games":[{"steamSalePrce":37.00,"englishName":"Bloons TD 6","image":"https://media.st.dl.pinyuncloud.com/steam/apps/960090/header.jpg","sixVideo":"https://cdn.cloudflare.steamstatic.com/steam/apps/256798821/microtrailer.webm","chinaName":"气球塔防6","steamPrce":37.00,"appId":960090,"intro":"你刚刚与 PAH 公司，即超自然活动帮手公司，签约","libraryCapsule":"https://media.st.dl.pinyuncloud.com/steam/apps/960090/library_600x900.jpg","attributes":{"category3":[{"title":"恐怖"}]},"state":1}],"description":"","discount":"","title":"","radio":""},{"button":"","groupType":"1","salePrice":"","groupPrice":"","games":[{"steamSalePrce":37.00,"englishName":"Bloons TD 6","image":"https://media.st.dl.pinyuncloud.com/steam/apps/960090/header.jpg","sixVideo":"https://cdn.cloudflare.steamstatic.com/steam/apps/256798821/microtrailer.webm","chinaName":"气球塔防6","steamPrce":37.00,"appId":960090,"intro":"你刚刚与 PAH 公司，即超自然活动帮手公司，签约","libraryCapsule":"https://media.st.dl.pinyuncloud.com/steam/apps/960090/library_600x900.jpg","attributes":{"category3":[{"title":"恐怖"}]},"state":1}],"description":"","discount":"","title":"","radio":""}],"title":"模块标题","back_ground":"https://media.st.dl.pinyuncloud.com/steam/apps/960090/header.jpg"}],"page":{"back_style":"页面样式","description":"页面描述","title":"页面标题","back_ground":"https://media.st.dl.pinyuncloud.com/steam/apps/960090/header.jpg"}},"flag":true,"message":"支付成功"}
    }
  },
  activated() {
    // 不缓存 每次进来重新获取
   this.init()
 
  },
  mounted() {
   
  },
  methods: {
    init() {
      var _this = this;
      _this.queryWeb = _this.$route.query.pageId
      console.log(_this.testData)
			// 获取活动数据
			_this.$fetch('/module/activity',{'pageId':_this.queryWeb})
				.then((response) => {
          this.testData = response
				})
    }
  },
}
</script>
<style lang="scss" scoped>
.main{
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position-x: center;
  .contents{
    width: 1164px;
    margin: 350px auto 270px;
  }
}
</style>
