<template>

	<view class="container">
		<!-- 顶部tab -->
		<view class="tab-bar">
			<view class="tab-item" :class="{ 'active': activeIndex === 0 }" @tap="handleTabClick(0)">
				<text class="tab-text">挑菜</text>
			</view>
			<view class="tab-item" :class="{ 'active': activeIndex === 1 }" @tap="handleTabClick(1)">
				<text class="tab-text">推荐</text>
			</view>
			<view class="tab-item" :class="{ 'active': activeIndex === 2 }" @tap="handleTabClick(2)">
				<text class="tab-text">帮选</text>
			</view>
		</view>

		<!-- 推荐 -->
		<view v-if="activeIndex == 1">
			<!-- 轮播图 -->
			<view>
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item v-for="(item,index) in swiperList">
						<image class="swiper_image" :src="item.images" mode=""></image>
					</swiper-item>
				</swiper>
			</view>

			<!-- 搜索框 -->
			<view class="tab-strickt" @click="search">
				<u-search v-model="keywords" bg-color="#e7e7e7" margin="8px" style="flex-grow: 1;" :show-action="true"
					action-text="搜索" :animation="true"></u-search>
			</view>

			<!-- 美食横向列表 -->
			<view class="text_top">
				<text>经典美食</text>
			</view>
			<scroll-view class="scroll-container" scroll-x="true">
				<view class="food_box" v-for="(item, index) in classicalList"
					:style="{ backgroundImage: 'url(' + item.image + ')' }" @click="toDetailPage(item)">
					<view class="food_overlay">
						<view class="demo-title1">
							{{item.categoryName}}
						</view>
						<view class="demo-title2">
							{{item.goodsName}}
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 瀑布流 -->
			<view class="text_top">
				<text>推荐美食</text>
			</view>
			<view class="wrap">
				<u-waterfall v-if="flowList.length > 0" v-model="flowList" ref="uWaterfall1">
					<template v-slot:left="{leftList}">
						<view class="demo-warter-left" v-for="(item, index) in leftList" :key="index"
							@click="toDetailPage(item)">
							<!-- 	懒加载图片 -->
							<u-lazy-load threshold="-450" border-radius="15" :image="item.image" :index="index">
							</u-lazy-load>
							<view class="demo-overlay">
								<view class="demo-title1">
									{{item.categoryName}}

								</view>
								<view class="demo-title2">
									{{item.goodsName}}
								</view>
								<!-- <u-icon name="heart" color="#ffffff" size="42" class="u-close" @click="remove(item.id)">
								</u-icon> -->
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="demo-warter-right" v-for="(item, index) in rightList" :key="index"
							@click="toDetailPage(item)">
							<u-lazy-load threshold="-450" border-radius="15" :image="item.image" :index="index">
							</u-lazy-load>
							<view class="demo-overlay">
								<view class="demo-title1">
									{{item.categoryName}}
								</view>
								<view class="demo-title2">
									{{item.goodsName}}
								</view>

							</view>
						</view>
					</template>
				</u-waterfall>
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			</view>
		</view>

		<!-- 挑菜 -->
		<view v-if="activeIndex == 0">
			<!-- 蔬菜 -->
			<!-- 标题 -->
			<view class="underline-container">
				<view class="underline"></view>
				<view class="underline-text">挑选食材</view>
				<view class="underline"></view>
			</view>
			<!-- 菜品按钮 -->
			<view class="button_box">
				<button class="btn1" :class="{ selected: selectedValues.includes(item.value) }"
					@click="toggleSelection(item.value)" v-for="(item, index) in IngredList"
					:key="item.value">{{item.label}}</button>
			</view>
			<!-- 菜品 -->
			<view class="underline-container">
				<view class="underline"></view>
				<view class="underline-text">菜品</view>
				<view class="underline"></view>
			</view>
			<!-- 菜品列表 -->
			<view class="wrap" :key="forceKey">
				<u-waterfall v-model="CooksByingredList" :key="forceKey" ref="uWaterfall2">
					<template v-slot:left="{leftList}">
						<view class="demo-warter-left" v-for="(item, index) in leftList" :key="index"
							@click="toDetailPage(item)">
							<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
							<u-lazy-load threshold="-450" border-radius="15" :image="item.image" :index="index">
							</u-lazy-load>
							<view class="demo-overlay">
								<view class="demo-title1">
									{{item.goodsName}}
								</view>
								<view class="demo-title2">
									{{item.categoryName}}
								</view>
								<u-icon name="heart" color="#ffffff" size="42" class="u-close" @click="remove(item.id)">
								</u-icon>
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="demo-warter-right" v-for="(item, index) in rightList" :key="index"
							@click="toDetailPage(item)">
							<u-lazy-load threshold="-450" border-radius="15" :image="item.image" :index="index">
							</u-lazy-load>
							<view class="demo-overlay">
								<view class="demo-title1">
									{{item.goodsName}}
								</view>
								<view class="demo-title2">
									{{item.categoryName}}
								</view>
								<u-icon name="heart" color="#ffffff" size="42" class="u-close" @click="remove(item.id)">
								</u-icon>
							</view>
						</view>
					</template>
				</u-waterfall>
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			</view>
		</view>



		<!-- 帮选 -->
		<view v-if="activeIndex == 2">
			<view class="bx-text_top">
				<text>川菜榜</text>
			</view>

			<scroll-view class="bx-scroll-container" scroll-x="true">
				<view class="bx-food_box" v-for="(item,index) in oneList" @click="toDetailPage(item)">
					<view class="bx-food-img" :style="{ backgroundImage: 'url(' + item.image + ')' }"></view>
					<view class="bx-food-text">·{{item.goodsName}}·</view>
				</view>
			</scroll-view>

			<view class="bx-text_top">
				<text>粤菜榜</text>
			</view>
			<scroll-view class="bx-scroll-container" scroll-x="true">
				<view class="bx-food_box" v-for="(item,index) in twoList" @click="toDetailPage(item)">
					<view class="bx-food-img" :style="{ backgroundImage: 'url(' + item.image + ')' }"></view>
					<view class="bx-food-text">·{{item.goodsName}}·</view>
				</view>
			</scroll-view>

			<view class="bx-text_top">
				<text>湘菜榜</text>
			</view>
			<scroll-view class="bx-scroll-container" scroll-x="true">
				<view class="bx-food_box" v-for="(item,index) in threeList" @click="toDetailPage(item)">
					<view class="bx-food-img" :style="{ backgroundImage: 'url(' + item.image + ')' }"></view>
					<view class="bx-food-text">·{{item.goodsName}}·</view>
				</view>
			</scroll-view>
		</view>
	</view>



</template>

<script setup>
	import {
		createApp,
		ref
	} from 'vue';
	// 引入轮播图和推荐列表api
	import {
		getIndexListApi,
		getSwiperListApi,
		getIngredListApi,
		getCooksByingredApi
	} from '../../api/index.js'
	// 引入搜索列表api
	import {
		getCategoryListApi,
	} from '../../api/unused.js'
	import {
		onReady,
		onReachBottom,
		onLoad,
		onPullDownRefresh
	} from '@dcloudio/uni-app';


	const indicatorDots = ref(true) //小圆点
	const autoplay = ref(true) //自动切换
	const interval = ref(3000) //切换时间
	const activeIndex = ref(1) // 当前选中的标签索引  
	// 轮播图数据
	const swiperList = ref([])
	// 读取轮播图数据
	const getSwiperList = async () => {
		let res = await getSwiperListApi({
			currentPage: currentPage.value,
			pageSize: pageSize.value,
		})
		console.log(res)
		if (res && res.code == 200) {
			swiperList.value = flowList.value.concat(res.data.records);
			loadStatus.value = 'loadmore';
		}

	}
	//经典美食
	const classicalList = ref([])
	// 经典美食
	const getClassicalList = async () => {
		let res = await getIndexListApi({ // 使用您的API函数名  
			currentPage: 2,
			pageSize: 4,
		});
		console.log(res)
		if (res && res.code == 200) {
			classicalList.value = classicalList.value.concat(res.data.records);
			console.log(classicalList.value);
		}
	};




	//瀑布流
	const flowList = ref([])
	// 加载更多
	const loadStatus = ref()
	//点击参数查询
	const currentPage = ref(1) //页数
	const pageSize = ref(5) //每页查询条数
	const pages = ref(0) //查询关键词
	const keywords = ref('') //总页数
	//读取推荐到首页的商品数据
	const getIndexList = async () => {
		let res = await getIndexListApi({
			currentPage: currentPage.value,
			pageSize: pageSize.value,
			keywords: keywords.value
		})
		console.log(res);
		if (res && res.code == 200) {
			pages.value = res.data.pages //设置总页数
			flowList.value = flowList.value.concat(res.data.records);
			loadStatus.value = 'loadmore';
		}
	}



	// 瀑布流表单对象
	const uWaterfall1 = ref()
	const uWaterfall2 = ref()
	// 搜索跳转页面
	const search = () => {
		uni.navigateTo({
			url: '../search/search'
		})
	}

	// 跳转菜品详情情页面
	const toDetailPage = (item) => {
		console.log(item, "传入详情数据")
		uni.navigateTo({
			url: "../details/details?goods=" + JSON.stringify(item)
		})

	}
	const IngredList = ref([])
	const forceKey = ref(0);
	//获取食材
	const getIngredApi = async () => {
		let res = await getIngredListApi()
		console.log("查询食材")
		console.log(res)
		IngredList.value = res.data
	}
	const selectedValues = ref([]);

	// 食材按钮点击事件  
	const toggleSelection = async (value) => {
		const index = selectedValues.value.indexOf(value);
		if (index === -1) {
			selectedValues.value.push(value);
		} else {
			selectedValues.value.splice(index, 1);
		}
		console.log(selectedValues.value); // 打印选中的值数组  

		// 根据选中的食材获取菜谱列表  
		if (selectedValues.value.length > 0) {
			getCooksByingredList(selectedValues.value).then(recipes => {

				CooksByingredList.value = recipes; // 更新菜谱列表  
			});
		} else {
			// 如果没有选中的食材，则清空菜谱列表  
			CooksByingredList.value = []; // 直接将数组设为空数组  
			forceKey.value = Date.now(); // 强制重新渲染瀑布流组件
			console.log('所有食材已取消选择，菜谱列表已清空');
		}
	};
	//api查询出来的数据
	const CooksByingredList = ref([])
	//根据id来查询食材
	const getCooksByingredList = async (parm) => {
		const res = await getCooksByingredApi(parm)
		console.log(res)
		CooksByingredList.value = res.data // 传递选中的值数组
		console.log(CooksByingredList)
	}

	// 触底加载数据
	onReachBottom(() => {
		console.log('触底加载更多数据')
		// 如果当前页数大于等于总页数，状态修改为没有更多了，不在继续往下执行代码
		if (currentPage.value >= pages.value) {
			loadStatus.value = 'nomore';
			return;
		};
		loadStatus.value = 'loding'; //状态改为加载中
		currentPage.value = ++currentPage.value
		// 修改页面后重新获取数据
		getIndexList()
	})


	// 加载更多（挑菜部分暂不需要）
	const addRandomData = () => {
		console.log('加载更多')
	}

	const handleTabClick = (index) => {
		console.log("点击了")
		activeIndex.value = index;

	}

	// 帮选
	const oneList = ref([])
	const twoList = ref([])
	const threeList = ref([])

	const getOneList = async () => {
		let res = await getCategoryListApi({
			currentPage: 1,
			pageSize: 4,
			keywords: "川菜"
		})
		console.log(res);
		if (res && res.code == 200) {
			oneList.value = oneList.value.concat(res.data.records);
			console.log(res, "1")
		}
	};

	const getTwoList = async () => {
		let res = await getCategoryListApi({
			currentPage: 1,
			pageSize: 4,
			keywords: "粤菜"
		})
		console.log(res);
		if (res && res.code == 200) {
			twoList.value = twoList.value.concat(res.data.records);
			console.log(res, "1")
		}
	};

	const getThreeList = async () => {
		let res = await getCategoryListApi({
			currentPage: 1,
			pageSize: 4,
			keywords: "湘菜"
		})
		console.log(res);
		if (res && res.code == 200) {
			threeList.value = threeList.value.concat(res.data.records);
			console.log(res, "1")
		}
	};





	onReady(() => {
		getSwiperList() //轮播图数据
		// getIndexList() //推荐首页数据
		getClassicalList() //获取挑菜数据
		getIngredApi() //获取食材
		getOneList()
		getTwoList()
		getThreeList() //获取帮选数据
	})
	onLoad((options) => {
		setTimeout(function() {
			console.log('start pulldown');
		}, 1000);
		uni.startPullDownRefresh();
	})


	// 下拉刷新推荐菜品
	onPullDownRefresh(() => {
		// 重置页码为第一页  
		currentPage.value = 1;
		// 重置商品列表为空数组 
		flowList.value = [];
		// 调用数据获取函数  
		getIndexList().then(() => {

			// 数据加载完成后停止下拉刷新动画  
			uni.stopPullDownRefresh();
		});
	})
</script>

<style lang="scss">
	// 轮播图
	.swiper {
		width: 710rpx;
		height: 400rpx;
		margin-right: 20rpx;
		margin-left: 20rpx;
		border-radius: 15rpx;
		background-size: cover;
		overflow: hidden;
	}

	.swiper_image {
		width: 710rpx;
		height: 400rpx;
		border-radius: 15rpx;
		background-size: cover;
	}

	// 搜索框样式
	.tab-strickt {
		position: sticky;
		z-index: 99;
		top: 50px;
		left: 0;
		display: flex;
		align-items: center;
		background-color: #ffffff;
	}

	//瀑布流
	.demo-warter-right {
		border-radius: 15px;
		margin-top: 10px;
		margin-left: 9rpx;
		margin-right: 18rpx;
		margin-bottom: 8rpx;
		background-color: #ffffff;

		position: relative;
	}

	.demo-warter-left {
		border-radius: 15px;
		margin-top: 10px;
		margin-left: 18rpx;
		margin-right: 9rpx;
		margin-bottom: 5rpx;
		background-color: #ffffff;

		position: relative;
	}

	.u-close {
		position: absolute;
		bottom: 32rpx;
		bottom: 32rpx;
		right: 32rpx;
	}

	.btn1.selected {
		background-color: #000000;
		color: white;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-overlay {
		border-radius: 15px;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.demo-title1 {
		color: white;
		padding-left: 20rpx;
		padding-top: 20rpx;
		font-size: 28rpx;
		letter-spacing: 2px;
		font-weight: 500;
	}

	.demo-title2 {
		padding-top: 8rpx;
		padding-left: 20rpx;
		color: white;
		font-size: 38rpx;
		letter-spacing: 2px;
		font-weight: 600;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 750;
	}

	.tab-bar {
		position: sticky;
		z-index: 99;
		top: 0px;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 50px;
		/* 你可以根据需要调整高度 */
		background-color: #fff;
		/* 非选中时的背景色 */
		font-weight: 600;
	}

	.tab-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70px;
		/* 每个按钮的宽度，可以根据需要调整 */
		height: 30px;
		/* 每个按钮的高度，设置为椭圆形的高度 */
		border-radius: 20px;
		/* 设置为高度的一半以实现椭圆形效果 */
		// margin: 0 5px;
	}

	.tab-item.active {
		background-color: #000;
		/* 选中时的背景色 */
	}

	.tab-text {
		color: #000;
		/* 非选中时的文字颜色 */
	}

	.tab-item.active .tab-text {
		color: #fff;
		/* 选中时的文字颜色 */
	}

	// 美食横向列表
	.scroll-container {
		margin-top: 10rpx;
		display: flex;
		width: 100%;
		height: 150px;
		/* 设置 scroll-view 的高度 */
		// background-color: #f0f0f0;
		white-space: nowrap;
		/* 确保子元素不换行 */
	}

	.food_box {
		display: inline-block;
		width: 260px;
		height: 100%;
		border-radius: 20rpx;
		margin-left: 20px;

		background-size: cover;

	}

	.text_top {
		margin-top: 30rpx;
		margin-left: 25rpx;
		margin-bottom: 20rpx;
		font-weight: 600;
		font-size: 30rpx;
		letter-spacing: 2px;
	}

	.food_text1 {
		color: white;
		padding-left: 20rpx;

		width: 50rpx;
		height: 50rpx;
		padding-top: 190rpx;
		letter-spacing: 2px; //文字间距
		font-weight: 600;
	}

	.food_text2 {
		color: white;
		padding-left: 20rpx;
		padding-top: 40rpx;
		font-size: 38rpx;
		letter-spacing: 2px;
		font-weight: 500;
	}

	.food_overlay {
		width: 260px;
		height: 100%;
		border-radius: 20rpx;
		/* 设置蒙版颜色及透明度 */
		background-color: rgba(0, 0, 0, 0.1);
	}

	// 挑菜
	// 下划线
	.underline-container {
		margin-top: 25rpx;
		display: flex;
		align-items: center;
	}

	.underline-text {

		background-color: white;
		/* 如果背景不是白色，需要设置这个 */
		z-index: 1;
		/* 确保文字在下划线之上 */
		position: relative;
		letter-spacing: 2px;
		font-weight: 600;
	}

	.underline {
		flex: 1;
		height: 1rpx;
		/* 下划线高度 */
		background-color: #b2b2b2;
		/* 下划线颜色 */
		margin: 20rpx;
	}

	// 按钮样式
	.button_box {
		display: flex;
		flex-wrap: wrap; //自动换行
		flex-direction: row;
		width: 750rpx;

	}

	.btn1 {
		font-size: 25rpx;
		border-radius: 40rpx;
		width: 180rpx;
		height: 60rpx;
		margin-top: 25rpx;
		margin-left: 35rpx;
		margin-right: 35rpx;
		background: linear-gradient(to right bottom, rgba(78, 129, 209, 0.3), rgba(205, 91, 71, 0.1));
		letter-spacing: 5px;
		font-weight: 600;
	}

	.btn2 {
		font-size: 25rpx;
		border-radius: 40rpx;
		width: 180rpx;
		height: 60rpx;
		margin-top: 25rpx;
		margin-left: 35rpx;
		margin-right: 35rpx;
		background-color: #ff9d6c;
		letter-spacing: 5px;
		font-weight: 600;
	}




	// 帮选
	.bx-text_top {
		margin-top: 30rpx;
		margin-left: 25rpx;
		margin-bottom: 30rpx;
		font-weight: 600;
		font-size: 32rpx;
		letter-spacing: 3px;
	}

	.bx-scroll-container {
		margin-top: 10rpx;
		display: flex;
		width: 100%;
		height: 380rpx;
		/* 设置 scroll-view 的高度 */
		// background-color: #1ea0f0;
		white-space: nowrap;
		/* 确保子元素不换行 */
	}

	.bx-food_box {
		display: inline-block;
		width: 300rpx;
		height: 380rpx;
		border-radius: 20rpx;
		margin-left: 25rpx;
		background-size: cover;
	}

	.bx-food-img {
		width: 300rpx;
		height: 300rpx;
		border-radius: 20rpx;
		background-size: cover;
	}

	.bx-food-text {
		margin-top: 15rpx;
		font-size: 28rpx;
		font-weight: 600;
		text-align: center;
	}
</style>
