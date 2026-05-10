<template>
	<view class="container">
		<!-- 加载状态 -->
		<view class="loading-section" v-if="loading">
			<view class="loading-grid">
				<view class="loading-card" v-for="i in 6" :key="i">
					<view class="loading-shimmer"></view>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="empty-section" v-if="!loading && cooksList.length === 0">
			<view class="empty-card">
				<view class="empty-icon">❤️</view>
				<text class="empty-title">还没有收藏菜谱</text>
				<text class="empty-desc">去发现美食，收藏喜欢的菜谱吧</text>
				<view class="empty-btn" @click="goToHome">
					<text class="btn-text">去发现</text>
				</view>
			</view>
		</view>

		<!-- 收藏列表 -->
		<view class="list-section" v-if="!loading && cooksList.length > 0">
			<view class="list-header">
				<text class="list-title">我的收藏</text>
				<text class="list-count">共{{ cooksList.length }}道菜谱</text>
			</view>

			<view class="collection-grid">
				<view class="collection-card" 
					v-for="item in cooksList" 
					:key="item.goodsId" 
					@tap="toDetailPage(item)"
					@longtap="cancelCollect(item)">
					
					<view class="card-image-wrapper">
						<image class="card-image" :src="item.image" mode="aspectFill"></image>
						<view class="card-overlay">
							<u-icon name="heart-fill" size="20" color="#ff6b6b"></u-icon>
						</view>
					</view>
					
					<view class="card-info">
						<text class="card-name">{{ item.goodsName }}</text>
						<text class="card-category" v-if="item.categoryName">{{ item.categoryName }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部安全区域 -->
		<view class="safe-area-bottom"></view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onReady, onShow } from '@dcloudio/uni-app'
import { userCollectionListApi, collectApi } from '../../api/collection.js'

const userId = reactive({
	data: uni.getStorageSync('userId'),
})

const cooksList = ref([])
const loading = ref(true)

// 跳转菜品详情页面
const toDetailPage = (item) => {
	uni.navigateTo({
		url: "../details/details?goods=" + JSON.stringify(item)
	})
}

// 跳转到首页
const goToHome = () => {
	uni.switchTab({
		url: "../index/index"
	})
}

// 获取收藏列表
const getCollection = async (parm) => {
	loading.value = true
	try {
		let res = await userCollectionListApi(parm)
		if (res != null && res.code == 200) {
			cooksList.value = res.data
		}
	} catch (e) {
		console.error('获取收藏列表失败', e)
	} finally {
		loading.value = false
	}
}

// 取消收藏
const cancelCollect = (item) => {
	uni.showActionSheet({
		itemList: ['查看详情', '取消收藏'],
		success: function(res) {
			if (res.tapIndex === 0) {
				toDetailPage(item)
			} else if (res.tapIndex === 1) {
				confirmCancelCollect(item)
			}
		}
	})
}

// 确认取消收藏
const confirmCancelCollect = (item) => {
	uni.showModal({
		title: '取消收藏',
		content: `确定要取消收藏"${item.goodsName}"吗？`,
		confirmColor: '#e74c3c',
		success: function(res) {
			if (res.confirm) {
				doCancelCollect(item)
			}
		}
	})
}

// 执行取消收藏
const doCancelCollect = async (item) => {
	try {
		let res = await collectApi({
			userId: uni.getStorageSync("userId"),
			goodsId: item.goodsId
		})
		if (res && res.code == 200) {
			uni.showToast({
				title: "已取消收藏",
				icon: 'success'
			})
			// 重新加载列表
			getCollection(userId.data)
		}
	} catch (e) {
		uni.showToast({
			title: "操作失败",
			icon: 'none'
		})
	}
}

onReady(() => {
	getCollection(userId.data)
})

onShow(() => {
	getCollection(userId.data)
})
</script>

<style lang="scss" scoped>
.container {
	background: #f5f5f5;
	min-height: 100vh;
	padding-bottom: 40rpx;
}

/* 加载状态 */
.loading-section {
	padding: 30rpx;
}

.loading-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
}

.loading-card {
	width: calc(33.33% - 14rpx);
	height: 320rpx;
	background: white;
	border-radius: 16rpx;
	overflow: hidden;
}

.loading-shimmer {
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
	0% { background-position: 200% 0; }
	100% { background-position: -200% 0; }
}

/* 空状态 */
.empty-section {
	padding: 100rpx 30rpx;
}

.empty-card {
	background: white;
	border-radius: 24rpx;
	padding: 80rpx 40rpx;
	text-align: center;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

.empty-icon {
	font-size: 80rpx;
	margin-bottom: 30rpx;
}

.empty-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #2c3e50;
	display: block;
	margin-bottom: 16rpx;
}

.empty-desc {
	font-size: 26rpx;
	color: #95a5a6;
	display: block;
	margin-bottom: 40rpx;
}

.empty-btn {
	display: inline-block;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	padding: 16rpx 60rpx;
	border-radius: 40rpx;
}

.btn-text {
	font-size: 28rpx;
	color: white;
	font-weight: 500;
}

/* 列表区域 */
.list-section {
	padding: 0 30rpx;
}

.list-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
	padding: 0 10rpx;
}

.list-title {
	font-size: 30rpx;
	font-weight: 600;
	color: #333333;
}

.list-count {
	font-size: 24rpx;
	color: #999999;
}

/* 收藏网格 */
.collection-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
}

.collection-card {
	width: calc(33.33% - 14rpx);
	background: white;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.08);
	transition: transform 0.2s;
	
	&:active {
		transform: scale(0.96);
	}
}

.card-image-wrapper {
	position: relative;
	width: 100%;
	height: 240rpx;
}

.card-image {
	width: 100%;
	height: 100%;
	background-color: #f0f0f0;
}

.card-overlay {
	position: absolute;
	top: 12rpx;
	right: 12rpx;
	width: 40rpx;
	height: 40rpx;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card-info {
	padding: 16rpx;
}

.card-name {
	font-size: 26rpx;
	font-weight: 600;
	color: #2c3e50;
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: 6rpx;
}

.card-category {
	font-size: 20rpx;
	color: #95a5a6;
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.safe-area-bottom {
	height: 40rpx;
}

/* 响应式调整 */
@media (max-width: 750rpx) {
	.list-section {
		padding: 0 20rpx;
	}
	
	.collection-grid {
		gap: 16rpx;
	}
	
	.collection-card {
		width: calc(50% - 8rpx);
	}
	
	.card-image-wrapper {
		height: 280rpx;
	}
	
	.card-name {
		font-size: 24rpx;
	}
}
</style>