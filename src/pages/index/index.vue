<template>
	<view>
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item v-for="(item,index) in swiperList">
				<image :src="item.image" mode=""></image>
			</swiper-item>
		</swiper>
	</view>
	<!-- 搜索框 -->
	<view class="tab-strickt">
		<u-search placeholder="日照香炉生紫烟" v-model="keyword" bg-color="#fff" margin="8px" style="flex-grow: 1;"
			:show-action="true" action-text="搜索" :animation="true"></u-search>
	</view>
	<!-- 瀑布流 -->
	<view class="wrap">
		<u-waterfall v-model="flowList" ref="uWaterfall1">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.title}}
					</view>
					<view class="demo-price">
						{{item.price}}元
					</view>
					<view class="demo-tag">
						<view class="demo-tag-owner">
							自营
						</view>
						<view class="demo-tag-text">
							放心购
						</view>
					</view>
					<view class="demo-shop">
						{{item.shop}}
					</view>
					<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close"
						@click="remove(item.id)"></u-icon>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.title}}
					</view>
					<view class="demo-price">
						{{item.price}}元
					</view>
					<view class="demo-tag">
						<view class="demo-tag-owner">
							自营
						</view>
						<view class="demo-tag-text">
							放心购
						</view>
					</view>
					<view class="demo-shop">
						{{item.shop}}
					</view>
					<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close"
						@click="remove(item.id)"></u-icon>
				</view>
			</template>
		</u-waterfall>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const indicatorDots = ref(true) //小圆点
	const autoplay = ref(true) //自动切换
	const interval = ref(3000) //切换时间

	const swiperList = ref([{
			image: "/static/11.jpg"
		},
		{
			image: "/static/44.jpg"
		},
		{
			image: "/static/66.jpeg"
		}
	])
	//瀑布流
	const flowList = ref(
		[{
				price: 35,
				title: '北国风光，千里冰封，万里雪飘',
				shop: '李白杜甫白居易旗舰店',
				image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
			},
			{
				price: 75,
				title: '望长城内外，惟余莽莽',
				shop: '李白杜甫白居易旗舰店',
				image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
			},
			{
				price: 385,
				title: '大河上下，顿失滔滔',
				shop: '李白杜甫白居易旗舰店',
				image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			},
			{
				price: 784,
				title: '欲与天公试比高',
				shop: '李白杜甫白居易旗舰店',
				image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
			},
			{
				price: 7891,
				title: '须晴日，看红装素裹，分外妖娆',
				shop: '李白杜甫白居易旗舰店',
				image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',
			},
			{
				price: 2341,
				shop: '李白杜甫白居易旗舰店',
				title: '江山如此多娇，引无数英雄竞折腰',
				image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg',
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
</script>

<style lang="scss">
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
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
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
</style>