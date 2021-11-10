<template>
<!-- 外层 -->
	<div class="allGameBox" v-ga_pv="{'page_title':'搜索页'}">
		<!-- 内层大盒子 -->
		<div class="allGameMain">
			<!-- 左边的列表 -->
			<div class="leftListBox RobotoRegular">
				<!-- 左边头部标题 -->
				<div class="listTopTitle">
					<div class="titleText ft12 color_white_06">共{{findDataTotal || 0}}款游戏</div>
					<div class="listTopTitleBtn">
						<div class="recentHot ft12 color_white_1 opc_hover6" :class="findDataParams.orderType==3?'orderTypeSort color3':''" @click="orderTypeSort(3)">热销排序</div>
						<div class="recentHot ft12 color_white_1 opc_hover6" :class="findDataParams.orderType==1?'orderTypeSort color3':''" @click="orderTypeSort(1)">折扣热销</div>
						<div class="shelfTime ft12 color_white_1 opc_hover6" :class="findDataParams.orderType==2?'orderTypeSort color3':''" @click="orderTypeSort(2)">最近上架</div>
					</div>
				</div>
				<!-- 左边列表 -->
				<div class="gameListMainBox" v-if="ifLoading && findData.length > 0">
					<div class="gameListItems back4" v-for="(item,index) in findData">
						<gameList :gameListData="item"></gameList>
					</div>
				</div>
				<div class="gameListMainBox" v-if="!ifLoading">
					<loading/>
				</div>
				<div v-if="findData.length <= 0" class="emptyData">
					<div class="allGameEmpty allGameEmpty_bg">
						<div class="ft20 color_white_04">Your Search Criteria Returns No Results</div>
						<div class="ft14 color_white_02" style="margin-bottom:100px;">Please Try Searching Other Games</div>
					</div>
				</div>
				<div class="pagingContent" v-if="findData.length > 0">
					 <div class="page ft14 color_white_1">
						<!-- //这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值 -->
						<paging v-if="ifpagings" :dataAll="all" :dataCur="cur" :datanum="num" :dataDatanum="dataNum" @change="pageChange"></paging>
					</div>
				</div>
				<!-- **************************************************** -->
				<!-- <div class="infinite-scroll" v-show="loading">
					<span class="infinite-scroll-text">{{tips}}</span>
				</div> -->
			</div>
			<!-- 右边的筛选条件 -->
			<div class="rightScreenConditionBox">
				<div class="gameLabel">
					<div class="gameLabelTitle">
						<div class="ft14 color_white_1 ft_weight margin_right_4">标签</div>
						<div class="smallLabel ft12 ft_weight">The label</div>
					</div>
					<div class="gameLabelItems">
						<div class="gameLabelItem ft12 color_white_08 textOver" :class="labelItems.indexOf(n) >= 0?'gameLabelItemActive':''" v-for="(n,index) in findTags" @click="gameLabelClick(index,n)">{{n}}</div>
					</div>
					<div class="openMore ft12 color_white_06"  @click="moveFindTags">{{moveFindTagsText == 1?'展开更多':'收起'}}</div>
				</div>
				<!-- <div class="labelScreenCondition">
					<div class="titleScreenCondition ft18 color_white_1 BangersRegular">标签</div>
					<div class="labelItemBox">
						<div class="labelItem ft12 opc_hover8" v-for="(n,index) in findTags" @click="gameLabelClick(index,n)">
							<div class="labelDivBox margin_right_16 opc_hover8 border_radius_4"><svg-icon v-if="labelItems.indexOf(n) >= 0" iconClass='whiteHookUp' className='svg_icon'></svg-icon></div>
							<div class="ft12 color_white_08 textOver RobotoRegular">{{n}}</div>
						</div>
					</div>
					<div class="allLabelBtn ft12 color_white_06" @click="moveFindTags">展开更多</div>
				</div> -->
				<div class="priceScreenCondition margin_top_16"> 
					<div class="gameLabelTitle">
						<div  class="ft14 color_white_1 ft_weight margin_right_4">价格筛选</div>
						<div class="smallLabel ft12 ft_weight">price</div>
					</div>
					<div class="priceItemBox">
						<div class="priceItem ft12 color_white_08 opc_hover8" v-for="(n,index) in priceItemList" @click="priceTypeClick(index)" :class="{active:currentType == index}">{{n}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import JumpTo from '@/utils/jumpTo'
import gameList from '../../components/gameList/gameList';
import Paging from '../../components/pager/pager';
import loading from '../../components/Loading/loading';
export default {
	name: 'allGame',
	components: {
		JumpTo,
		gameList,
		Paging,
		loading
	},
	data(){
		return {
			all: 0, //总页数
            cur: 1, //当前页码
            num: 9, //一页显示的数量  必须是奇数
			dataNum: 0, //数据的数量
			ifpagings:false,
			isActive:true,  //控制执行时间 次数 分页的@change pageChange 会执行两次
			ifLoading:false,     //加载中
			labelItems:[],//标签选中的值
			priceItemList:['低于 ¥20','¥20～¥50','¥50～¥100','大于¥100'],//'150+',
			findDataTotal:'',	//游戏总数
			findTags:'',		//获取标签数据
			findTagsParams:{'param':'tag','language':'chinese','limit':10},		//标签数据参数
			findData:'',		//获取搜索数据
			findDataParams:{'current':1,'limit':10,'orderType':1},		//获取搜索数据参数

			moveFindTagsText: 1,
			currentType:-1, //选中的价格区间
		}
	},
	computed:{
		
	},
	
	// watch:{
	// 	'$route' (to, from) {
	// 		console.log(to)
	// 		console.log(from)
	// 		console.log('--------------------------------')
	// 		this.pageInit()
	// 	}
	// },
	mounted(){
		this.pageInit()
		// window.addEventListener('scroll',this.scrollBtm)
	},
	methods:{
		pageInit(){
			let _this = this;
			_this.findDataParams = {'current':1,'limit':10,'orderType':1}  //每次进来重新赋值
			_this.findDataParams = Object.assign(_this.findDataParams, _this.$route.query);  //合并链接上的参数为新的参数
			//查找标签
			_this.findTagsParams.limit = 10
			_this.$fetch('/game/findTags',_this.findTagsParams)
				.then((response) => {
					// _this.findTags = response.data
					_this.parameterAssignment(response,[{name:'findTags',value:''}])
				})
			// 搜索按钮  参数
			_this.$fetch('/index/findData',_this.findDataParams)
				.then((response) => {
					// _this.findData = response.data.rows
					// _this.findDataTotal = response.data.total
					_this.parameterAssignment(response,[{name:'findData',value:'rows'},{name:'findDataTotal',value:'total'}])
				})
		},
		//热销与限时折扣排序
		orderTypeSort(data){
			let _this = this;
			_this.ifLoading = false //加载中
			_this.findDataParams.orderType = data
			_this.findDataParams.current = 1
			_this.$fetch('/index/findData',_this.findDataParams)
				.then((response) => {
					// _this.findData = response.data.rows
					// _this.findDataTotal = response.data.total
					_this.parameterAssignment(response,[{name:'findData',value:'rows'},{name:'findDataTotal',value:'total'}])
				})
		},
		//标签筛选
		gameLabelClick(index,n){
			var _this = this;
			_this.ifLoading = false //加载中
			if(_this.labelItems.indexOf(n) >= 0){
				_this.labelItems.splice(_this.labelItems.indexOf(n),1)
			}else{
				_this.labelItems.push(n)
			}
			_this.findDataParams.tags = _this.labelItems.join()
			_this.findDataParams.current = 1
			_this.$fetch('/index/findData',_this.findDataParams)
				.then((response) => {
					// _this.findData = response.data.rows
					// _this.findDataTotal = response.data.total
					_this.parameterAssignment(response,[{name:'findData',value:'rows'},{name:'findDataTotal',value:'total'}])
				})
		},
		//更多标签点击
		moveFindTags(){
			let _this = this;
			if(_this.moveFindTagsText == 1){
				_this.findTagsParams.limit = 20 
				_this.moveFindTagsText = 2
			}else{
				_this.findTagsParams.limit = 10 
				_this.moveFindTagsText = 1
			}
			_this.$fetch('/game/findTags',_this.findTagsParams)
			.then((response) => {
				_this.findTags = response.data
				// _this.parameterAssignment(response,[{name:'findTags',value:''}])
			})
		},
		//priceType 价格筛选 参数值 0 1 2 3 4
		priceTypeClick(num){
			let _this = this;
			if(_this.currentType == num){
				_this.currentType = -1
				delete _this.findDataParams.priceType
			}else{
				_this.currentType = num
				_this.findDataParams.priceType = num
			}
			_this.ifLoading = false //加载中
			// _this.findDataParams.priceType = _this.currentType
			_this.findDataParams.current = 1
			_this.$fetch('/index/findData',_this.findDataParams)
				.then((response) => {
					_this.parameterAssignment(response,[{name:'findData',value:'rows'},{name:'findDataTotal',value:'total'}])
				})
		},
		//封装赋值函数 统一处理出错信息
		parameterAssignment(response,data){
			let _this = this;
			_this.dataNum = response.data.total  //总数据条数
			_this.all = Math.ceil(response.data.total / _this.findDataParams.limit)   //总页数
			_this.cur = response.data.current
			_this.$nextTick( ()=>{
				_this.ifpagings = true
			} )
			if(response.flag){
				data.forEach(element => {
					if(element.value){
						_this[element.name] = response.data[element.value]
					}else{
						_this[element.name] = response.data
					}
				});
			}else{
				console.log(response.message)
			}
			_this.ifLoading = true
		},
		//图片点击跳转事件
		itemClick(data){
			JumpTo(2,{'appId': data})
		},
		//子级传值到父级上来的动态拿去
        pageChange: function(page) {
			let _this = this
			_this.ifLoading = false //加载中
			if(_this.isActive){
				_this.isActive = false
				_this.cur = page
				_this.findDataParams.current = page
				_this.$fetch('/index/findData',_this.findDataParams)
				.then((response) => {
					// _this.findData = response.data.rows
					// _this.findDataTotal = response.data.total
					_this.parameterAssignment(response,[{name:'findData',value:'rows'},{name:'findDataTotal',value:'total'}])
					_this.isActive = true
				})
			}else{
				return
			}
        }
	}
}
</script>
<style lang="scss" scoped>
.allGameBox{
    width: 100%;
	overflow: hidden;
	.allGameMain{
		width:1156PX;
		margin: 32px auto 0;
		display: flex;
		justify-content: space-between;
		// 左边列表
		.leftListBox{
			width: 848px;
			height: 100%;
			// 左边title标题
			.listTopTitle{
				width: 100%;
				height: 28px;
				margin-bottom: 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.titleText{
					width: 554px;
					height: 28px;
					line-height: 28px;
				}
				.listTopTitleBtn{
						width:auto;
						height:28px;
						display: flex;
						justify-content: space-between;
						align-items: center;
					.recentHot ,
					.shelfTime{
						width:auto;
						padding: 0 22px;
						height:28px;
						line-height: 28px;
						cursor: pointer;
						text-align: center;
						border:1px solid rgba(255,255,255,0.2);
						
					}
					.orderTypeSort{
						opacity: 1;
						border:1px solid rgba(86, 159, 203, 1);
					}
				}
			}
			// 游戏列表
			//.gameListMainBox{
			// 	.gameListBox{
			// 		width: 100%;
			// 		height: 90px;
			// 		display: flex;
			// 		justify-content: space-between;
			// 		align-items: center;
			// 		cursor: pointer;
			// 		.leftImg{
			// 			width: 192px;
			// 			height: 90px;
			// 			&>img{width: 100%;height: 100%;display: block;border-radius: 4px; transition: all 0.3s ease}
			// 		}
			// 		.leftImg:hover img{ transform: scale(1.1)}
			// 		.middleText{
			// 			width: 460px;
			// 			height: 90px;
			// 			// 游戏列表标题
			// 			.gameTitle{
			// 				width: 100%;
			// 				height: 22px;
			// 				display: flex;
			// 				justify-content: start;
			// 				align-items: center;
			// 				.gameTitleText{
			// 					max-width: calc(100% - 30px);
			// 					height: 100%;
			// 					line-height: 22px;
			// 				}
			// 				.gameTitleTextIcon{
			// 					width: 14px;
			// 					height: 14px;
			// 					border-radius: 50%;
			// 					margin-left: 10px;
			// 					opacity: 0.2;
			// 					// &>img{width: 100%;height: 100%;display: block;border-radius: 50%;}
			// 				}
			// 			}
			// 			// 游戏列表标题下的 标签
			// 			.gameLabel{
			// 				width: 100%;
			// 				height: 60px;
			// 				display: flex;
			// 				flex-wrap: wrap;
			// 				.gameLabelItem{
			// 					width: auto;
			// 					height: 20px;
			// 					text-align: center;
			// 					line-height: 20px;
			// 					padding: 3px 7px;
			// 					margin-top: 4px;
			// 					margin-right: 8px;
			// 					border-radius: 4px;
			// 					// margin-bottom: 4px;
			// 					background-color: rgba(0,0,0,0.2);
			// 					display: flex;
			// 					justify-content: center;
			// 					align-items: center;
			// 				}
							
			// 			}
			// 		}
			// 		.rightPrice{
			// 			width: 166px;
			// 			height: 90px;
			// 			position: relative;
			// 			display: flex;
			// 			justify-content: start;
			// 			// justify-content: space-between;
			// 			align-items: center;
			// 			.gameDiscount{
			// 				position: relative;
			// 				text-align: center;
			// 				line-height: 24px;
			// 			}
			// 		}
			// 		// rightPrice 不显示内容的样式
			// 		.isHide{
			// 			div{
			// 				display: none
			// 			}
			// 		}
			// 	}
			// 	.gameListMainBtmLine{
			// 		width:100%;
			// 		height: 1px;
			// 		margin: 15px 0 17px 0;
			// 		background-color: rgba(255, 255, 255,0.05);
			// 	}
			// }
			.gameListMainBox{
				width: 100%;
				height: 9rem;
				position: relative;
				.gameListItems{
					width: 100%;
					height: 74px;
					cursor: pointer;
					margin-bottom: 16px;
					border-radius: 4px;
					// overflow: hidden;
				}
				// .gameListItems:hover {background-color: rgba(68,72,87,1);}
			}
			//空数据展示
			.emptyData{
				width: 848px;
				height: 575px;
				.allGameEmpty{
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
		// 分页盒子
		.pagingContent{
			width: 100%;
			height: 153px;
		}
		// 右边筛选条件
		.rightScreenConditionBox{
			width: 276px;
			.gameLabel{
				width: 100%;
				// height: 342px;
				padding: 14px 16px 0;
				box-sizing: border-box;
				background:rgba(13,13,13,.4);
				border-radius:4px;
				.gameLabelTitle{
					width: 100%;
					height: 18px;
					display: flex;
					margin-bottom: 16px;
					div{
						line-height: 18px;
					}
					.smallLabel{
						line-height: 20px;
						color: rgba(255,255,255,0.1)
					}
				}
				.gameLabelItems{
					width: 100%;
					// height: 245px;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					.gameLabelItem{
						width: 114px;
						height: 32px;
						border-radius:4px;
						background-color: rgba(13,13,13,0.4);
						text-align: center;
						line-height: 32px;
						cursor: pointer;
						margin-bottom: 16px;
					}
					.gameLabelItem:hover{color: rgba(255,255,255,1)}
					.gameLabelItemActive{background-color: rgba(76,107,34,1)}
				}
				.openMore{
					width: 100%;
					height: 48px;
					line-height: 48px;
					text-align: center;
					cursor: pointer;
					border-top: 1px solid rgba(255,255,255,0.1)
				}
				.openMore:hover{color: rgba(255,255,255,1)}
			}
			
			// .labelScreenCondition{
			// 	// height: 330px;
			// 	overflow: hidden;
			// 	padding: 0 16px;
			// 	background-color:rgba(13, 13, 13, 0.4);
			// 	border-radius: 4px;
			// 	.labelItemBox{
			// 		width: 100%;
			// 		// height: 236px;
			// 		display: flex;
			// 		flex-wrap: wrap;
			// 		align-content: flex-start;
			// 		justify-content: space-between;
			// 		.labelItem{
			// 			width: 107px;
			// 			height: 36px;
			// 			padding: 0 5px;
			// 			margin-bottom: 10px;
			// 			background-color:rgba(0,0,0,0.1);
			// 			border-radius:4px;
			// 			cursor: pointer;
			// 			display: flex;
			// 			justify-content: start;
			// 			align-items: center;
			// 			&>.labelDivBox{
			// 				width: 16px;
			// 				height: 16px;
			// 				margin-right: 4px;
			// 				border:1px solid rgba(255,255,255,0.2);
			// 			}
			// 		}
			// 	}
			// 	.allLabelBtn{
			// 		width: 100%;
			// 		height: 38px;
			// 		line-height: 38px;
			// 		text-align: center;
			// 		cursor: pointer;
			// 		border-top: 1px solid rgba(255,255,255,0.1)
			// 	}
			// }
			.priceScreenCondition{
				height: 241px;
				overflow: hidden;
				box-sizing: border-box;
				padding: 0.14rem 0.16rem 0;
				background-color:rgba(13, 13, 13, 0.4);
				border-radius: 4px;
				.gameLabelTitle{
					width: 100%;
					height: 18px;
					display: flex;
					margin-bottom: 16px;
					div{
						line-height: 18px;
					}
					.smallLabel{
						line-height: 20px;
						color: rgba(255,255,255,0.1)
					}
				}
				.priceItemBox{
					width: 100%;
					height: 212px;
					.priceItem{
						width: 100%;
						height:36px;
						background-color:rgba(0,0,0,0.1);
						border-radius:4px;
						text-align: center;
						line-height: 36px;
						margin-bottom: 8px;
						cursor: pointer;
						
					}
					.active {
							background-color: rgba(76,107,34,1);
						}
				}
			}
		}
	}
}

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
.page {
	width: 100%;
	height: 36px;
	margin: 54px auto 0;
}
</style>
