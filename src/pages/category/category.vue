<template>
	<view>
		<!-- 搜索框 -->
		<view class="tab-strickt" @click="search()">
			<u-search placeholder="亲! 想吃点什么" v-model="keyword" bg-color="#e7e7e7" margin="8px" style="flex-grow: 1;"
				:show-action="true" action-text="搜索" :animation="true" ></u-search>
		</view>
		<view class="underline-container">
			<view class="underline"></view>
			<view class="underline-text">热门分类</view>
			<view class="underline"></view>
		</view>

		<view class="fl_top">
			<view class="fl_top_box" v-for="(item, index) in categoryList.slice(3,7)" :key="item.value" :style="{ backgroundImage: 'url(' + item.image + ')'}" @click="toDetailPage(item)">
				<view class="fl_top_box_overlay">
					<view class="fl_top_box_text">
						{{ item.label }}
					</view>
				</view>
				<!-- <view class="image-container" @click="toDetailPage(item)">
					<image :src="item.image" mode="aspectFit"></image>
					<view class="image-text">
						{{ item.label }}
					</view>
				</view> -->
			</view>
		</view>

		<view class="underline-container">
			<view class="underline"></view>
			<view class="underline-text">分类</view>
			<view class="underline"></view>
		</view>
		<!-- 分类 -->

		<view class="fl_btm">
			<view class="fl_btm_box" v-for="item in categoryList" :key="item.value" :style="{ backgroundImage: 'url(' + item.image + ')' }" @click="toDetailPage(item)">
				<view class="fl_btm_box_overlay">
					<view class="fl_btm_box_text">
						{{ item.label }}
					</view>
				</view>
				
				<!-- <view class="image-container1" @click="toDetailPage(item)">
					<image :src="item.image" style="height: 100%;"></image>
					<view class="image-text">
						{{ item.label }}
					</view>
				</view> -->
			</view>

		</view>

	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';


	//导入生命周期函数
	import {
		onReady
	} from '@dcloudio/uni-app'

	import {
		getCategoryApi
	} from "../../api/unused.js"
	// 分类传参搜索
	const toDetailPage = (item) => {
		console.log(item.label, "分类")
		uni.navigateTo({
			url: "../categorysearch/categorysearch?goods=" + item.label
		})

	}
	
	const search = () => {
		uni.navigateTo({
			url: '../search/search'
		})
	}

	//分类数据
	const categoryList = ref([])

	const getCategory = async () => {
		let res = await getCategoryApi()
		categoryList.value = res.data
		console.log(categoryList, "dsfanvknavjanvakvnavk")

	}
	//生命周期
	onReady(() => {
		getCategory()
	})
</script>

<style lang="scss">
	.tab-strickt {
		position: sticky;
		z-index: 99;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		background-color: #ffffff;
	}
	// 下划线
	.underline-container {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.underline-text {
		color: #b2b2b2;
		background-color: white;
		/* 如果背景不是白色，需要设置这个 */
		z-index: 1;
		/* 确保文字在下划线之上 */
		position: relative;
		letter-spacing: 5px;
		font-weight: 500;
		font-size: 30rpx
	}

	.underline {
		flex: 1;
		height: 1rpx;
		/* 下划线高度 */
		background-color: #b2b2b2;
		/* 下划线颜色 */
		margin: 20rpx;
	}

	// 推荐分类
	.fl_top {
		display: flex;
		flex-wrap: wrap;
	}

	.fl_top_box {
		width: 44%;
		height: 200rpx;
		margin-left: 4%;
		margin-top: 15rpx;
		border-radius: 20rpx;
		background-size: cover;
		// background-color: #07a8ff;
	}

	.fl_top_box_overlay{
		
		display: flex;
		width: 100%;
		height: 200rpx;
		border-radius: 20rpx;
		/* 设置蒙版颜色及透明度 */
		background-color: rgba(0, 0, 0, 0.3);
	}
	.fl_top_box_text{
		color: white;
		width: 80%;
		height: 35%;
		// background-color: aquamarine;
		margin: auto;
		text-align: center;
		font-size: 48rpx;
		letter-spacing: 20rpx;
		font-weight: 600;
	}


	// 具体分类
	.fl_btm {
		display: flex;
		flex-wrap: wrap;
	}

	.fl_btm_box {
		width: 30%;
		height: 220rpx;
		margin-left: 2.5%;
		margin-top: 15rpx;
		border-radius: 20rpx;
		background-size: cover;
		// background-color: #07a8ff;
	}
	
	.fl_btm_box_overlay{
		display: flex;
		width: 100%;
		height: 220rpx;
		border-radius: 20rpx;
		/* 设置蒙版颜色及透明度 */
		background: linear-gradient(to right bottom,rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0));
	}
	.fl_btm_box_text{
		padding-top: 20rpx;
		padding-left: 20rpx;
		color: white;
		// background-color: aquamarine;
		font-size: 32rpx;
		letter-spacing: 5rpx;
		font-weight: 500;
	}



	.image-container {
		position: relative;
		width: 100%;
		/* 容器宽度可以是百分比或固定值 */
		height: 100px;
		/* 容器高度可以是您需要的任何值 */
		overflow: hidden;
		/* 隐藏超出容器的部分 */
		display: flex;
		/* 使用Flexbox来居中图片 */
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
	}

	.image-container1 {
		position: relative;
		display: flex;
		width: 100%;
		height: 220rpx;
		border-radius: 20rpx;

		overflow: hidden;
		/* 隐藏超出容器的部分 */
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
	}

	.image-text {
		position: absolute;
		bottom: 75px;
		font-size: 35rpx;

		left: 5px;

		color: white;
	}
</style>