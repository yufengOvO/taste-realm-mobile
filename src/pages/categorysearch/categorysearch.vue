<template>
	<view>
		<!-- 搜索框 -->
		<view class="tab-strickt">
			<u-search placeholder="搜索你想要的食谱" v-model="keywords" bg-color="#e7e7e7" margin="8px" style="flex-grow: 1;"
				:show-action="true" action-text="搜索" :animation="true" @change="isSearch()" ></u-search>
		</view>
		<view class="food_list">
			<view class="food_box" v-for="(item, index) in flowList" :key="index"   @click="toDetailPage(item)">
				<view class="food_img" :style="{ backgroundImage: 'url(' + item.image + ')' }"></view>
				<view class="food_text">·{{item.goodsName}}·</view>
			</view>
		
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	// 引入搜索列表api
	import {
		getCategoryListApi,
	} from '../../api/unused.js'

	import {
		onReady,
		onReachBottom,
		onLoad
	} from '@dcloudio/uni-app';
	

	const flowList = ref([])//搜索结果数据
	const loadStatus = ref()// 加载字符
	const currentPage = ref(1) //页数
	const pageSize = ref(5) //每页查询条数
	const pages = ref(0) //总页数
	const keywords = ref('') //查询关键词
	
	
	const isSearch = () => {
		
		console.log(keywords.value)
		getIndexList()
	}
	const toDetailPage = (item) => {
		uni.navigateTo({
			url: "../details/details?goods=" + JSON.stringify(item)
		})
	}
	onLoad((options) => {
		
		console.log(options, "菜谱数据")
		keywords.value = options.goods
		console.log(keywords, "114514")
	})
	//读取所有菜谱数据
	const getIndexList = async () => {
		let res = await getCategoryListApi({
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
	
	// 生命周期
	onReady(() => {

	})
</script>

<style lang="scss">
	/* 搜索框样式 */
	.tab-strickt {
		position: sticky;
		z-index: 99;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		background-color: #ffffff;
	}
	.food_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.food_box{
		width: 48%;
		height: 450rpx;
		padding-left: 45rpx;
		padding-top: 25rpx;
		// background-color: aqua;
	}
	.food_img{
		width: 95%;
		height: 350rpx;
		border-radius: 20rpx;
		background-color: #ffaa22;
		background-size: cover;
	}
	.food_text{
		margin-top: 15rpx;
		font-size: 28rpx;
		font-weight: 600;
		margin-left: 80rpx;
	}
</style>
