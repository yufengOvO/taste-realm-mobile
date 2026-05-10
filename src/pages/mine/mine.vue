<template>
	<view class="container">
		<!-- 用户信息卡片 -->
		<view class="user-card">
			<view class="user-info" @click="wxlogin">
				<view class="avatar-wrapper">
					<image class="avatar" :src="userFrom.picture" mode="aspectFill"></image>
					<view class="vip-badge" v-if="isVip">
						<text class="vip-text">VIP</text>
					</view>
				</view>
				<view class="user-details">
					<text class="nickname">{{ userFrom.nickName || '点击登录' }}</text>
					<text class="user-id" v-if="userFrom.userId">ID: {{ userFrom.userId }}</text>
					<view class="membership-tag" v-if="isVip">
						<text class="membership-text">尊享会员</text>
					</view>
				</view>
			</view>
			
			<!-- 统计信息 -->
			<view class="stats-section">
				<view class="stat-item" @click="toUserWirter">
					<text class="stat-number">{{ publishCount }}</text>
					<text class="stat-label">我的发布</text>
				</view>
				<view class="stat-divider"></view>
				<view class="stat-item" @click="toCollectionpage">
					<text class="stat-number">{{ collectCount }}</text>
					<text class="stat-label">我的收藏</text>
				</view>
				<view class="stat-divider"></view>
				<view class="stat-item">
					<text class="stat-number">{{ likeCount }}</text>
					<text class="stat-label">获赞</text>
				</view>
			</view>
		</view>

		<!-- 会员推广卡片 -->
		<view class="vip-card" v-if="!isVip">
			<view class="vip-content">
				<view class="vip-info">
					<view class="vip-title">
					<uni-icons type="vip" size="24" color="#ffd700"></uni-icons>
					<text class="vip-name">开通会员</text>
					</view>
					<text class="vip-desc">尊享免广告、专属皮肤等8项权益</text>
				</view>
				<view class="vip-action">
					<view class="vip-price">
						<text class="price-symbol">¥</text>
						<text class="price-value">6.00</text>
						<text class="price-unit">/月</text>
					</view>
					<view class="vip-btn">
						<text class="btn-text">立即开通</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 功能菜单 -->
		<view class="menu-section">
			<view class="menu-title">
				<text class="title-text">我的服务</text>
			</view>
			
			<view class="menu-card">
				<view class="menu-item" @click="toUserWirter">
					<view class="menu-icon-wrapper">
						<uni-icons type="edit-pen" size="24" color="#667eea"></uni-icons>
					</view>
					<view class="menu-content">
						<text class="menu-name">我的发布</text>
						<text class="menu-desc">管理发布的菜谱</text>
					</view>
					<text class="menu-arrow">›</text>
				</view>
				
				<view class="menu-item" @click="toCollectionpage">
					<view class="menu-icon-wrapper">
						<uni-icons type="heart" size="24" color="#ff6b6b"></uni-icons>
					</view>
					<view class="menu-content">
						<text class="menu-name">我的收藏</text>
						<text class="menu-desc">查看收藏的菜谱</text>
					</view>
					<text class="menu-arrow">›</text>
				</view>
				
				<view class="menu-item" @click="toUpdatePass">
					<view class="menu-icon-wrapper">
						<uni-icons type="settings" size="24" color="#f39c12"></uni-icons>
					</view>
					<view class="menu-content">
						<text class="menu-name">修改密码</text>
						<text class="menu-desc">账户安全设置</text>
					</view>
					<text class="menu-arrow">›</text>
				</view>
			</view>
		</view>

		<!-- 其他功能 -->
		<view class="other-section">
			<view class="menu-card">
				<view class="menu-item" @click="loginout">
					<view class="menu-icon-wrapper logout-icon">
						<uni-icons type="forward" size="24" color="#e74c3c"></uni-icons>
					</view>
					<view class="menu-content">
						<text class="menu-name logout-text">退出登录</text>
						<text class="menu-desc">退出当前账户</text>
					</view>
					<text class="menu-arrow">›</text>
				</view>
			</view>
		</view>

		<!-- 底部版本信息 -->
		<view class="footer">
			<text class="version">版本 1.0.0</text>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onReady } from '@dcloudio/uni-app'
import { userWriteListApi } from '../../api/user.js'
import { userCollectionListApi } from '../../api/collection.js'

const userFrom = reactive({
	userId: '',
	nickName: '',
	picture: ''
})

// 用户数据
const isVip = ref(false)
const publishCount = ref(0)
const collectCount = ref(0)
const likeCount = ref(0)

// 修改密码
const toUpdatePass = () => {
	uni.navigateTo({
		url: "../update_password/update_password"
	})
}

// 我的收藏
const toCollectionpage = () => {
	uni.navigateTo({
		url: "../collection/collection"
	})
}

// 我的发布
const toUserWirter = () => {
	uni.navigateTo({
		url: "../userwirter/userwirter"
	})
}

// 获取用户信息
onReady(() => {
	uni.getStorage({
		key: 'userId',
		success: function(res) {
			userFrom.userId = res.data
			// 获取发布数量
			getPublishCount(res.data)
			// 获取收藏数量
			getCollectCount(res.data)
		}
	})
	
	uni.getStorage({
		key: 'nickName',
		success: function(res) {
			userFrom.nickName = res.data
		}
	})
	
	uni.getStorage({
		key: 'picture',
		success: function(res) {
			userFrom.picture = res.data
		}
	})
})

// 获取发布数量
const getPublishCount = async (userId) => {
	try {
		let parm = {
			keywords: userId,
			currentPage: 1,
			pageSize: 1000
		}
		let res = await userWriteListApi(parm)
		if (res && res.code == 200) {
			publishCount.value = res.data.records.length
		}
	} catch (e) {
		console.error('获取发布数量失败', e)
	}
}

// 获取收藏数量
const getCollectCount = async (userId) => {
	try {
		let res = await userCollectionListApi(userId)
		if (res && res.code == 200) {
			collectCount.value = res.data.length
		}
	} catch (e) {
		console.error('获取收藏数量失败', e)
	}
}

// 退出登录
const loginout = () => {
	uni.showModal({
		title: '提示',
		content: '确定要退出登录吗？',
		success: function(res) {
			if (res.confirm) {
				uni.reLaunch({
					url: '../login/login'
				})
			}
		}
	})
}
</script>

<style lang="scss" scoped>
.container {
	background: #f5f5f5;
	min-height: 100vh;
	padding-bottom: 60rpx;
}

/* 用户信息卡片 */
.user-card {
	margin: 0 30rpx;
	padding: 40rpx 30rpx;
	background: white;
	border-radius: 24rpx;
	box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.12);
	transform: translateY(-40rpx);
}

.user-info {
	display: flex;
	align-items: center;
	margin-bottom: 40rpx;
}

.avatar-wrapper {
	position: relative;
	margin-right: 30rpx;
}

.avatar {
	width: 140rpx;
	height: 140rpx;
	border-radius: 50%;
	border: 4rpx solid #fff;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
}

.vip-badge {
	position: absolute;
	bottom: 0;
	right: 0;
	background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
	padding: 4rpx 16rpx;
	border-radius: 20rpx;
	border: 2rpx solid #fff;
}

.vip-text {
	font-size: 20rpx;
	color: #8B4513;
	font-weight: bold;
}

.user-details {
	flex: 1;
}

.nickname {
	font-size: 36rpx;
	font-weight: 700;
	color: #2c3e50;
	display: block;
	margin-bottom: 8rpx;
}

.user-id {
	font-size: 24rpx;
	color: #95a5a6;
	display: block;
	margin-bottom: 12rpx;
}

.membership-tag {
	display: inline-block;
	background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
	padding: 6rpx 20rpx;
	border-radius: 20rpx;
}

.membership-text {
	font-size: 22rpx;
	color: #8B4513;
	font-weight: 500;
}

/* 统计信息 */
.stats-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 30rpx 0;
	border-top: 1rpx solid #f1f3f5;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
}

.stat-number {
	font-size: 40rpx;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 8rpx;
}

.stat-label {
	font-size: 24rpx;
	color: #7f8c8d;
}

.stat-divider {
	width: 1rpx;
	height: 60rpx;
	background: #f1f3f5;
}

/* 会员推广卡片 */
.vip-card {
	margin: 0 30rpx 30rpx;
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	border-radius: 24rpx;
	padding: 30rpx;
	box-shadow: 0 8rpx 30rpx rgba(26, 26, 46, 0.3);
}

.vip-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.vip-info {
	flex: 1;
}

.vip-title {
	display: flex;
	align-items: center;
	margin-bottom: 12rpx;
}

.vip-icon {
	margin-right: 12rpx;
}

.vip-name {
	font-size: 32rpx;
	font-weight: 700;
	color: #ffd700;
}

.vip-desc {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.7);
}

.vip-action {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.vip-price {
	display: flex;
	align-items: baseline;
	margin-bottom: 16rpx;
}

.price-symbol {
	font-size: 24rpx;
	color: #ffd700;
}

.price-value {
	font-size: 44rpx;
	font-weight: 700;
	color: #ffd700;
	margin: 0 4rpx;
}

.price-unit {
	font-size: 22rpx;
	color: rgba(255, 255, 255, 0.7);
}

.vip-btn {
	background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
	padding: 12rpx 40rpx;
	border-radius: 30rpx;
}

.btn-text {
	font-size: 26rpx;
	color: #8B4513;
	font-weight: 600;
}

/* 功能菜单 */
.menu-section {
	margin: 0 30rpx 30rpx;
}

.other-section {
	margin: 0 30rpx 30rpx;
}

.menu-title {
	margin-bottom: 20rpx;
	padding-left: 10rpx;
}

.title-text {
	font-size: 30rpx;
	font-weight: 600;
	color: #2c3e50;
	letter-spacing: 2rpx;
}

.menu-card {
	background: white;
	border-radius: 24rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
	overflow: hidden;
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1rpx solid #f8f9fa;
	
	&:last-child {
		border-bottom: none;
	}
}

.menu-icon-wrapper {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f8f9fa;
	border-radius: 20rpx;
	margin-right: 24rpx;
}

.logout-icon {
	background: #fff5f5;
}

.menu-icon {
	font-size: 36rpx;
}

.menu-content {
	flex: 1;
}

.menu-name {
	font-size: 30rpx;
	font-weight: 600;
	color: #2c3e50;
	display: block;
	margin-bottom: 6rpx;
}

.logout-text {
	color: #e74c3c;
}

.menu-desc {
	font-size: 24rpx;
	color: #95a5a6;
}

.menu-arrow {
	font-size: 36rpx;
	color: #bdc3c7;
	font-weight: 300;
}

/* 底部版本信息 */
.footer {
	text-align: center;
	padding: 40rpx 0;
}

.version {
	font-size: 24rpx;
	color: #bdc3c7;
}

/* 响应式调整 */
@media (max-width: 750rpx) {
	.container {
		padding-bottom: 40rpx;
	}
	
	.user-card {
		margin: 0 20rpx;
		padding: 30rpx 20rpx;
	}
	
	.avatar {
		width: 120rpx;
		height: 120rpx;
	}
	
	.nickname {
		font-size: 32rpx;
	}
	
	.stat-number {
		font-size: 36rpx;
	}
	
	.vip-card {
		margin: 0 20rpx 20rpx;
		padding: 24rpx;
	}
	
	.menu-section,
	.other-section {
		margin: 0 20rpx 20rpx;
	}
}
</style>