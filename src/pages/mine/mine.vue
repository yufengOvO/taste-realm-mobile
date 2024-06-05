<template>
	<view>
		<view class="tx">
			<view class="tx_img"></view>
			<view class="tx_text">于硕跟</view>
		</view>

		<!-- 广告 -->
		<view class="level share-box" bindtap="detailClick">
			<view>
				<view class="money">
					<text>开通会员</text>
					<text class="money-text"></text>
				</view>
				<view class="share-text">成为会员，尊享免广告等权益！</view>
			</view>
			<view class="share-btn">￥6.00开通</view>
		</view>


		<view class="list_box">
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="rmb-circle" title="支付"></u-cell-item>
				</u-cell-group>
			</view>

			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="star" title="我的发布"></u-cell-item>
					<u-cell-item icon="photo" title="我的求购"></u-cell-item>
					<u-cell-item icon="heart" title="我的收藏"></u-cell-item>
					<u-cell-item icon="red-packet" title="购买订单"></u-cell-item>
					<u-cell-item icon="order" title="出售订单"></u-cell-item>
					<u-cell-item icon="edit-pen" title="修改密码"></u-cell-item>
				</u-cell-group>
			</view>

			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="setting" title="退出账户"></u-cell-item>
				</u-cell-group>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	// 页面背景
	.page {
		background-color: #d7d7d7;
	}

	// 头像
	.tx {
		display: flex;
		background-color: #d7d7d7;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40rpx 0;
	}

	.tx_img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		background-color: aqua;
	}

	.tx_text {
		margin-top: 20rpx;
		font-size: 38rpx;
		font-weight: 600;
		text-align: center;
		letter-spacing: 2px;
	}

	/* 广告 */
	.level {
		display: flex;
		align-items: center;
	}

	.share-box {
		justify-content: space-between;
		margin-top: -10rpx;
		background-color: rgb(65, 64, 64);
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		padding: 20rpx;
	}

	.money {
		font-size: 30rpx;
		color: rgb(248, 201, 70);
	}

	.money-text {
		padding-left: 20rpx;
	}

	.share-text {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: rgba(248, 212, 112, 0.479);
	}

	.share-btn {
		background-color: rgb(248, 201, 70);
		color: rgb(54, 54, 54);
		border-radius: 50rpx;
		font-size: 26rpx;
		padding: 5rpx 15rpx 8rpx 15rpx;
	}

	.sign-box {
		margin: 0 20rpx;
		padding: 30rpx 20rpx;
		font-size: 30rpx;
		color: gray;
		justify-content: space-around;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		background-color: white;
	}

	.more-box {
		border-top-right-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		background-color: #9e9d9d;
		padding: 5% 30rpx;
		font-size: 30rpx;
		margin: 20rpx;
		color: white;
	}
	
</style>
