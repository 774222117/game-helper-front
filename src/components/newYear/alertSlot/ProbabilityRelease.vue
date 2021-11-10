<template>
<!-- 概率公布 -->
<div class="freeGoldCoinsMain">
   <alertTitles titles='概率公布'></alertTitles>
   <!-- 概率公布 内容 -->
   <div class="freeGoldCoin">
       <div class="contents">
           <div class="items" v-for="item in probabilityInfo">
               <div class="itemLeft ft14">{{item.level}}</div>
               <div class="itemRight ft14">{{item.probability}}</div>
           </div>
       </div>
   </div>
</div>
</template>
<style lang="scss" scoped>
.freeGoldCoinsMain{
    width: 691px;
    height: 426px;
    padding-top: 40px;
    .freeGoldCoin{
        width: 507px;
        height: 342px;
        margin: 16px auto 0;
        overflow: hidden;
        background-color: #FFE6B3;
        .contents{
            width: 314px;
            height: 250px;
            border: 1px solid #EBCA86;
            margin: 45px auto 0;
            .items{
                width: 100%;
                height: 50px;
                border-bottom: 1px solid #EBCA86;
                color: #906F2A;
                display: flex;
                .itemLeft{
                    width: 50%;
                    height: 100%;
                    border-right: 1px solid #EBCA86;
                    text-align: center;
                    line-height: 50px;
                }
                .itemRight{
                    width: 50%;
                    height: 100%;
                    text-align: center;
                    line-height: 50px;
                }
            }
            .items:nth-last-of-type(1){
                border-bottom: none;
            }
            
        }
    }
}
</style>
<script>
import alertTitles from '@/components/newYear/alertTitles/alertTitles'
export default {
  name: 'probabilityRelease',
  components:{alertTitles},
  data(){
    return {
        probabilityInfo:[
            {level:'SSS赏',probability:'1.5%'},
            {level:'SS赏',probability:'5.5%'},
            {level:'S赏',probability:'18%'},
            {level:'A赏',probability:'25%'},
            {level:'B赏',probability:'55%'},
        ]
      }
  },
  created(){
      
  },
  mounted(){
      
  },
  methods:{
    
  }
}

</script>
