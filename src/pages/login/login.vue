<template>
	<view>
		<view style="height: 200rpx;"></view>
		<form :model="loginModel" ref="form1" class="form">
			<view class="form_item">
				<view class="form_item_text">账号：</view>
				<input class="form_item_input" v-model="loginModel.username" type="text" placeholder="请输入你的账号" />
			</view>
			<view class="form_item">
				<view class="form_item_text">密码：</view>
				<input class="form_item_input" v-model="loginModel.password" type="text" password placeholder="请输入你的密码" />
			</view>
			<view class="passtext">
				忘记密码
			</view>
			<view class="but">
				<button class="but1" @click="toCommit">登陆</button>
				<button class="but2" @click="toRegister">注册</button>
			</view>
		</form>
	</view>

</template>

<script setup>
	import {
		loginApi
	} from '../../api/user.js'
	import {
		reactive
	} from 'vue';

	const loginModel = reactive({
		username: '',
		password: ''
	})
	//登录
	const toCommit = async () => {
		if (!loginModel.username) {
			uni.showToast({
				title: '请输入账户',
				icon: 'none',
				duration: 2000
			})
			return;
		}
		if (!loginModel.password) {
			uni.showToast({
				title: '请输入密码',
				icon: 'none',
				duration: 2000
			})
			return
		}
		let res = await loginApi(loginModel)
		if (res && res.code == 200) {
			//储存用户id
			uni.setStorageSync('userId', res.data.userId)
			uni.setStorageSync('nickName', res.data.nickName)
			uni.setStorageSync('picture', res.data.picture)
			//跳转首页
			uni.switchTab({
				url: '../index/index'
			})
		}
	}
	
	const item = reactive({
		background: '#181bff'
	})
	
	// 输入框
	const input = reactive({
		background: '#10ff60'
	})
	
	//登录按钮
	const customStyle1 = reactive({
		marginTop: '40px',
		background: '#ff7670',
		color: '#fff',
		width: '100%'
	})
	//注册按钮
	const customStyle2 = reactive({
		marginTop: '40px',
		color: '#fff',
		width: '100%'
	})
	
	
	const toRegister = () => {
		uni.navigateTo({
			url: '../register/register'
		})
	}
</script>

<style lang="scss">
	page{
		background-image: url('https://cdn.pixabay.com/photo/2021/10/10/16/30/food-6697404_1280.jpg');
		background-size: cover;
	}
	page::before {
	  content: '';
	  position: absolute;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  background-image: inherit;
	  background-size: inherit;
	  background-position: inherit;
	  filter: blur(2px); /* 应用高斯模糊效果 */
	  z-index: -1; /* 确保模糊背景在内容后面 */
	}

	
	.login {
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.form {
		z-index: 5;
		margin: auto;
		width: 85%;
		height: 1000rpx;
		display: flex;
		flex-direction: column;
		// background-color: #22b9ff;
	}

	.forms {
		width: 100%;
		
		
	}

	.passtext {
		display: flex;
		justify-content: flex-end;
		color: #ff1e1e;
		margin-top: 25px;
	}
	.form_item{
		margin-top: 40rpx;
		height: 100rpx;
		border-radius: 50rpx;
		display: flex;
		flex-direction: row;
		background-color: rgba(255, 255, 255, 0.6);
	}
	.form_item_text{
		margin-left: 20rpx;
		padding-top: 30rpx;
		// background-color: aqua;
		height: 100rpx;
	}
	.form_item_input{
		color: #000;
		height: 100rpx;
	}
	.but{
		margin-top: 150rpx;
		display: flex;
		flex-direction: row;
	}
	
	.but1{
		height: 100rpx;
		width: 40%;
		border-radius: 50rpx;
		background-color: rgba(0, 0, 0, 0.9);
		letter-spacing: 20rpx;
		color: #ffffff;
		font-weight: 600;
	}
	.but2{
		height: 100rpx;
		width: 40%;
		border-radius: 50rpx;
		background-color: rgba(255, 255, 255, 0.9);
		letter-spacing: 20rpx;
		font-weight: 600;
	}
	
	
	.form-item {
		
		margin-top: 20rpx;
		border-radius: 50rpx;
		height: 100rpx;
		padding-left: 20rpx;
		background-color: rgba(0, 0, 0, 0.3);
	}
</style>
