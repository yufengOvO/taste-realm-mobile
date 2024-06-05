<template>
	<view>
		<!-- 搜索框 -->
		<view class="tab-strickt">
			<u-search placeholder="日照香炉生紫烟" v-model="keyword" bg-color="#e7e7e7" margin="8px" style="flex-grow: 1;"
				:show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
		
		<view class="fl_top">
			<view class="fl_top_box">
				<view class="fl_top_box_overlay">
					<view class="fl_top_box_text">
						川菜
					</view>
				</view>
			</view>
			
			<view class="fl_top_box">
				<view class="fl_top_box_overlay">
					<view class="fl_top_box_text">
						川菜
					</view>
				</view>
			</view>
			
			<view class="fl_top_box">
				<view class="fl_top_box_overlay">
					<view class="fl_top_box_text">
						川菜
					</view>
				</view>
			</view>
			
			<view class="fl_top_box">
				<view class="fl_top_box_overlay">
					<view class="fl_top_box_text">
						川菜
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="underline-container">
			<view class="underline"></view>  
		    <view class="underline-text">分类</view>
		    <view class="underline"></view>
		</view>
		
		
		<view class="fl_btm">
			<view class="fl_btm_box">
				<view class="fl_btm_box_overlay">
					<view class="fl_btm_box_text">
						地方菜
					</view>
				</view>
			</view>
			
			<view class="fl_btm_box">
				<view class="fl_btm_box_overlay">
					<view class="fl_btm_box_text">
						新疆菜
					</view>
				</view>
			</view>
			
			<view class="fl_btm_box">
				<view class="fl_btm_box_overlay">
					<view class="fl_btm_box_text">
						粤菜
					</view>
				</view>
			</view>
			
			<view class="fl_btm_box">
				<view class="fl_btm_box_overlay">
					<view class="fl_btm_box_text">
						粤菜
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script setup>
 import {
 	ref
 } from 'vue';
 const list = ref([
	 {cata_name:'全部'},
	 {cata_name:'手机'},
	 {cata_name:'电脑'},
	 {cata_name:'衣服'},
	 {cata_name:'鞋子'},
	 {cata_name:'图书'},
	 {cata_name:'时尚'},
 ])
 //绑定索引
 const current = ref(0)
 //瀑布流
 const flowList = ref(
 	[{
 			price: 35,
 			title: '北国风光，千里冰封，万里雪飘',
 			shop: '李白杜甫白居易旗舰店',
 			image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
 		},
 		{
 			price: 75,
 			title: '望长城内外，惟余莽莽',
 			shop: '李白杜甫白居易旗舰店',
 			image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
 		},
 		{
 			price: 385,
 			title: '大河上下，顿失滔滔',
 			shop: '李白杜甫白居易旗舰店',
 			image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
 		},
 		{
 			price: 784,
 			title: '欲与天公试比高',
 			shop: '李白杜甫白居易旗舰店',
 			image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
 		},
 		{
 			price: 7891,
 			title: '须晴日，看红装素裹，分外妖娆',
 			shop: '李白杜甫白居易旗舰店',
 			image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',
 		},
 		{
 			price: 2341,
 			shop: '李白杜甫白居易旗舰店',
 			title: '江山如此多娇，引无数英雄竞折腰',
 			image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg',
 		},
 		{
 			price: 661,
 			shop: '李白杜甫白居易旗舰店',
 			title: '惜秦皇汉武，略输文采',
 			image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
 		},
 		{
 			price: 1654,
 			title: '唐宗宋祖，稍逊风骚',
 			shop: '李白杜甫白居易旗舰店',
 			image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
 		},
 		{
 			price: 1678,
 			title: '一代天骄，成吉思汗',
 			shop: '李白杜甫白居易旗舰店',
 			image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
 		},
 		{
 			price: 924,
 			title: '只识弯弓射大雕',
 			shop: '李白杜甫白居易旗舰店',
 			image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
 		},
 		{
 			price: 8243,
 			title: '俱往矣，数风流人物，还看今朝',
 			shop: '李白杜甫白居易旗舰店',
 			image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
 		},
 	]
 )
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
		margin-top: 25rpx;
	  display: flex;  
	  align-items: center;  
	  margin-bottom: 20rpx;
	}  
	  
	.underline-text {  
	  color: #b2b2b2;
	  background-color: white; /* 如果背景不是白色，需要设置这个 */  
	  z-index: 1; /* 确保文字在下划线之上 */  
	  position: relative;  
	  letter-spacing: 5px;
	  font-weight: 500;
	  font-size: 30rpx
	}  
	  
	.underline {  
	  flex: 1;  
	  height: 1rpx; /* 下划线高度 */  
	  background-color: #b2b2b2; /* 下划线颜色 */  
	  margin: 20rpx;
	}
	
	// 推荐分类
	.fl_top{
		display: flex;
		flex-wrap: wrap;
	}
	.fl_top_box{
		width: 44%;
		height: 200rpx;
		margin-left: 4%;
		margin-top: 15rpx;
		border-radius: 20rpx;
		background-color: #07a8ff;
	}
	.fl_top_box_overlay{
		display: flex;
		width: 100%;
		height: 200rpx;
		border-radius: 20rpx;
		/* 设置蒙版颜色及透明度 */
		background-color: rgba(0, 0, 0, 0.5);
	}
	.fl_top_box_text{
		color: white;
		width: 55%;
		height: 35%;
		// background-color: aquamarine;
		margin: auto;
		text-align: center;
		font-size: 48rpx;
		letter-spacing: 20rpx;
		font-weight: 600;
	}
	
	// 具体分类
	.fl_btm{
		display: flex;
		flex-wrap: wrap;
	}
	.fl_btm_box{
		width: 30%;
		height: 220rpx;
		margin-left: 2.5%;
		margin-top: 15rpx;
		border-radius: 20rpx;
		background-color: #07a8ff;
	}
	.fl_btm_box_overlay{
		display: flex;
		width: 100%;
		height: 220rpx;
		border-radius: 20rpx;
		/* 设置蒙版颜色及透明度 */
		background: linear-gradient(to right bottom,rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.1));
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
</style>
