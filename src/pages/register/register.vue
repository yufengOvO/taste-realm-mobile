<template>
	<view class="u-p-t-40 u-p-b-30">
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
		  <image class="avatar" :src="avatarUrl"></image>
		</button>
	</view>
	<view class="forms">
		<u-form :model="loginModel" ref="form1">
			<u-form-item prop="nickName"  leftIcon="account-fill" left-icon-style="font-size:24px;color:#000000;">
				<u-input placeholder="请输入昵称"  v-model="loginModel.nickName" />
			</u-form-item>
			<u-form-item prop="phone"  leftIcon="phone-fill" left-icon-style="font-size:24px;color:#000000;">
				<u-input placeholder="请输入电话" v-model="loginModel.phone" />
			</u-form-item>
			<u-form-item prop="username" leftIcon="account-fill" left-icon-style="font-size:24px;color:#000000;">
				<u-input placeholder="请输入账户" v-model="loginModel.username" />
			</u-form-item>
			<u-form-item prop="password" leftIcon="lock" leftIconStyle="font-size:24px;color:#000000;">
				<u-input placeholder="请输入密码" v-model="loginModel.password" />
			</u-form-item>
			<u-form-item prop="passwordConfirm" leftIcon="lock" left-icon-style="font-size:24px;color:#000000;">
				<u-input placeholder="请再次输入密码" v-model="loginModel.passwordConfirm" />
			</u-form-item>
			<view class="passtext" @click="toLogin">
				已有账号？去登录
			</view>
			<!-- 按钮 -->
<!-- 			<u-button type="success" :custom-style="customStyle2" @click="commit">注册</u-button> -->
		</u-form>
	</view>
	<button @click="commit" class="but">注册</button>
</template>

<script setup>
	import {registerApi} from '../../api/user.js'
	import {
		ref,
		reactive
	} from 'vue';
	const loginModel = reactive({
		nickName:'',
		picture:'',
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
	const onChooseAvatar = (e) => {
		console.log("用户点击了")
		console.log(e)
		//把用户选择的图片上传至服务器
		uni.uploadFile({
			url: `http://localhost:8088/api/upload/uploadImage`,
			filePath: e.detail.avatarUrl,
			name: 'file',
			success: (uploadFileRes) => {
				avatarUrl.value = "http://localhost:8088"+JSON.parse(uploadFileRes.data).data
				loginModel.picture = "http://localhost:8088"+JSON.parse(uploadFileRes.data).data
				console.log(avatarUrl);
			}
		});
		// uni.chooseImage({
		//         success: (res) => {
		//           const tempFilePaths = res.tempFilePaths;
		//           // 在这里可以处理图片路径，如上传服务器或显示在页面上
		//           console.log(tempFilePaths);
		//         },
		//         fail: (err) => {
		//           console.error(err);
		//         }
		//       });
	
	}
	const avatarUrl = ref('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
	//表单验证
	const rules = reactive({
		nickName:[{
			required:true,
			message:'请输入昵称',
			trigger:['change','blur']
		}],
		phone:[{
			required:true,
			message:'请输入电话',
			trigger:['change','blur']
		}],
		username:[{
			required:true,
			message:'请输入用户名',
			trigger:['change','blur']
		}],
		password:[{
			required:true,
			message:'请输入密码',
			trigger:['change','blur']
		}],
		passwordConfirm:[{
			required:true,
			message:'请输入确认密码',
			trigger:['change','blur']
		}],
	})
	//去登陆
	const toLogin = () =>{
		uni.navigateTo({
			url:"../login/login"
		})
	}
	//导入生命周期函数
	import{ onReady } from '@dcloudio/uni-app'
	//表单ref属性
	const form1 = ref()
	//提交注册
	const commit = () => {
		form1.value.validate(async (valid) =>{
			if(valid){
				if(loginModel.passwordConfirm != loginModel.password){
					uni.showToast({
						title:'密码和确定密码不一致',
						icon:'none',
						duration:2000
					})
					return
				}
				let res = await registerApi(loginModel)
				if(res && res.code == 200){
					uni.navigateTo({
						url:'../login/login'
					})
				}
			}else{
				uni.showToast({
					title:'请完善表单',
					icon:'none',
					duration:2000
				})
			}
			
		})
	}
	onReady (() =>{
		form1.value.setRules(rules)
	})
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
	
	.avatar-wrapper{
		border-radius: 100%;
		display: flex;
		justify-content: center;
		height: 100px;
		width: 100px;
		padding: 0px;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		.avatar{
			border-radius: 100%;
			height: 100px;
			width: 100px;
		}
	}
	.forms {
		width: 80%;
		padding: 20px;
		margin: auto;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 0.6);
	}
	
	//忘记密码
	.passtext {
		display: flex;
		justify-content: flex-end;
		color: red;
		margin-top: 15px;
	}
	
	.but{
		color: #ffffff;
		margin-top: 80rpx;
		border-radius: 80rpx;
		width: 80%;
		background-color: rgba(0, 0, 0, 0.7);
		letter-spacing: 20rpx;
		font-weight: 600;
	}
</style>
