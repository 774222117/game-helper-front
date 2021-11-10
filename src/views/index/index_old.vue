<template>
<!-- 外层大盒子 -->
<div class="main indexBg_bg">
	<div class="content">
		<!-- 折扣精选 标题 -->
		<div class="title margin_top_30">
			<div class="titleFont clearfix" @click="browseGameClick(3)">
				<div class="titleFontMain margin_right_10 ft20 color_white_1 ft_weight fl">折扣精选</div>
				<div class="titleFontMore ft14 color_white_06 fl">查看更多></div>
			</div>
		</div>
		<!-- 折扣游戏 -->
		<div class="discountGame">
			<div class="discountGameContent" v-if="onsale.length > 0" >
				<div class="discountGameContentLeft">
					<div class="discountGameFirstItem back4Active" @click="browseGameClick(5)">
						<!-- 夏季大促 -->
						<div class="summerPromotion summerPromotionB_bg ft16"></div>
						<div class="imgBox">
							<img :src="onsale[0].libraryCapsule" alt="">
						</div>
						<div class="bgModel"></div>
						<div class="discountGameFirstItemText">
							<div class="discountGameFirstItemTextGameName ft16 color_white_1">{{ onsale[0].chinaName == '' ? onsale[0].englishName : onsale[0].chinaName }}</div>
							<div class="discountGameFirstItemTextPrice">
								<div class="ft16 color1 margin_right_10 back2">{{ ( (onsale[0].lowPrice/onsale[0].steamPrce).toFixed(2)*10 ).toFixed(1) }}折</div>
								<div class="ft20 color3 ft_weight margin_right_10">￥{{ Math.ceil(onsale[0].lowPrice) }}</div>
								<div class="ft14 color_white_04 textDecor">￥{{ Math.ceil(onsale[0].steamPrce) }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="discountGameContentRight">
					<template v-for="(item,index) in onsale">
						<middleItem :middleItemData="item" :key="item.id" v-if="index!=0 && index<7"></middleItem>
					</template>
				</div>
			</div>
		</div>
		<!-- 热销排行 标题 -->
		<div class="title margin_top_30">
			<div class="titleFont clearfix" @click="browseGameClick(2)">
				<div class="titleFontMain margin_right_10 ft20 color_white_1 ft_weight fl">热销排行</div>
				<div class="titleFontMore ft14 color_white_06 fl">查看更多></div>
			</div>
			<div class="searchGameName">
				<input class="searchGameNameInput ft14 color_white_04" type="text" v-model="searchGameName" placeholder="请输入游戏名称"  @keyup.enter="searchGame" />
				<div class="gameNameSearchBtn" @click="searchGame">
					<svg-icon iconClass='search' className='svg_icon_search'></svg-icon>
				</div>
			</div>
		</div>
		<!-- 热销游戏 -->
		<div class="hotSaleGameContent">
			<div class="hotSaleGameContentLeft" v-if="ifLoading">
				<div class="hotSaleGameItems back4" v-for="(item,index) in bestsellers">
					<gameList :gameListData="item"></gameList>
				</div>
				<!-- <template v-for="(item,index) in onsale">
					<middleItem :middleItemData="item" :key="item.id" v-if="index!=0 && index<7"></middleItem>
				</template> -->
				<div class="viewAllGames back4 ft14 color_white_1 opc_hover6" @click="browseGameClick(2)">浏览全部{{allGameNum}}款游戏>></div>
			</div>
			<div class="hotSaleGameContentLeft" v-else>
				<!-- <div class="loadingSty"></div> -->
				<loading/>
			</div>
			<!-- 标签等 -->
			<div class="hotSaleGameContentRight">
				<div class="gameLabel">
					<div class="gameLabelTitle">
						<div class="ft14 color_white_1 ft_weight margin_right_4">标签</div>
						<div class="smallLabel ft12 ft_weight">The label</div>
					</div>
					<div class="gameLabelItems">
						<div class="gameLabelItem ft12 color_white_08" :class="labelItems.indexOf(n) >= 0?'gameLabelItemActive':''" v-for="(n,index) in findTags" @click="gameLabelClick(index,n)">{{n}}</div>
					</div>
					<div class="openMore ft12 color_white_06" @click="moveFindTags">{{moveFindTagsText == 1?'展开更多':'收起'}}</div>
				</div>
				<div class="labelViewAllGames ft12 color_white_08"  v-show="moveFindTagsText == 1" @click="browseGameClick(2)">查看全部游戏></div>
				<div class="advertisement" v-show="moveFindTagsText == 1" @click="advertisementFun">
					<div><img class="imgBlock" :src="advertisingSpaceUrl" alt=""></div>
				</div>
			</div>
		</div>
		<!-- 其他人正在玩 标题 -->
		<div class="title margin_top_30">
			<div class="titleFont clearfix">
				<div class="titleFontMain margin_right_10 ft20 color_white_1 ft_weight fl">其他人正在玩</div>
			</div>
			<div class="changeGames ft14 color_white_1" @click="changeGames">
				<div class="svgBox"><svg-icon iconClass='refresh_red' className='svg_icon_refresh_red'></svg-icon></div>	
				<div>换一换</div>
			</div>
		</div>
		<!-- 其他人正在玩 -->
		<div class="otherPeoplePlaying">
			<div class="leftVideo back4NoHover" v-if="!!videoData">
				<div class="videoPlay">
					<div class="video">
						<video :src="videoData.gameImages[0].carouselAddress" autoplay="autoplay" muted="muted" controls="controls"></video>
					</div>
					<div class="prev opc_hover dispCenter indexVideoLeftBtn_bg" @click="prevVideo"></div>
					<div class="next opc_hover dispCenter indexVideoRightBtn_bg" @click="nextVideo"></div>
				</div>
				<div class="videoInfo">
					<div class="videoInfoLeft">
						<div class="videoName ft16 color_white_1">{{ videoData.chinaName == '' ? videoData.englishName : videoData.chinaName }}</div>
						<div class="videoLabel">
							<template v-for="(item,index) in videoData.attributes.category3">
								<div class="videoLabelItem ft12 color_white_06" v-if="index < 3">{{item.title}}</div>
							</template>
						</div>
					</div>
					<div class="videoInfoRight">
						<div class="ft16 color1 back2 font_weight">{{ ( (videoData.lowPrice/videoData.steamPrce).toFixed(2)*10 ).toFixed(1) }}折</div>
						<div class="ft20 color3 font_weight">￥{{ Math.ceil(videoData.lowPrice) }}</div>
						<div class="ft14 color_white_04 textDecor">￥{{ Math.ceil(videoData.steamPrce) }}</div>
					</div>
				</div>
			</div>
			<div class="rightGames">
				<div class="otherPeopleGameItems" :class="avtiveVideo == index?'avtiveVideoSty back4Active':'back4'" v-for="(item,index) in nearestUp">
					<otherPeopleGameList :otherPeopleGameListData="item" :indexNum="index" @changeVideo="changeVideoData"></otherPeopleGameList>
				</div>
			</div>
		</div>
		<!-- 最近销售 标题 -->
		<div class="title margin_top_30">
			<div class="titleFont clearfix">
				<div class="titleFontMain margin_right_10 ft20 color_white_1 ft_weight fl">最近销售</div>
			</div>
		</div>
		<!-- 最近售出游戏列表 -->
		<div class="recentlySoldBox margin_top_16">
			<swiper :options="swiperRecentlySold" ref="swiperRecentlySold" style="padding:20px;">
				<swiper-slide  v-for="(item,index) in nearestSold"  :key="index">
					<smallItem :smallItemData="item" :key="item.id"></smallItem>
				</swiper-slide>
			</swiper>
		</div>
	</div>
	<div class="footerBox footerBanner_bg" v-if="footerBoxShow == 0">
		<div class="receiveBtn" :class="receiveBtnShow == 1 ?'receiveBtn1_bg':'receiveBtn_bg'" @click="receiveBtnFun" v-on:mouseenter="visible(0)" @mouseleave="visible(1)"></div>
	</div>
</div>
</template>

<script>
import firstItem from '../../components/GameItem/GameItemBig';
import middleItem from '../../components/GameItem/GameItemMiddle';
import smallItem from '../../components/GameItem/GameItemSmall';
import indexVideo from '../../components/IndexVideo/IndexVideo';
import gameList from '../../components/gameList/gameList';
import otherPeopleGameList from '../../components/gameList/otherPeopleGameList';
import loading from '../../components/Loading/loading';

import JumpTo from '@/utils/jumpTo'
export default {
	components: {
		JumpTo,
		firstItem,
		smallItem,
		middleItem,
		indexVideo,
		gameList,
		otherPeopleGameList,
		loading
	},
	inject:['reload','openRegister'],
	data(){
		return {
			bestsellers:'',  //热销游戏
			findTags:'',	//标签
			labelItems:[],//标签选中的值
			moveFindTagsText:1,//标签展开更多或者收起
			findTagsParams:{'param':'tag','language':'chinese','limit':10},		//标签数据参数
			findDataParams:{'current':1,'limit':8,'orderType':1},		//通过标签获取数据参数
			onsale:'',		//折扣游戏
			nearestUp:'',  //其他人正在玩
			videoData:'',  //视频播放的数据
			avtiveVideo:0,//当前选中的值
			nearestSold:'',	//下面的轮播
			allGameNum:'', //游戏总数
			swiperRecentlySold:{
				observer:true,
    			observeParents:true,
				lazy: true,
				autoplay:true,
				slidesPerView: 6,
				spaceBetween: 30,
			},
			advertisingSpace:'', //广告位
			advertisingSpaceUrl:'',//广告位url
			searchGameName:'', //搜索双向绑定
			ifLoading:true,     //加载中

			receiveBtnShow:1,//底部按钮划上效果切换
			footerBoxShow:false, //底部默认不显示
		}
	},
	watch:{
		'$route':function(data){
			let _path = data.path;
			if(data.path == '/'){
				
			}
		}
	},
	activated(){
		var _this = this;
		// 热销游戏 无参数
		_this.$fetch('/index/hotSales')
			.then((response) => {
				_this.bestsellers = response.data
			})
		// 获取标签
		_this.$fetch('/game/findTags',_this.findTagsParams)
			.then((response) => {
				_this.findTags = response.data
			})
		// 折扣游戏 无参数
		_this.$fetch('/index/rebates')
			.then((response) => {
				_this.onsale = response.data
			})	
		// 其他人正在玩 无参数
		_this.$fetch('/index/nearestUp')
			.then((response) => {
				_this.nearestUp = response.data
				_this.videoData = response.data[0]
			})
		// 最近销售 无参数
		_this.$fetch('/index/nearestSold')
			.then((response) => {
				_this.nearestSold = response.data
			})
		//获取游戏总数
		_this.$fetch('/game/getGameTotal')
			.then((response) => {
				_this.allGameNum = response
			})
		// 获取广告位
		_this.$fetch('/index/fineGame',{'code':'ads1'})
			.then((response) => {
				_this.advertisingSpace = response.data[0]
				_this.advertisingSpaceUrl = response.data[0].bannerImg
			})
		// 判断用户是否参与过活动
		if(!!this.$store.getters.getStorage){
			_this.$fetch('/people/activity/join')
			.then((response) => {
				if(response.flag){
				_this.footerBoxShow = response.data
				}else{
				console.log('下面的数据，没有数据')
				}
			})
		}
        
	},
	methods:{
		// 大家都在玩右边list切换
		changeVideoData(data){
			this.videoData = this.nearestUp[data]
			this.avtiveVideo = data
		},
		// 视频左按钮
		prevVideo(){
			this.avtiveVideo = this.avtiveVideo <= 0 ? 0 : this.avtiveVideo - 1
			this.videoData = this.nearestUp[this.avtiveVideo]
		},
		// 视频右按钮
		nextVideo(){
			this.avtiveVideo = this.avtiveVideo >= 4 ? 4 : this.avtiveVideo + 1
			this.videoData = this.nearestUp[this.avtiveVideo]
		},
		//换一换按钮
		changeGames(){
			var _this = this;
			_this.avtiveVideo = 0
			_this.$fetch('/index/nearestUp')
			.then((response) => {
				_this.nearestUp = response.data
				_this.videoData = response.data[0]
			})
		},
		// 搜索按钮
		searchGame(){
			JumpTo(1,{gameName:this.searchGameName});
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
					_this.bestsellers = response.data.rows
					_this.allGameNum = response.data.total
					_this.ifLoading = true
				})
		},
		//广告位点击方法
		advertisementFun(){
			var appId = this.getParam( this.advertisingSpace.navigateUrl , 'appId' ) 
			// JumpTo(2,{'appId': appId})
			JumpTo(8)
			// if(!!this.$store.getters.getStorage){
			// 	JumpTo(8)
			// }else{
			// 	if(!!this.openRegister){
			// 		this.openRegister(true)
			// 	}else{
			// 		console.log('没得openRegister方法')
			// 	}
			// }
		},
		//获取链接的参数方法
		getParam(url, id) {
            var url = url+ "";
            var regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/";
            var reg = eval(regstr);//eval可以将 regstr字符串转换为 正则表达式
            var result = url.match(reg);//匹配的结果是：result[0]=?sid=22 result[1]=sid result[2]=22。所以下面我们返回result[2]

            if (result && result[2]) {
                return result[2];
            }
        },
		//浏览游戏点击跳转
		browseGameClick(index){
			switch (index) {
				case 0:// 0 所有游戏
					JumpTo(1,{})
					break;
				case 1:// 1 支持合玩的游戏
					JumpTo(1,{isTogether:1})
					break;
				case 2:// 2 销售最好的游戏
					JumpTo(1,{orderType:3})
					break;
				case 3:// 3 特殊折扣
					JumpTo(1,{priceType:4})
					break;
				case 4:// 4 最近上架的游戏
					JumpTo(1,{orderType:2})
					break;
				case 5:// 5 折扣第一个点击
					JumpTo(2,{'appId': this.onsale[0].appId})
					break;
					
				default:
					break;
			}
		},
		// 底部立即领取鼠标事件
		visible(data){
			this.receiveBtnShow = data
		},
		// 底部按钮点击跳转
		receiveBtnFun(){
			JumpTo(8)
			// if(!!this.$store.getters.getStorage){
			// 	JumpTo(8)
			// }else{
			// 	if(!!this.openRegister){
			// 		this.openRegister(true)
			// 	}else{
			// 		console.log('没得openRegister方法')
			// 	}
			// }
		}
	}
}
</script>
<style  lang="scss" scoped>
.main{
	width: 100%;
	height: auto;
	.content{
		width: 1280px;
		margin: 0 auto;
		padding: 0 60px;
		box-sizing: border-box;
		padding-bottom: 100px;
		padding-top: 1px;
		// overflow: hidden; 为了不使用超出隐藏解决margin父元素起作用的问题 加了padding-top
		//  折扣游戏
		 .discountGameContent{
			 width: 100%;
			 height: 396px;
			 display: flex;
			 justify-content: space-between;
			 .discountGameContentLeft{
				 width: 269px;
				 height: 100%;
				 .discountGameFirstItem:hover .imgBox>img{transform: scale(1.1);transition: all 0.3s;}
				 .discountGameFirstItem{
					 width:269px;
					 height: 396px;
					 cursor: pointer;
					 position: relative;
					.imgBox{
						width: 100%;
						height: 378px;
					 	overflow: hidden;
						img{
							display: block;
							width: 100%;
							height: 100%;
							transition: all 0.3s;
						}
					}
					.bgModel{
						width: 100%;
						height: 203px;
						position: absolute;
						bottom: 18px;
						background:linear-gradient(180deg,rgba(56,59,71,0) 0%,rgba(17,24,34,1) 100%);
					}
					.discountGameFirstItemText{
						width: 100%;
						height: 70px;
						padding: 0 12px;
						box-sizing: border-box;
						position: absolute;
						bottom: 0px;
						.discountGameFirstItemTextGameName{
							line-height:24px;
							letter-spacing:1px;
							margin-bottom: 9px;
						}
						.discountGameFirstItemTextPrice{
							display: flex;
							div:nth-of-type(1){
								padding: 2px 7px;
								text-align: center;
								line-height: 24px;
								border-radius:4px;
							}
							div:nth-of-type(2){
								line-height:25px;
							}
							div:nth-of-type(3){
								line-height:30px;
							}
						}
					}
				 }
			 }
			 .discountGameContentRight{
				  width: 859px;
				 height: 100%;
				 display: flex;
				 flex-wrap:wrap;
				 align-content: space-between;
				 justify-content: space-between;
				 div{width: 265px;height: 182px;}
			 }
		 }
		//  热销游戏
		.hotSaleGameContent{
			width: 100%;
			height: 758px;
			display: flex;
			justify-content: space-between;
			
			.hotSaleGameContentLeft{
				width: 863px;
				height: 100%;
				position: relative;
				.hotSaleGameItems{
					width: 100%;
					height: 74px;
					cursor: pointer;
					margin-bottom: 16px;
					border-radius: 4px;
					overflow: hidden;
				}
				// .hotSaleGameItems:hover {background-color: rgba(68,72,87,1);}
				.viewAllGames{
					width: 100%;
					height: 40px;
					border-radius:4px;
					text-align: center;
					line-height: 40px;
					cursor: pointer;
				}
				// .viewAllGames:hover {background-color: rgba(68,72,87,1);}
				// 加载中。。。
				.loadingSty{
					
				}
			}
			.hotSaleGameContentRight{
				width: 265px;
				height: 100%;
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
							width: 108px;
							height: 32px;
							border-radius:4px;
							background-color: rgba(13,13,13,0.4);
							text-align: center;
							line-height: 32px;
							cursor: pointer;
							margin-bottom: 16px;
						}
						.gameLabelItem:hover{color: rgba(255,255,255,1)}
						.gameLabelItemActive{background-color:rgba(76,107,34,1);}
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
				.labelViewAllGames{
					width:100%;
					height:46px;
					background:rgba(13,13,13,0.4);
					border-radius:4px;
					margin: 16px 0;
					text-align: center;
					line-height:46px;
					cursor: pointer;
				}
				.labelViewAllGames:hover{color: rgba(255,255,255,1)}
				.advertisement{
					width:100%;
					height:338px;
					background:rgba(0,0,0,1);
					border-radius:4px;
					cursor: pointer;
					div{
						width: 100%;
						height: 100%;
						.imgBlock{
							width: 100%;
							height: 100%;
							display: block;
						}
					}
				}
			}
		}
		// 其他人正在玩
		.otherPeoplePlaying{
			width: 100%;
			height: 402px;
			display: flex;
			justify-content: space-between;
			.leftVideo{
				width: 564px;
				height: 100%;
				padding: 10px 10px 0;
				box-sizing: border-box;
				box-shadow:0px 10px 24px 0px rgba(0,0,0,0.1);
				border-radius:4px;
				.videoPlay{
					width: 100%;
					height: 306px;
					position: relative;
					background-color: black;
					.video{
						width: 100%;
						height: 100%;
						video{
							width: 100%;
							height: 100%;
							display: block;
						}
					}
					.prev{
						width: 50px;
						height: 72px;
						position: absolute;
						left: 0;
						top: calc(50% - 36px);
						cursor: pointer;
					}
					.next{
						width: 50px;
						height: 72px;
						position: absolute;
						right: 0;
						top: calc(50% - 36px);
						cursor: pointer;
					}
				}
				.videoInfo{
					width: 100%;
					height: 86px;
					display: flex;
					justify-content: space-between;
					.videoInfoLeft{
						width: 375px;
						height: 100%;
						display: flex;
						flex-direction: column;
    					justify-content: center;
						.videoName{
							width: 200px;
							height: 25px;
							margin-bottom: 5px;
						}
						.videoLabel{
							width: 400px;
							height: 20px;
							display: flex;
							.videoLabelItem{
								padding: 2px 6px;
								background:rgba(0,0,0,0.2);
								border-radius:2px;
								margin-right: 4px;
							}
						}
					}
					.videoInfoRight{
						width: 169px;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						div{margin-right: 4px;}
						div:nth-of-type(1){
							padding: 2px 7px;
							border-radius:4px;
						}
						div:nth-of-type(3){
							margin-top: 4px;
						}
					}
				}
			}
			.rightGames{
				width: 580px;
				height: 100%;
				.otherPeopleGameItems{
					width: 100%;
					height: 74px;
					cursor: pointer;
					margin-bottom: 8px;
					border-radius: 4px;
					overflow: hidden;
					transition: all 0.3s;
				}
				.avtiveVideoSty{ transform: scale(1.05);transition: all 0.3s;}
			}
		}
		// 最近售出
		.recentlySoldBox{
			width: 100%;
			height: 275px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
}
// 标题
.title{
	width: 100%;
	margin-bottom: 15px;
	display: flex;
    justify-content: space-between;
	.titleFont{
		cursor: pointer;
		.titleFontMain{
			height:25px;
			line-height:25px;
		}
		.titleFontMore{
			height:25px;
			line-height:25px;
			cursor: pointer;
		}
	}
	.searchGameName{
		width: 265px;
		height:32px;
		background:rgba(13,13,13,0.4);
		border-radius:4px;
		position: relative;
		.searchGameNameInput{
			width: 100%;
			height: 100%;
			display: block;
			background: none;
			outline: none;
			border: none;
			text-indent: 20px;
		}
		.searchGameNameInput:focus{color: rgba(255,255,255,1)}
		.gameNameSearchBtn{
			width: 24px;
			height: 24px;
			position: absolute;
			right: 10px;
			top: 4px;
			cursor: pointer;
			opacity: 0.4;
		}
	}
	.searchGameName:hover>.gameNameSearchBtn{opacity: 1;}
	.changeGames{
		width:100px;
		height:32px;
		background:rgba(13,13,13,0.4);
		border-radius:4px;
		text-align: center;
		line-height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.4;
		cursor: pointer;
		div:nth-of-type(1){
			width: 16px;
			height: 16px;
			padding: 4px;
			transition: all 0.3s;
		}
		div:nth-of-type(2){
			
		}
	}
	.changeGames:hover{opacity: 1;}
	.changeGames:hover>.svgBox{transform: rotate(360deg)}
}

// 底部常驻
.footerBox{
	width: 100%;
	height: 90px;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 99;
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
