<template>
	<view>
		<view class="food_list">
			<view class="food_box">
				<view class="food_img"></view>
				<view class="food_text">·红烧牛肉·</view>
			</view>
			<view class="food_box">
				<view class="food_img"></view>
				<view class="food_text">·红烧牛肉·</view>
			</view>
			<view class="food_box">
				<view class="food_img"></view>
				<view class="food_text">·红烧牛肉·</view>
			</view>
			<view class="food_box">
				<view class="food_img"></view>
				<view class="food_text">·红烧牛肉·</view>
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
	.food_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.food_box{
		width: 33%;
		height: 400rpx;
		padding-left: 25rpx;
		padding-top: 25rpx;
		// background-color: aqua;
	}
	.food_img{
		width: 95%;
		height: 300rpx;
		border-radius: 20rpx;
		background-color: #ffaa22;
		background-size: cover;
	}
	.food_text{
		margin-top: 15rpx;
		font-size: 28rpx;
		font-weight: 600;
		margin-left: 39rpx;
	}
</style>
