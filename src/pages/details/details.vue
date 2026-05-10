<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="header-content">
				<view class="title-section">
					<text class="food-name">{{goodsName}}</text>
					<text class="food-category">{{categoryName}}</text>
				</view>
				<view class="collect-btn" @tap="collectBtn">
					<u-icon :name="isCollected ? 'heart-fill' : 'heart'" 
						:color="isCollected ? '#ff6b6b' : '#666'" 
						size="48"></u-icon>
					<text class="collect-text">{{isCollected ? '已收藏' : '收藏'}}</text>
				</view>
			</view>
		</view>

		<!-- 视频区域 -->
		<view class="video-section">
			<video :src="video" 
				class="video-player" 
				controls 
				:show-center-play-btn="true"
				:enable-progress-gesture="true"></video>
		</view>

		<!-- 内容卡片 -->
		<view class="content-card">
			<!-- 简介部分 -->
			<view class="section">
				<view class="section-header">
					<view class="section-icon">📝</view>
					<text class="section-title">菜品简介</text>
				</view>
				<view class="description-content">
					<text class="description-text">{{goodsDesc}}</text>
				</view>
			</view>

			<!-- 制作步骤 -->
			<view class="section">
				<view class="section-header">
					<view class="section-icon">👨‍🍳</view>
					<text class="section-title">制作步骤</text>
				</view>
				<view class="steps-content">
					<text class="steps-text">{{make}}</text>
				</view>
			</view>

			<!-- 食材部分 -->
			<view class="section">
				<view class="section-header">
					<view class="section-icon">🥬</view>
					<text class="section-title">所需食材</text>
				</view>
				<view class="ingredients-grid">
					<view v-for="(item, index) in goodsCategories" 
						:key="index" 
						class="ingredient-tag"
						:style="{ animationDelay: index * 0.1 + 's' }">
						<text class="ingredient-name">{{ item.ingredName }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部安全区域 -->
		<view class="safe-area-bottom"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { collectApi, hasCollect } from '../../api/collection.js'
import { onLoad, onReady } from '@dcloudio/uni-app';

const goodsId = ref('')
const goodsDesc = ref('')
const goodsName = ref('')
const categoryName = ref('')
const video = ref("http://localhost:8088/images/5a108b3f-03d4-4e39-a947-11196f7e108a.mp4")
const make = ref('')
const goodsCategories = ref([]);
const isCollected = ref(false);

onLoad((options) => {
	const goods = JSON.parse(options.goods)
	goodsId.value = goods.goodsId;
	goodsDesc.value = goods.goodsDesc;
	goodsName.value = goods.goodsName;
	categoryName.value = goods.categoryName;
	video.value = goods.video;
	make.value = goods.make;
	goodsCategories.value = goods.goodsCategories;
})

const collectBtn = async () => {
	let res = await collectApi({
		userId: uni.getStorageSync("userId"),
		goodsId: goodsId.value
	})
	if (res && res.code == 200) {
		isCollected.value = !isCollected.value;
		uni.showToast({ 
			title: isCollected.value ? "收藏成功" : "取消收藏",
			icon: 'success'
		})
	}
}

const iscolect = async () => {
	let res = await hasCollect({
		userId: uni.getStorageSync("userId"),
		goodsId: goodsId.value
	})
	if (res && res.code == 200) {
		if (res.data == 1) {
			isCollected.value = true;
		}
	}
}

onReady(() => {
	iscolect()
})
</script>

<style lang="scss" scoped>
.container {
	background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
	min-height: 100vh;
	padding-bottom: 40rpx;
}

.header {
	background: white;
	padding: 40rpx 30rpx 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	position: sticky;
	top: 0;
	z-index: 100;
}

.header-content {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.title-section {
	flex: 1;
	margin-right: 30rpx;
}

.food-name {
	font-size: 44rpx;
	font-weight: 700;
	color: #2c3e50;
	display: block;
	line-height: 1.3;
	letter-spacing: 2rpx;
}

.food-category {
	font-size: 28rpx;
	color: #7f8c8d;
	margin-top: 12rpx;
	display: inline-block;
	background: #f1f3f5;
	padding: 8rpx 24rpx;
	border-radius: 30rpx;
	letter-spacing: 1rpx;
}

.collect-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16rpx;
	background: #f8f9fa;
	border-radius: 20rpx;
	min-width: 120rpx;
}

.collect-text {
	font-size: 22rpx;
	color: #666;
	margin-top: 8rpx;
}

.video-section {
	padding: 30rpx;
	padding-top: 40rpx;
}

.video-player {
	width: 100%;
	height: 420rpx;
	border-radius: 24rpx;
	box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.15);
}

.content-card {
	margin: 0 30rpx;
	background: white;
	border-radius: 24rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
	overflow: hidden;
	padding-bottom: 40rpx;
}

.section {
	padding: 40rpx 30rpx;
	border-bottom: 1rpx solid #f1f3f5;
	
	&:last-child {
		border-bottom: none;
	}
}

.section-header {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.section-icon {
	font-size: 36rpx;
	margin-right: 16rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #2c3e50;
	letter-spacing: 2rpx;
}

.description-content {
	background: #f8f9fa;
	border-radius: 16rpx;
	padding: 30rpx;
}

.description-text {
	font-size: 28rpx;
	color: #495057;
	line-height: 1.8;
	text-align: justify;
	letter-spacing: 1rpx;
}

.steps-content {
	background: #f8f9fa;
	border-radius: 16rpx;
	padding: 30rpx;
}

.steps-text {
	font-size: 28rpx;
	color: #495057;
	line-height: 1.8;
	white-space: pre-wrap;
	letter-spacing: 1rpx;
}

.ingredients-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
}

.ingredient-tag {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	padding: 16rpx 32rpx;
	border-radius: 40rpx;
	animation: fadeInUp 0.5s ease forwards;
	opacity: 0;
	transform: translateY(20rpx);
	box-shadow: 0 4rpx 15rpx rgba(102, 126, 234, 0.3);
}

.ingredient-name {
	font-size: 26rpx;
	color: white;
	font-weight: 500;
	letter-spacing: 1rpx;
}

.safe-area-bottom {
	height: 40rpx;
}

@keyframes fadeInUp {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 响应式调整 */
@media (max-width: 750rpx) {
	.header {
		padding: 30rpx 20rpx 20rpx;
	}
	
	.food-name {
		font-size: 38rpx;
	}
	
	.video-section {
		padding: 20rpx;
		padding-top: 30rpx;
	}
	
	.video-player {
		height: 360rpx;
	}
	
	.content-card {
		margin: 0 20rpx;
	}
	
	.section {
		padding: 30rpx 20rpx;
	}
}
</style>