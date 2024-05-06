<template>
	<view class="u-p-t-40 u-p-b-30">
		<button class="avatar-wrapper" open-type="chooseAvatar" bind:chooseavatar="onChooseAvatar">
		  <image class="avatar" :src="avatarUrl"></image>
		</button>
	</view>
	<view class="forms">
		<u-form :model="loginModel" ref="form1">
			<u-form-item leftIcon="account-fill" left-icon-style="font-size:24px;color:#ff7670;">
				<u-input placeholder="请输入电话" v-model="loginModel.phone" />
			</u-form-item>
			<u-form-item leftIcon="account-fill" left-icon-style="font-size:24px;color:#ff7670;">
				<u-input placeholder="请输入账户" v-model="loginModel.username" />
			</u-form-item>
			<u-form-item leftIcon="lock" leftIconStyle="font-size:24px;color:#ff7670;">
				<u-input placeholder="请输入密码" v-model="loginModel.password" />
			</u-form-item>
			<u-form-item leftIcon="account-fill" left-icon-style="font-size:24px;color:#ff7670;">
				<u-input placeholder="请再次输入账户" v-model="loginModel.passwordConfirm" />
			</u-form-item>
			<view class="passtext">
				已有账号？去登录
			</view>
			<!-- 按钮 -->
			<u-button type="success" :custom-style="customStyle2">注册</u-button>
		</u-form>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	const loginModel = reactive({
		phone:'',
		username: '',
		password: '',
		passwordConfirm:''	
	})
	const customStyle2 = reactive({
		marginTop: '35px',
		color: '#fff',
		width: '100%',
	})
	// 用户选择的头像
	const onChooseAvatar = (e) => {}
	const avatarUrl = ref('/static/user.jpg')
</script>

<style lang="scss">
	.avatar-wrapper{
		border-radius: 100%;
		display: flex;
		justify-content: center;
		height: 70px;
		width: 70px;
		padding: 0px;
		.avatar{
			border-radius: 100%;
			height: 70px;
			width: 70px;
		}
	}
	.forms {
		width: 100%;
		margin-top: 30px;
		padding: 20px;
	}
	
	//忘记密码
	.passtext {
		display: flex;
		justify-content: flex-end;
		color: red;
		margin-top: 15px;
	}
</style>
