<template>
	<view class="container">
		<!-- 加载状态 -->
		<view class="loading-section" v-if="loading">
			<view class="loading-card">
				<view class="loading-shimmer"></view>
			</view>
			<view class="loading-card">
				<view class="loading-shimmer"></view>
			</view>
			<view class="loading-card">
				<view class="loading-shimmer"></view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="empty-section" v-if="!loading && cooksList.length === 0">
			<view class="empty-card">
				<view class="empty-icon">📝</view>
				<text class="empty-title">还没有发布菜谱</text>
				<text class="empty-desc">快去创作你的第一道菜谱吧</text>
				<view class="empty-btn" @click="goToWrite">
					<text class="btn-text">去创作</text>
				</view>
			</view>
		</view>

		<!-- 菜谱列表 -->
		<view class="list-section" v-if="!loading && cooksList.length > 0">
			<view class="list-header">
				<text class="list-title">我的发布</text>
				<text class="list-count">共{{ cooksList.length }}道菜谱</text>
			</view>

			<view class="recipe-list">
				<view class="recipe-card" 
					v-for="(item, index) in cooksList" 
					:key="item.goodsId"
					@tap="toDetailPage(item)"
					@longtap="showActionSheet(item)">
					
					<view class="recipe-image-wrapper">
						<image class="recipe-image" :src="item.image" mode="aspectFill"></image>
					</view>
					
					<view class="recipe-info">
						<text class="recipe-name">{{ item.goodsName }}</text>
						<text class="recipe-desc">{{ item.goodsDesc }}</text>

					</view>
					
					<view class="recipe-actions">
						<u-icon name="arrow-right" size="16" color="#bdc3c7"></u-icon>
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
import { onReady } from '@dcloudio/uni-app'
import { wxupdateDeleteApi, userWriteListApi } from '../../api/user.js'

const userId = reactive({
	data: uni.getStorageSync('userId'),
})

const currentPage = ref(1)
const pageSize = ref(10)
const cooksList = ref([])
const loading = ref(true)

// 跳转菜品详情页面
const toDetailPage = (item) => {
	uni.navigateTo({
		url: "../details/details?goods=" + JSON.stringify(item)
	})
}

// 跳转到创作页面
const goToWrite = () => {
	uni.switchTab({
		url: "../write/write"
	})
}

// 获取发布列表
const getCollection = async (userId) => {
	loading.value = true
	try {
		let parm = {
			keywords: userId,
			currentPage: currentPage.value,
			pageSize: pageSize.value
		}
		let res = await userWriteListApi(parm)
		if (res && res.code == 200) {
			cooksList.value = res.data.records
		}
	} catch (e) {
		console.error('获取发布列表失败', e)
	} finally {
		loading.value = false
	}
}

// 显示操作菜单
const showActionSheet = (item) => {
	uni.showActionSheet({
		itemList: ['查看详情', '删除菜谱'],
		success: function(res) {
			if (res.tapIndex === 0) {
				toDetailPage(item)
			} else if (res.tapIndex === 1) {
				confirmDelete(item)
			}
		}
	})
}

// 确认删除
const confirmDelete = (item) => {
	uni.showModal({
		title: '删除确认',
		content: `确定要删除"${item.goodsName}"吗？删除后无法恢复`,
		confirmColor: '#e74c3c',
		success: function(res) {
			if (res.confirm) {
				onDelete(item)
			}
		}
	})
}

// 删除菜谱
const onDelete = async (item) => {
	try {
		let res = await wxupdateDeleteApi({
			userId: uni.getStorageSync("userId"),
			goodsId: item.goodsId,
		})
		if (res && res.code == 200) {
			uni.showToast({
				title: "删除成功",
				icon: 'success'
			})
			// 重新加载列表
			getCollection(userId.data)
		}
	} catch (e) {
		uni.showToast({
			title: "删除失败",
			icon: 'none'
		})
	}
}

onReady(() => {
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

.loading-card {
	background: white;
	border-radius: 16rpx;
	margin-bottom: 20rpx;
	height: 200rpx;
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

/* 菜谱卡片 */
.recipe-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.recipe-card {
	background: white;
	border-radius: 20rpx;
	overflow: hidden;
	display: flex;
	align-items: center;
	padding: 24rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
	transition: transform 0.2s;
	
	&:active {
		transform: scale(0.98);
	}
}

.recipe-image-wrapper {
	position: relative;
	margin-right: 24rpx;
}

.recipe-image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 16rpx;
	background-color: #f0f0f0;
}



.recipe-info {
	flex: 1;
	min-width: 0;
}

.recipe-name {
	font-size: 30rpx;
	font-weight: 600;
	color: #2c3e50;
	display: block;
	margin-bottom: 8rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.recipe-desc {
	font-size: 24rpx;
	color: #7f8c8d;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	line-height: 1.5;
	margin-bottom: 16rpx;
}



.recipe-actions {
	margin-left: 16rpx;
	padding: 8rpx;
}

.safe-area-bottom {
	height: 40rpx;
}

/* 响应式调整 */
@media (max-width: 750rpx) {
	.list-section {
		padding: 0 20rpx;
	}
	
	.recipe-image {
		width: 140rpx;
		height: 140rpx;
	}
	
	.recipe-name {
		font-size: 28rpx;
	}
	
	.recipe-desc {
		font-size: 22rpx;
	}
}
</style>