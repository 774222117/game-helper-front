<template>
  <div class="orderList" v-ga_pv="{'page_title':'我的订单页'}">
    <div class="title ft18 BangersRegular">我的订单</div>
    <ul class="list" v-if="myOrderListData.length>0">
      <li v-for="item in myOrderListData">
        <div class="top ft14 RobotoRegular">
          <div class="color_white_06">{{item.createTime}}</div>
          <div class="color_white_06">订单号:</div>
          <div class="color_white_06 margin_left_4">{{item.ordersn}}</div>
        </div>
        <div class="content RobotoRegular">
          <img :src="item.image" alt />
          <div class="color_white_08 border_right">{{ item.chinaName == "" ? item.englishName : item.chinaName}}</div>
          <div class="color_white_06 border_right">
              <div class="color_white_06 ft14">￥{{item.price}} </div>
              <!-- <div class="color_white_06 ft12">Online payment</div> -->
          </div>
          <div class=" color_white_06 border_right">{{ item.orderStatus | orderState  }}</div>
           <!-- isRefund //是否可以退款 0 否 1 是 -->
           <!-- orderStatus:['0未支付','1已付款 待发货','2已发货 订单完成','3已提取','4已退款','5退款中'] -->
          <!-- 订单状态为1  独享-->
          <div v-if="item.model == 1"> 
            <!-- 退款到哪里了 退款中或者已退款-->
            <div v-if="item.orderStatus == 4" class="color_white_06" @click="refundWhere">退到哪了?</div>
            <!-- 提取帐户 返回状态为3显示提取按钮-->
            <div v-else-if="item.orderStatus == 3 && false" class="color_white_06 isBorder" @click="extractTheAccount(item)">提取账号</div>
            <!-- 退款按钮 订单状态为2(已完成) 并且isRefund为1显示可以退款 -->
            <div v-else-if="item.orderStatus == 2 && item.isRefund == 1" class="color_white_06" @click="refundBtn(item)">申请退款</div>
            <!-- 已支付 不显示内容-->
            <div v-else-if="item.orderStatus == 1" class="color_white_06"></div>
            <!-- 如果全都都不是 就是空内容 -->
            <!-- <div v-else></div> -->
          </div>
          <!-- 订单状态为2  合玩-->
          <div v-if="item.model == 2"> 
            <!-- 退款到哪里了  退款中或者已退款-->
            <div v-if="item.orderStatus == 4" class="color_white_06" @click="refundWhere">退到哪了?</div>
            <!-- 退款按钮 订单状态为2(已完成) 并且isRefund为1显示可以退款-->
            <div v-else-if="item.orderStatus == 2 && item.isRefund == 1" class="color_white_06" @click="refundBtn(item)">申请退款</div>
            <!-- 已支付 不显示内容-->
            <div v-else-if="item.orderStatus == 1" class="color_white_06"></div>
            <!-- 如果全都都不是 就是空内容 -->
            <div v-else @click="refundBtn(item)"></div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="myOrderEmptyData">
      <div class="myOrderEmpty myOrderEmpty_bg">
        <div class="ft20 color_white_04">没有查询到购买订单</div>
        <div class="ft14 color_white_02" style="margin-bottom:100px;">快去商店挑选你喜欢的游戏吧~</div>
      </div>
    </div>
    <div class="infinite-scroll" v-show="loading">
      <!-- <svg class="loader-circular" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="rgb(53, 157, 218)" stroke-width="5"></circle>
      </svg> -->
      <span class="infinite-scroll-text">{{tips}}</span>
    </div>
    <AlertModel v-if="ifModelShowData" :ifModelType="ifModelTypeData" :ifModelShow="orderRefundData" @change="isAertModelShow"></AlertModel>
  </div>
</template>

<script>
import {setStore,getStore,removeStore} from '@/utils/storage.js'
import AlertModel from '@/components/AlertModel/alertModel'
let that;
export default {
  name: "orderList",
  components: {AlertModel},
  data(){
    return {
      // 订单参数
      findOrdersParamData:{
        current:1, //  1 当前页
        limit:10, // 12 页数量
        // peopleId:this.$store.getters.getStorage.id,// 1 人ID
        name:''//  游戏名称 查询
      },
      //我的订单列表数据
      myOrderListData:{},
      //订单状态数组
      // orderStatus:['未支付' , '已付款 待发货' , '已发货 订单完成' , '已提取' , '已退款' , '退款中'] 中文对照表,
      orderStatus:['未支付','待发货','订单完成','已提取','已退款','退款审核中'],
      //保存提取账号点击游戏的id
      codeId:'',
      //保存退款点击的游戏id
      refundId:'',
      //提取账号保存数据
      extractTheAccountDatas:'',
      //验证码保存
      mailVerificationCode:'',

      ifModelShowData:false,  //是否显示弹出框
      ifModelTypeData:1,  //弹出的type
      orderRefundData:{},//退款的游戏信息

      REQUIRE: true,
			loading: false,
			tips: '努力加载中...'
    }
  },
  created(){
      this.init()
  },
  mounted(){
		window.addEventListener('scroll',this.scrollBtm)
	},
  methods:{
    init(){
      let _this = this;
      // 我的订单列表 
      _this.$fetch('/account/findOrders',_this.findOrdersParamData)
          .then((response) => {
            if(response.flag){
              _this.myOrderListData = response.data.rows
            }else{
              console.log(response.message)
            }
      })
    },
    // 退款按钮
    refundBtn(item){
      this.orderRefundData = item
      this.refundId = item.id
      this.ifModelTypeData = 1
      this.ifModelShowData = true
    },
    // 推到哪儿
    refundWhere(){
      this.ifModelTypeData = 4
      this.ifModelShowData = true
    },
    // 提取账号
    extractTheAccount(item){
      this.codeId = item
    },
    scrollBtm(){
			//变量scrollTop是滚动条滚动时，距离顶部的距离
			var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			//变量windowHeight是可视区的高度
			var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			//变量scrollHeight是滚动条的总高度
			var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
           //滚动条到底部的条件
      let _this = this;
			if (scrollTop + windowHeight + 20 >= scrollHeight && _this.REQUIRE) {
				// 请求的数据未加载完成时，滚动到底部不再请求前一天的数据
				_this.REQUIRE = false;
				_this.loading = true;
				_this.tips = '努力加载中...';
				if(_this.findOrdersParamData.current == 1){_this.findOrdersParamData.current=2}
				_this.$fetch('/account/findOrders',_this.findOrdersParamData)
					.then((response) => {
              _this.myOrderListData = _this.myOrderListData.concat(response.data.rows)
              if(response.data.rows.length == 0){
                _this.$nextTick(() => {
                  _this.REQUIRE = false;
                  _this.loading = false;
                });
              }else{
                _this.$nextTick(() => {
                  _this.REQUIRE = true;
                  _this.loading = false;
                  _this.findOrdersParamData.current++
                });
              }
              
					}).catch(() => {
						_this.tips = '连接失败，请稍后重试';
						// 请求失败时，将 REQUIRE 置为 true，滚动到底部时，再次请求
						_this.REQUIRE = true;
					});
			}
    },
    // 接收子组件传来的值确定弹框是否关闭
    isAertModelShow(data,n){
      this.ifModelShowData = data
    }
  },
  //过滤器使用
  beforeCreate: function () {
      that  = this;
  },
  filters:{
    orderState(data){
      let value = that.orderStatus[data]
      return value
    }
  }
};
</script>
<style lang="scss" scoped>
.orderList {
  width: 1280px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  color: #fff;
  padding: 32px 62px 0;
  .title {
    height: 23px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 2px;
  }
  .list {
    & > li {
      height: 171px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      margin-top: 16px;
      color: rgba(255, 255, 255, 1);
      .top {
        height: 48px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        line-height: 48px;
        padding-left: 16px;
        div {
          letter-spacing: 1px;
          float: left;
          &:first-child {
            margin-right: 32px;
          }
        }
      }
      .content {
        padding-left: 16px;
        height: 122px;
        display: flex;
        justify-content: space-between;
        align-items: center;        
        img {
          width: 160px;
          height: 75px;
          display: block;
        }
        &>div {
          height: 41px;
          padding: 0 16px;
          box-sizing: border-box;
          font-size: 14px;
          line-height: 19px;
          letter-spacing: 1px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:nth-of-type(1) {
            width: 302px;
          }
          &:nth-of-type(2) {
            width: 201px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          &:nth-of-type(3) {
            width: 212px;
          }
          &:nth-of-type(4) {
            width: 262px;
            cursor: pointer;
          }
        //   &:not(:last-child)::after {
        //     content: "";
        //     height: 41px;
        //     width: 1px;
        //     background-color: #fff;
        //     float: right;
        //   }
        }
      }
    }
  }
  .myOrderEmptyData{
    width: 100%;
    height: 715px;
    .myOrderEmpty{
      width: 500px;
      height: 500px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
.border_right{border-right: 1px solid rgba(255, 255, 255, 0.1)}
.isBorder{border-radius:2px;border:1px solid rgba(255,0,54,1);padding: 10px 16px}

.infinite-scroll{
	width:100%;
	height: 30px;
}
.infinite-scroll-text{
	display: block;
	width: 100%;
	height: 100%;
	line-height: 30px;
	text-align: center;
	font-size: 22PX;
}
</style>
