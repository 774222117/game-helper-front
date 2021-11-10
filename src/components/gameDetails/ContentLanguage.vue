<template>
    <div class="contentLanguageBox">
        <!-- <div class="languageTitle">
            <div class="ft14 color_white_04">{{languageTitle[0]}}</div>
            <div class="ft14 color_white_04">{{languageTitle[1]}}</div>
            <div class="ft14 color_white_04">{{languageTitle[2]}}</div>
            <div class="ft14 color_white_04">{{languageTitle[3]}}</div>
        </div> -->
        <transition v-for="(item , index) in supportedlang" :key="index">
            <div class="languageContent" v-if="index < 3">
                <div class="firstBox1 textOver ft14 color_white_04">{{ item.title }}</div>
                <div class="firstBox2"> <div class="hookUpSty" v-if="item.interfaced == 1"> <svg-icon iconClass='blueHookUp' className='svg_icon'></svg-icon> </div></div>
                <div class="firstBox3"> <div class="hookUpSty" v-if="item.fullAudio == 1"> <svg-icon iconClass='blueHookUp' className='svg_icon'></svg-icon> </div></div>
                <div class="firstBox4"> <div class="hookUpSty" v-if="item.subtitles == 1"> <svg-icon iconClass='blueHookUp' className='svg_icon'></svg-icon> </div></div>
                <!-- <div class="textOver ft14 color_white_04">{{ item.title }}</div>
                <div class="ft14 color_white_08">
                    <div class="hookUpSty"> <svg-icon iconClass='redHookUp' className='svg_icon'></svg-icon> </div>
                    <span class="ft14 color_white_08">支持</span>
                </div> -->
            </div>
        </transition>  
    </div>
</template>

<script>
export default {
  name: 'ContentLanguage',
  props:['supportedlang'],
  data(){
      return {
          languageTitle:[' ','interface','Complete audio','subtitles']
      }
  },
  mounted(){
    //   console.log(this.supportedlang)
  }
}
</script>

<style lang="scss" scoped>
@import 'gameDetailsPublic.css';
</style>