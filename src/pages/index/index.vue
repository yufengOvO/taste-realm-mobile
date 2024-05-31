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

		<!-- 页面其他内容 -->

		<!-- 推荐 -->
		<view v-if="activeIndex == 1">
			<view>
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in swiperList">
						<image class="swiper_image" :src="item.image" mode=""></image>
					</swiper-item>
				</swiper>
			</view>

			<!-- 搜索框 -->
			<view class="tab-strickt">
				<u-search placeholder="日照香炉生紫烟" v-model="keyword" bg-color="#ffffff" margin="8px" style="flex-grow: 1;"
					:show-action="true" action-text="搜索" :animation="true"></u-search>
			</view>

			<!-- 美食横向列表 -->
			<view class="text_top">
				<text>金典美食</text>
			</view>
			<scroll-view class="scroll-container" scroll-x="true">
				<view class="food_box" v-for="(item,index) in swiperList"
					:style="{ backgroundImage: 'url(' + item.image + ')' }">
					<view class="food_overlay">
						<view class="food_text1">
							<text>好吃不长肉~</text>
						</view>
						<view class="food_text2">
							<text>家常菜</text>
						</view>
					</view>
				</view>
			</scroll-view>



			<!-- 瀑布流 -->
			<view class="text_top">
				<text>推荐美食</text>
			</view>
			<view class="wrap">
				<u-waterfall v-model="flowList" ref="uWaterfall1">
					<template v-slot:left="{leftList}">
						<view class="demo-warter-left" v-for="(item, index) in leftList" :key="index">
							<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
							<u-lazy-load threshold="-450" border-radius="15" :image="item.image" :index="index">
							</u-lazy-load>
							<view class="demo-overlay">
								<view class="demo-title1">
									好吃不长肉~
								</view>
								<view class="demo-title2">
									家常菜
								</view>
								<u-icon name="heart" color="#ffffff" size="42" class="u-close"
									@click="remove(item.id)">
								</u-icon>
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="demo-warter-right" v-for="(item, index) in rightList" :key="index">
							<u-lazy-load threshold="-450" border-radius="15" :image="item.image" :index="index">
							</u-lazy-load>
							<view class="demo-overlay">
								<view class="demo-title1">
									好吃不长肉~
								</view>
								<view class="demo-title2">
									家常菜
								</view>
								<u-icon name="heart" color="#ffffff" size="42" class="u-close"
									@click="remove(item.id)">
								</u-icon>
							</view>
						</view>
					</template>
				</u-waterfall>
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			</view>
		</view>

		<!-- 挑菜 -->
		<view v-if="activeIndex == 0"><text>挑菜</text></view>
		<!-- 帮选 -->
		<view v-if="activeIndex == 2"><text>帮选</text></view>
	</view>



</template>

<script setup>
	import {
		ref
	} from 'vue';
	const indicatorDots = ref(true) //小圆点
	const autoplay = ref(true) //自动切换
	const interval = ref(3000) //切换时间
	const activeIndex = ref(1) // 当前选中的标签索引  

	const swiperList = ref([{
			image: "https://cdn.pixabay.com/photo/2022/06/07/20/52/curry-7249247_1280.jpg"
		},
		{
			image: "https://cdn.pixabay.com/photo/2014/11/11/18/20/pasta-527286_1280.jpg"
		},
		{
			image: "https://cdn.pixabay.com/photo/2017/08/09/09/54/olive-2614000_1280.jpg"
		}
	])


	//瀑布流
	const flowList = ref(
		[{
				price: 35,
				title: '北国风光，千里冰封，万里雪飘',
				shop: '李白杜甫白居易旗舰店',
				image: 'https://cdn.pixabay.com/photo/2020/06/03/08/53/mozzarella-5254110_1280.jpg',
			},
			{
				price: 75,
				title: '望长城内外，惟余莽莽',
				shop: '李白杜甫白居易旗舰店',
				image: 'https://cdn.pixabay.com/photo/2016/12/17/18/49/cheese-1914115_1280.jpg',
			},
			{
				price: 385,
				title: '大河上下，顿失滔滔',
				shop: '李白杜甫白居易旗舰店',
				image: 'https://cdn.pixabay.com/photo/2016/12/17/18/49/cheese-1914115_1280.jpg',
			},
			{
				price: 784,
				title: '欲与天公试比高',
				shop: '李白杜甫白居易旗舰店',
				image: 'https://cdn.pixabay.com/photo/2016/12/17/18/49/cheese-1914115_1280.jpg',
			},
			{
				price: 7891,
				title: '须晴日，看红装素裹，分外妖娆',
				shop: '李白杜甫白居易旗舰店',
				image: 'https://cdn.pixabay.com/photo/2015/07/19/21/01/turkey-852044_1280.jpg',
			},
			{
				price: 2341,
				shop: '李白杜甫白居易旗舰店',
				title: '江山如此多娇，引无数英雄竞折腰',
				image: 'https://cdn.pixabay.com/photo/2017/01/22/19/20/pizza-2000614_1280.jpg',
			},
			{
				price: 661,
				shop: '李白杜甫白居易旗舰店',
				title: '惜秦皇汉武，略输文采',
				image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
			},
			{
				price: 1654,
				title: '唐宗宋祖，稍逊风骚',
				shop: '李白杜甫白居易旗舰店',
				image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
			},
			{
				price: 1678,
				title: '一代天骄，成吉思汗',
				shop: '李白杜甫白居易旗舰店',
				image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
			},
			{
				price: 924,
				title: '只识弯弓射大雕',
				shop: '李白杜甫白居易旗舰店',
				image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
			},
			{
				price: 8243,
				title: '俱往矣，数风流人物，还看今朝',
				shop: '李白杜甫白居易旗舰店',
				image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
			},
		]
	)

	const handleTabClick = (index) => {
		console.log("点击了")
		activeIndex.value = index;

	}
</script>

<style lang="scss">
	// 轮播图
	.swiper {
		width: 710rpx;
		height: 400rpx;
		margin-right: 20rpx;
		margin-left: 20rpx;
		border-radius: 15rpx;
		// background-color: aqua;
		background-size: cover;
	}
	.swiper_image{
		width: 710rpx;
		height: 400rpx;
		border-radius: 15rpx;
		background-size: cover;
	}

	// 搜索框样式
	.tab-strickt {
		position: sticky;
		z-index: 99;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		background-color: #f2f2f2;
	}

	//瀑布流
	.demo-warter-right {
		border-radius: 15px;
		margin-top: 10px;
		margin-left: 9rpx;
		margin-right: 18rpx;
		margin-bottom: 8rpx;
		// padding: 8px;
		background-color: #ffffff;
		
		position: relative;
	}
	.demo-warter-left {
		border-radius: 15px;
		margin-top: 10px;
		margin-left: 18rpx;
		margin-right: 9rpx;
		margin-bottom: 5rpx;
		// padding: 8px;
		background-color: #ffffff;
		
		position: relative;
	}

	.u-close {
		position: absolute;
		bottom: 32rpx;
		right: 32rpx;
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
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 60px;
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
		// background-color: #13afa5;
		margin-left: 20px;
		// background-image: url("https://cdn.pixabay.com/photo/2022/06/07/20/52/curry-7249247_1280.jpg");
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
		// background-color: aqua;
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
</style>
