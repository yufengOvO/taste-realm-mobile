<template>
	<view>
		<!-- 搜索框 -->
		<view class="tab-strickt">
			<u-search placeholder="日照香炉生紫烟" v-model="keyword" bg-color="#e7e7e7" margin="8px" style="flex-grow: 1;"
				:show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
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
