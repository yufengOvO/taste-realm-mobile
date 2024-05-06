<template>
	<!-- 头像 -->
	<view class="u-p-t-40 u-p-b-30 u-p-d-l-60 login">
		<u-avatar src="/static/logo.png" size="140" mode="circle"></u-avatar>
	</view>
	<u-from class="forms" :model="loginModel" ref="form1">
		<u-form-item left-icon="account-fill" left-icon-style="font-size:24px;color:#FF7679">
			<u-input placeholder="请输入账户" v-model="loginModel.username" />
		</u-form-item>
		<u-form-item left-icon="lock" left-icon-style="font-size:24px;color:#FF7670">
			<u-input placeholder="请输入密码" v-model="loginModel.password" />
		</u-form-item>
		<view class="passtext">
			忘记密码
		</view>
		<!-- 按钮 -->
		<u-button :custom-style="customStyle1">登录</u-button>
		<u-button type="success" :custom-style="customStyle2">z注册</u-button>
	</u-from>
</template>

<script setup>
	import {
		reactive
	} from 'vue';
	const loginModel = reactive({
		username:'',
		password:''
	})
	//登录按钮
	const customStyle1 = reactive({
		marginTop:'40px',
		background:'#ff7670',
		color:'#fff',
		width:'100%'
	})
	//注册按钮
	const customStyle2 = reactive({
		marginTop:'40px',
		color:'#fff',
		width:'100%'
	})
</script>

<style lang="scss">
	.login{
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.forms{
		width: 100%;
		margin-top: 30px;
	}
	.passtext{
		display: flex;
		justify-content: flex-end;
		color: #FF7670;
		margin-top: 15px;
	}
</style>
