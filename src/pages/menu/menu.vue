<template>
	<view>
			<!-- 菜品名字 -->
			<view class="food_name">
				<view class="food_text1">
					<text>好吃不长肉~</text>
				</view>
				<view class="food_text2">
					<text>家常菜</text>
				</view>
			</view>
			<!-- 视频 -->
			<video controls="false" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
				class="dv"></video>
		<!-- 卡片 -->
		<view class="kp">
			<view class="kp_description">
				麻婆豆腐，这道源自四川的经典菜肴不仅色泽鲜艳，而且味道独特，辣中带麻，麻中透香，令人回味无穷。
			</view>
			<view class="kp_steps">
				<view class="kp_steps_item">
					1、准备材料：将番茄洗净，切成小块备用。鸡蛋打入碗中，加入少许盐，搅拌均匀。
				</view>
				<view class="kp_steps_item">
					2、炒鸡蛋：在热锅中倒入适量的食用油，待油热后，倒入鸡蛋液。用铲子轻轻推动鸡蛋液，使其均匀受热，煎至两面金黄，然后用铲子将鸡蛋划成小块，盛出备用。
				</view>
				<view class="kp_steps_item">
					3、炒番茄：在同一个锅中，再次加入少许食用油（如果炒鸡蛋时剩余的油足够，也可以不再加油）。油热后，倒入切好的番茄块，用铲子翻炒至番茄变软出汁。
				</view>
				<view class="kp_steps_item">
					4、调味：在炒软的番茄中加入适量的盐（根据个人口味调整），以及白糖（如果喜欢更鲜甜的味道）。继续翻炒均匀，使番茄充分吸收调味料的味道。
				</view>
				<view class="kp_steps_item">
					5、混合：将之前炒好的鸡蛋块倒入锅中，与番茄一起翻炒均匀，使鸡蛋充分吸收番茄的汁液。
				</view>
				<view class="kp_steps_item">
					6、出锅：当鸡蛋和番茄完全融合，且汤汁浓稠时，即可关火。撒上葱花（如果喜欢），翻炒均匀后出锅装盘。
				</view>
			</view>
			
			<view style="height: 50rpx;"></view>
			
			<view class="underline-container">
				<view class="underline"></view>  
			    <view class="underline-text">用料</view>
			    <view class="underline"></view>  
			</view>
			
			<view style="height: 50rpx;"></view>
			
			<view class="kp_Materials">
				<view class="banxvan">
				  <view class="banxvan_item">
				      <text class="banxvan_text1">咸鸭蛋</text>
				      <text style="margin-right: auto;"></text>
				      <text class="banxvan_text2">2个</text>
				  </view>
				  <view class="banxvan_item">
				    <text class="banxvan_text1">皮蛋</text>
				    <text style="margin-right: auto;"></text>
				    <text class="banxvan_text2">2个</text>
				  </view>
				  <view class="banxvan_item">
				    <text class="banxvan_text1">葱花</text>
				    <text style="margin-right: auto;"></text>
				    <text class="banxvan_text2">10g</text>
				  </view>
				  <view class="banxvan_item">
				    <text class="banxvan_text1">豆腐</text>
				    <text style="margin-right: auto;"></text>
				    <text class="banxvan_text2">200g</text>
				  </view>
				  <view class="banxvan_item">
				    <text class="banxvan_text1">白菜</text>
				    <text style="margin-right: auto;"></text>
				    <text class="banxvan_text2">200g</text>
				  </view>
				</view>
			</view>
			
			<view style="height: 50rpx;"></view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// https://www.bilibili.com/video/BV1hS4y1A7sw/?share_source=copy_web&vd_source=75aa6dd6ab678ec17d2557465af3d1ba
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.food_name {
		position: sticky;
		top: 20rpx;
		z-index: -99;
		display: flex;
		margin-top: 20rpx;
		flex-direction: column;
	}

	.food_text1 {
		padding-left: 30rpx;
		// background-color: aqua;
		font-size: 38rpx;
		letter-spacing: 2px; //文字间距
		font-weight: 600;
	}

	.food_text2 {
		// background-color: aquamarine;
		padding-left: 30rpx;
		margin-top: 10rpx;
		font-size: 38rpx;
		letter-spacing: 2px;
		font-weight: 600;
	}

	.dv {
		position: sticky;
		top: 200rpx;
		z-index: 2;
		object-fit: cover;
		width: 90%;
		height: 380rpx;
		border-radius: 20rpx;
		margin-left: 35rpx;
		margin-top: 70rpx;
		margin-bottom: 30rpx;
		// background-color: blueviolet;
	}

	.kp {
		position: sticky;
		z-index: 3;
		margin: auto;
		width: 95%;
		background-color: #ffffff;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
	}
	.kp_description{
		padding-top: 20rpx;
		margin: auto;
		width: 91%;
		font-size: 28rpx;
		letter-spacing: 2px;
		font-weight: 200;
		text-indent:2em;
		line-height:28px;
		white-space:pre-wrap
	}
	.kp_steps{
		padding-top: 20rpx;
		margin: auto;
		width: 91%;
		// background-color: aqua;
	}
	.kp_steps_item{
		font-size: 28rpx;
		letter-spacing: 2px;
		font-weight: 400;
		line-height:48rpx;
		white-space:pre-wrap
	}
	
	
	.kp_Materials{
		margin: auto;
		width: 90%;
	}
	.banxvan{
	  width: 100%;
	  height: 400rpx;
	  display: flex;
	  flex-direction: column;
	  border-radius: 10rpx;
	  background-color: rgb(236, 235, 235);
	}
	.banxvan_item{
	  // background: rgb(163, 14, 14);
	  width: 600rpx;
	  height: 60rpx;
	  margin-top: 15rpx;
	  margin-left: 15rpx;
	  display: flex;
	  align-items: center;
	}
	.banxvan_text1{
	  margin-left: 20rpx;
	  font-size: 32rpx;
	  letter-spacing: 3rpx;
	}
	.banxvan_text2{
	  margin-right: 20rpx;
	  letter-spacing: 3rpx;
	}
	
	
	// 下划线
	.underline-container {
		margin-top: 25rpx;
	  display: flex;  
	  align-items: center;  
	}  
	  
	.underline-text {  
	  
	  background-color: white; /* 如果背景不是白色，需要设置这个 */  
	  z-index: 1; /* 确保文字在下划线之上 */  
	  position: relative;  
	  letter-spacing: 2px;
	  font-weight: 600;
	}  
	  
	.underline {  
	  flex: 1;  
	  height: 1rpx; /* 下划线高度 */  
	  background-color: #b2b2b2; /* 下划线颜色 */  
	  margin: 20rpx;
	}
</style>
