<template>
  <!-- 分页评测 -->
<div class="pagingContentMain">
    <transition v-for="(items) in commentThreeData">
        <Comment :items="items" />
    </transition>
    <div class="pagingContent" v-if="100 > 0">
        <div class="page ft14 color_white_1">
            <!-- //这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值 -->
            <paging v-if="ifpagings" :dataAll="all" :dataCur="cur" :datanum="num" :dataDatanum="dataNum" @change="pageChange"></paging>
        </div>
    </div>
</div>
</template>

<script>
import Comment from '@/components/comment/comment';  //评论带分页
import Paging from '../../components/pager/pager';
export default {
  name: 'commentPage',
  props: [],
  components:{Comment,Paging},
  data(){
      return {
        all: 40, //总页数
        cur: 1, //当前页码
        num: 7, //一页显示的数量  必须是奇数
        dataNum: 200, //数据的数量
        ifpagings:true,
        isActive:true,  //控制执行时间 次数 分页的@change pageChange 会执行两次
        commentThreeData:{}, //给到评论的数据

        findDataParams:{'appid':'','offset':1,'limit':10},		//获取搜索数据参数
      }
  },
  activated(){
    
  },
  mounted(){
    this.findDataParams.appid = this.$route.query.appId;
    this.$fetch('/game/listGameComments',this.findDataParams)
      .then((response) => {
          this.commentThreeData = response.data.rows

          this.all = Math.ceil(response.data.total / this.findDataParams.limit)  //总页数
          this.cur = response.data.offset  //当前页码
          this.num = 9  //一页显示的数量  必须是奇数
          this.dataNum = response.data.total  //数据的数量
      })
  },
  methods:{
    //子级传值到父级上来的动态拿去
    pageChange: function(page) {
      let _this = this
      if(_this.isActive){
        _this.isActive = false
        if(page == 0){ page = 1}
        _this.cur = page
        _this.findDataParams.offset = page
        _this.$fetch('/game/listGameComments',_this.findDataParams)
        .then((response) => {
          _this.commentThreeData = response.data.rows
          _this.isActive = true
        })
      }else{
        return
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.pagingContentMain{
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    // 分页盒子
    .pagingContent{
        width: 100%;
        height: 153px;
    }

}
</style>
