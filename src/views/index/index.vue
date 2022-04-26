<template>
<!-- 外层大盒子 -->
<div class="main indexBg_bg" v-ga_pv="{'page_title':'首页'}">
	<div class="content">
		<div class="contentMain" ref="scrollContainer" @wheel="handleScroll">
			<!-- 轮播 -->
			<div class="bannerSwiper">
				<!-- 小编精选 -->
				<div class="selectedWorks">
					<!-- <selectedWorks v-if="partialrefresh"/> -->
					<selectedNewWorks v-if="partialrefresh"/>
				</div>
			</div>
			<!-- 特惠 秒杀 -->
			<div class="todaySpecialAddseckill">
				<!-- 秒杀 -->
				<div class="seckillMainBox" >
					<div class="titles"><indexTitle :text="'限量秒杀'" :labels="['低至2折']" :indexTitleIcon="'indexTitleIcon1'" /></div>
					<div class="seckillContent" v-if="partialrefresh">
						<seckill />
					</div>
				</div>
				<!-- 今日特惠 -->
				<div class="todaySpecial">
					<!-- 标题 -->
					<div class="titles"> <indexTitle :text="'今日特惠'" :labels="['正版游戏','限时特惠']" :indexTitleIcon="'indexTitleIcon4'" @change="reloadFun" /> </div>
					<!-- 今日特惠内容 -->
					<div class="todaySpecialContent" v-if="!!todaySpecialData">
						<todaySpecial :items="todaySpecialData"/>
					</div>
				</div>
			</div>
			
			<!-- 热销 与 折扣 -->
			<div class="hotSaleAddDiscount">
				<div class="hotSaleAddDiscountContent">
					<div class="hotSaleBox">
						<!-- 热销标题 -->
						<div class="hotSaleTitle">
							<div class="titles"> <indexTitle :text="'热销排行'" :labels="['正版游戏']" :indexTitleIcon="'indexTitleIcon2'" @change="reloadFun" /> </div>
						</div>
						<div class="hotSaleContents" v-if="!!hotSale">
							<transition v-for="i in hotSale" >
								<hotSaleAddDiscount :items="i" :types="'hot'" />
							</transition>
							<div class="seeMore ft16 opc_hover8 color_white_1 back4" @click="viewMore(1)">查看更多 <div class="downMore"><svg-icon iconClass="arrow" class="svg_icon"></svg-icon></div></div>
						</div>
						
					</div>
					<div class="discountBox">
						<!-- 折扣标题 -->
						<div class="discountTitle">
							<div class="titles"> <indexTitle :text="'折扣热销'" :labels="['最低一折','正版游戏']" :indexTitleIcon="'indexTitleIcon3'" @change="reloadFun" /> </div>
						</div>
						<div class="discountContents" v-if="!!discount">
							<transition v-for="i in discount" >
								<hotSaleAddDiscount :items="i" :types="'discount'" />
							</transition>
							
							<div class="seeMore ft16 opc_hover8 color_white_1 back4" @click="viewMore(2)">查看更多 <div class="downMore"><svg-icon iconClass="arrow" class="svg_icon"></svg-icon></div></div>
						</div>
					</div>
				</div>
			</div>
			<!-- 下滑查看专属 -->
			<div class="viewExclusive">
				<div class="icons"> <svg-icon iconClass="downMore" class="svg_icon"></svg-icon> </div>
				<div class="texts ft16 color3">下滑查看专属推荐游戏</div>
			</div>
			<!-- 假测游戏 -->
			<div class="falseGame"></div>
		</div>
		<div class="footerBox footerBanner_bg" v-if="footerBoxShow == 0">
			<div class="receiveBtn" :class="receiveBtnShow == 1 ?'receiveBtn1_bg':'receiveBtn_bg'" @click="receiveBtnFun" v-on:mouseenter="visible(0)" @mouseleave="visible(1)"></div>
		</div>
	</div>
	<rollVideo v-if="displayRollVideo" :appids="appidData[appidIndex]" @change="displayRollVideoFun" @wheel.native="handleScroll" />
	<!-- 春节折扣活动入口 -->
	<!-- <discountNewYearAlert v-if="true" />  -->
	<!-- <nationalDayAlert v-if="isActiveJoin" :loginState='isActiveJoin' :dailyLogin='activityAlert' :item='userInfo' @change="closeNewYear"></nationalDayAlert> -->
</div>
</template>

<script>

// import selectedWorks from '@/components/indexs/bannerSwiper/selectedWorks';//小编精选  轮播的  
import selectedNewWorks from '@/components/indexs/bannerSwiper/selectedNewWorks';//小编精选  轮播的  
import recommendation from '@/components/indexs/bannerSwiper/recommendation';//重磅推荐  轮播的  
import indexTitle from '@/components/indexs/title/indexTitle';//标题
import todaySpecial from '@/components/indexs/todaySpecial/todaySpecial';//今日特惠
import hotSaleAddDiscount from '@/components/indexs/hotSaleAddDiscount/hotSaleAddDiscount';//热销与折扣排行
import seckill from '@/components/indexs/seckill/seckill';//秒杀
import rollVideo from '@/components/indexs/rollVideo/rollVideo';//滚动视频
import loading from '../../components/Loading/loading';  //加载中
import JumpTo from '@/utils/jumpTo'  //跳转函数
// import nationalDayAlert from '@/components/NationalDay/nationalDayAlert';//新年活动弹窗
import discountNewYearAlert from '@/components/discountNewYear/discountNewYearAlert';//2022年折扣活动弹窗
import {setStore,getStore,removeStore}  from '@/utils/storage'
import store from '@/store'
export default {
	components: {
		JumpTo,
		loading,
		// selectedWorks,
		selectedNewWorks,
		recommendation,
		indexTitle,
		todaySpecial,
		seckill,
		hotSaleAddDiscount,
		rollVideo,
		// nationalDayAlert
		discountNewYearAlert,
	},
	inject:['reload','openRegister'],
	data(){
		return {
			partialrefresh:true,//刷新banner
			hotSale:[], //热销游戏
			discount:[], //折扣游戏
			todaySpecialData:[],//今日特惠
			bannerChange:true,//轮播切换
			isScrollBtm:false,//是否滚动到最底部	
			isScroll:true,//是否可以继续执行 做节流1秒只能执行一次
			displayRollVideo:false,//滚动视频
			appidData:[],
			appidIndex:0,
			// userInfo:{'userInfo':0,'card':0},
			isActiveJoin:true,//是否登录
			userInfo:false,
			activityAlert:true,//新年活动弹窗显示隐藏状态
			discountNewYearAlert:true,
			receiveBtnShow:1,//底部按钮划上效果切换
			footerBoxShow:false, //底部默认不显示
		}
	},
	watch:{
		'$route':function(data){
			if(data.path !== '/'){
				this.displayRollVideoFun(false)
				this.isScrollBtm = false
				window.removeEventListener('scroll', this.handleScrolls,true);
			}else{
				this.partialrefresh= false
				this.$nextTick(function(){
					this.partialrefresh= true
					// 今日特惠 无参数  /index/v2/today/discount
					this.$fetch('/index/v2/today/discount')
						.then((response) => {
							this.todaySpecialData = response.data
						})
				})
				window.addEventListener('scroll', this.handleScrolls,true);
			}
		}
	},
	activated(){
		
	},
	mounted(){
		this.inits()
		window.addEventListener('scroll', this.handleScrolls,true);
	},
	methods:{
		inits(){
			// hotSaleAddDiscount
			var _this = this;
			if(!!_this.$store.getters.getStorage){
				// // 领取优惠券
				_this.$fetch('/product/rolls/join')
				.then((response) => {
					// 进页面就需要获取商品券信息（用户有几张商品券）
					_this.$store.commit('setCouponNumber',response.data.count)
					if(response.flag){
						// console.log(response.data)
						// 弹出弹窗
						if(response.data.available == 1){
							_this.$store.commit('setGameCouponAlert',true)
						}
						_this.$store.commit('setAlertGameInfo',response.data)
					}else{
						console.log(response.message)
					}
				})
			}else{
				// 没登陆调用登陆窗口
                _this.openRegister(true)
			}
			// 热销游戏 无参数
			_this.$fetch('/index/hotSales')
				.then((response) => {
					_this.hotSale = response.data
				})
			// 折扣游戏 无参数
			_this.$fetch('/index/rebates')
				.then((response) => {
					_this.discount = response.data
				})
			// 今日特惠 无参数  /index/v2/today/discount
			_this.$fetch('/index/v2/today/discount')
				.then((response) => {
					_this.todaySpecialData = response.data
				})	
			// 获取滚动视频的appid数组接口  获取推荐的游戏APPID数组
			_this.$fetch('/index/v2/only/you')
				.then((response) => {
					_this.appidData = response.data
				})
			// 判断用户是否参与过活动
			if(!!_this.$store.getters.getStorage){
				_this.$fetch('/people/activity/join')
				.then((response) => {
					if(response.flag){
					_this.footerBoxShow = response.data
					}else{
					console.log('下面的数据，没有数据')
					}
				})
			}
			
			// 判断用户是否参加过新年转盘活动 下架_this.isActiveJoin  false
			if(!!_this.$store.getters.getStorage && _this.isActiveJoin){//如果登陆成功
				// _this.isActiveJoin = true;//显示新春活动弹窗
				if(!!getStore({name:'loginDiscount',type:false})){//保存storage数据
					var activeInfo = getStore({name:'loginDiscount',type:false})//用activeInfo值去保存storage数据
				}else{
					var activeInfo = {
					'value':'',//当前用户是否参加过活动
					'active':0,//当前用户当前是否点击过去看看
					'newTime':{'month':0,'day':0},//记录当天点击过去看看的时间
					}
				}
				_this.$fetch('/lucky/turntable/join')//请求数据
				.then((response) => {
					if(response.flag){//如果参加了活动
						activeInfo.value = response.flag//用activeInfo.value的值去记录当前用户是否参加过活动
						_this.userInfo = response.flag//用全局定义的userInfo去保存用户是否参加过活动
						
						// 再次打开页面的时间 > 上次点击弹窗进入活动页的时间
						if(new Date().getMonth() > activeInfo.newTime.month || new Date().getDate() > activeInfo.newTime.day){
							this.activityAlert = true;//如果过了1天，重新打开页面则弹出新春活动弹窗，点击去看看之后并保持新的用户点击时间
						}else{
							this.activityAlert = false;//如果时间没有大于保持的时间，则只显示右下小弹窗
							activeInfo.active = 0;//并且将用户当天是否点击‘去看看’修改为0
						}
						// 保存storage信息，名字:'loginNewYear',content:'activeInfo',类型false
						setStore({name:'loginDiscount',content:activeInfo,type:false})//创建用户信息
					}else{
						// 如果没有参加活动
						console.log('没有获取到token信息')
						// 也要保存用户信息
						setStore({name:'loginDiscount',content:activeInfo,type:false})//也创建用户信息
					}
					// 删除上一次活动的loginTurnNewYear  store
					removeStore({name:'loginTurnNewYear'})
					removeStore({name:'loginTurn51'})
					removeStore({name:'loginTurn101'})
					removeStore({name:'loginTurn1225'})
				})
			}else{
				// 删除活动本地缓存
				removeStore({name:'loginTurnNewYear'})
				removeStore({name:'loginTurn51'})
				removeStore({name:'loginTurn101'})
				removeStore({name:'loginTurn1225'})
			}
		},
		// 标题点击刷新
		reloadFun(data){
			var _this = this;
			switch (data) {
				case '今日特惠':
					_this.todaySpecialData = ''
					_this.$fetch('/index/v2/today/discount')
						.then((response) => {
							_this.todaySpecialData = response.data
						})
					break;
				case '热销排行':
					// 热销游戏 无参数
					_this.$fetch('/index/v2/hotSales')
						.then((response) => {
							_this.hotSale = response.data
						})
					break;
				case '折扣热销':
					// 折扣游戏 无参数
					_this.$fetch('/index/v2/rebates')
						.then((response) => {
							_this.discount = response.data
						})
					break;
				default:
					break;
			}
		},
		// 滚动条
		handleScrolls(){
			let _this = this;
			//变量scrollTop是滚动条滚动时，距离顶部的距离
			var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			//变量windowHeight是可视区的高度
			var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			//变量scrollHeight是滚动条的总高度
			var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
				//滚动条到底部的条件
				if(scrollTop+windowHeight - scrollHeight == 0){
					//到了这个就可以进行业务逻辑加载后台数据了
					_this.isScrollBtm = true;
				} else{
					_this.isScrollBtm = false;
				}
		},
		// 滚轮事件
		handleScroll(e) {
			// wheelDelta：获取滚轮滚动方向，向上120，向下-120，但为常量，与滚轮速率无关
			// deltaY：垂直滚动幅度，正值向下滚动。电脑鼠标滚轮垂直行数默认值是3
			// wheelDelta只有部分浏览器支持，deltaY几乎所有浏览器都支持
			if(this.isScrollBtm){
				if(e.deltaY < 0){
					this.displayRollVideoFun(false)
				}
				if(this.isScroll){
					this.isScroll = false
					if(e.deltaY > 0){
						this.displayRollVideoFun(true)
						this.appidIndex = (this.appidIndex + 1)%this.appidData.length
					}else{
						// if(this.appidData.length - this.appidIndex < 10){}
						// 获取滚动视频的appid数组接口  获取推荐的游戏APPID数组
						// this.$fetch('/index/v2/only/you')
						// 	.then((response) => {
						// 		this.appidData = response.data
						// 	})
					}
					setTimeout(()=>{
						this.isScroll = true
					},300)
				}
			}
		},
		// 是否显示滚动视频
		displayRollVideoFun(data,types){
			if(types == 'openOrder'){
				this.displayRollVideo = data
			}else{
				this.displayRollVideo = data
			}
			
		},
		//查看更多
		viewMore(data){
			if(data == 1){
				// 热销
				JumpTo(1,{orderType:3})
			}else if(data == 2){
				// 折扣
				JumpTo(1,{priceType:4})
			}
					
		},
		
		// 底部立即领取鼠标事件
		visible(data){
			this.receiveBtnShow = data
		},
		// 底部按钮点击跳转
		receiveBtnFun(){
			if(!!this.$store.getters.getStorage){
				JumpTo(8)
			}else{
				if(!!this.openRegister){
					this.openRegister(true)
				}else{
					console.log('没得openRegister方法')
				}
			}
		},
		// 控制newYearAlert组件弹窗显示隐藏
		closeNewYear(tag){
			this.activityAlert = tag
		},
		// 关闭实名认证窗口
		closeRealName(data){
			this.showRealName = data
		},
	}
}
</script>
<style  lang="scss" scoped>
.main{
	width: 100%;
	height: auto;
	.content{
		width: 1280px;
		// height: 21rem;
		margin: 0 auto;
		padding: 23px 60px 0px;
		box-sizing: border-box;
		// overflow: hidden; 为了不使用超出隐藏解决margin父元素起作用的问题 加了padding-top
		.contentMain{
			width: 100%;
			height: 100%;
			// 轮播
			.bannerSwiper{
				width: 100%;
				height: 287px;
				// 小编精选
				.selectedWorks{
					width: 100%;
					height: 100%;
				}
			}
			// 特惠秒杀
			.todaySpecialAddseckill{
				width: 100%;
				height: 276px;
				margin-top: 39px;
				padding-top: 1px;
				display: flex;
				justify-content: space-between;
				// 秒杀
				.seckillMainBox{
					width: 452px;
					height: 100%;
					.seckillContent{
						width: 100%;
						height:220px;
					}
				}

				// 今日特惠
				.todaySpecial{
					width: 697px;
					height: 100%;
					// 今日特惠 内容
					.todaySpecialContent{
						width: 100%;
						height: 217px;
						display: flex;
					}
				}
			}
			
			// 热销 与 折扣
			.hotSaleAddDiscount{
				width: 100%;
				height: 715px;
				margin-top: 40px;
				.hotSaleAddDiscountContent{
					width: 100%;
					height: auto;
					display: flex;
					justify-content: space-between;
					// 热销
					.hotSaleBox{
						width: 555px;
						height: 715px;
						.hotSaleContents{
							width: 100%;
							height: 619px;
						}
					}
					// 折扣
					.discountBox{
						width: 555px;
						height: 715px;
						.discountContents{
							width: 100%;
							height: 619px;
						}
					}
				}
				
			}
			// 下滑查看专属
			.viewExclusive{
				width: 100%;
				height: 100px;
				display: flex;
				align-items: center;
				justify-content: center;
				.icons{
					width: 18px;
					height: 18px;
				}
			}
			// 假的游戏
			.falseGame{
				width: 100%;
				height: 80px;
				background-color: rgba(17,25,33,1)
			}
		}
	}
}
// 标题
.titles{
	width: 100%;
	height: 44px;
	margin-bottom: 15px;
}
// 查看更多
.seeMore{
	width: 100%;
	height: 40px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	.downMore{
		width: 20px;
		height: 20px;
		margin-left: 10px;
		transform: rotateZ(90deg);
	}
}
// 底部常驻
.footerBox{
	width: 100%;
	height: 90px;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 19;
	.receiveBtn{
		width: 155px;
		height: 58px;
		position: absolute;
		right: 70px;
		top: 16px;
		cursor: pointer;
	}
}
</style>
