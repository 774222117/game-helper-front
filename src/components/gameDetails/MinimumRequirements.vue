<template>
    <div class="minimumRequirements">
        <!-- 上方按钮 -->
        <div class="configBtnBox">
            <div class="titleBox ft16 color_white_1">推荐配置</div>
            <div class="minimumBox ft12 color_white_08" :class="isAcrive == 'minimum'?'active':''" @click="configBtnClick('minimum')">最低配置</div>
            <div class="adviceBox ft12 color_white_08"  :class="isAcrive == 'advice'?'active':''" @click="configBtnClick('advice')">推荐配置</div>
        </div>
        <div class="configInfoBox">
            <div class="configItemBox" v-for="(item,index) in configList" :key="index">
                <div class="configItemLeft textOver ft14 color_white_04">{{item.name}}</div>
                <div class="configItemRight textOver2 ft14 color_white_08">{{item.value}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MinimumRequirements',
            //最低配置           //推荐配置
  props:['systemNeedsMins','systemNeedsRecommends'],
  data(){
      return {
          isAcrive: 'minimum',
          configList:[
              {'name':'Memory','value':'4GB'},
              {'name':'Graphicsd','value':'Intel Core i5-4430 / AMD FX-6300  memory: 8 GB RAM'},
              {'name':'Storage','value':'30GB'},
              {'name':'Processor','value':'Intel Core i5-4430 / AMD FX-6300  memory: 8 GB RAM'},
              {'name':'OS','value':'64-bit   Windows 7 / Windows 8.1/ Windows 10'},
          ]
      }
  },
  methods:{
      configBtnClick(data){
          this.isAcrive = data
          if(data == 'advice'){
              this.configList=[
                {'name':'处理器','value':this.systemNeedsRecommends.Processor}, 
                {'name':'内存','value':this.systemNeedsRecommends.Memory},
                {'name':'显卡','value':this.systemNeedsRecommends.Graphics},
                {'name':'硬盘','value':this.systemNeedsRecommends.Storage},
                {'name':'系统','value':this.systemNeedsRecommends.OS}
            ]
          }else if(data == 'minimum'){
            this.configList=[
                {'name':'处理器','value':this.systemNeedsMins.Processor},
                {'name':'内存','value':this.systemNeedsMins.Memory},
                {'name':'显卡','value':this.systemNeedsMins.Graphics},
                {'name':'硬盘','value':this.systemNeedsMins.Storage},
                {'name':'系统','value':this.systemNeedsMins.OS}
            ]
          }
      }
  },
  mounted(){
    this.configList=[
        {'name':'处理器','value':this.systemNeedsMins.Processor},
        {'name':'内存','value':this.systemNeedsMins.Memory},
        {'name':'显卡','value':this.systemNeedsMins.Graphics},
        {'name':'硬盘','value':this.systemNeedsMins.Storage},
        {'name':'系统','value':this.systemNeedsMins.OS}
    ]
    // console.log(this.systemNeedsMins);
    // console.log(this.systemNeedsRecommends);
  }
}
</script>

<style lang="scss" scoped>
@import 'gameDetailsPublic.css';
</style>