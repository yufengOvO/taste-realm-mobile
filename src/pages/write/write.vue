<template>
	<view class="bg">
		<view class="form_box">
			<u-form :model="addModel" ref="form1">
				<!-- <view v-if="isBtn == 0"> -->
				<u-form-item prop="goodsName" label="菜名:">
					<u-input placeholder="请输入名称" v-model="addModel.goodsName" />
				</u-form-item>
				<u-form-item prop="goodsDesc" label="简介:">
					<u-input placeholder="请输入简介" v-model="addModel.goodsDesc" />
				</u-form-item>
				<!-- 分类 -->
				<u-form-item prop="categoryName" label="分类">
					<u-input @click="openSelect" placeholder="请选择分类" v-model="addModel.categoryName"></u-input>
					<u-select @confirm="selectConfirm" v-model="show" :list="selectList"></u-select>
				</u-form-item>
				<!-- 食材 -->
				<u-form-item prop="categoryName" label="食材">
					<u-input @click="openSelect2" placeholder="请选择食材" v-model="addModel.ingredName"></u-input>
					<u-select @confirm="IngredConfirm" v-model="show1" :list="IngredList"></u-select>
					<!-- <u-checkbox-group v-model="addModel.ingredName">
							<u-checkbox v-model="addModel.ingredName" v-for="(item, index) in IngredList" :key="index"
								:name="item.ingredName">
								{{ item.ingredName }}
							</u-checkbox>
						</u-checkbox-group> -->
				</u-form-item>

				<u-form-item prop="make" label-width="auto" label="制作方法:">
					<u--textarea v-model="addModel.make" placeholder="请输入内容"></u--textarea>
					<u-input placeholder="例如1.xxxxxxx 2.xxxxxxxx" v-model="addModel.make" />
				</u-form-item>


				<!-- </view> -->

				<!-- 微信号，联系地址 -->
				<!-- <view v-if="isBtn == 1"> -->
				<u-form-item prop="userName" label-width="auto" label="发布人:">
					<u-input placeholder="请输入您的姓名" v-model="addModel.userName" />
				</u-form-item>
				<u-form-item prop="phone" label-width="auto" label="联系电话:">
					<u-input placeholder="请输入联系电话" v-model="addModel.phone" />
				</u-form-item>

				<u-form-item prop="image" label="封面:">
					<u-upload ref="imgRef" :action="action" :file-list="fileList" @on-remove='onRemove'
						@on-change="onChange"></u-upload>
				</u-form-item>
				<u-form-item prop="video" label="视频">
					<uni-file-picker v-model="fileValue" :file-mediatype="['video']" mode="grid" @select="onFileSelect"
						@progress="onProgress" @success="onSuccess" @fail="onFail" />
				</u-form-item>
				<!-- 	</view> -->
				<u-button :custom-style="customStyle" @click="commit">发布</u-button>
			</u-form>
		</view>
		<view class="box"></view>
		<!-- <button @click="commit" class="btn">{{btnText}}</button> -->

	</view>
</template>

<script setup>
	import {
		categoryApi,
		releaseApi,
		IgredcategoryApi
	} from '../../api/goods.js'
	//导入生命周期函数
	import {
		onReady
	} from '@dcloudio/uni-app'
	import {
		reactive,
		ref,

	} from 'vue';
	import http from '../../common/http.js'


	// // 下一步
	// const btnText = ref('下一步')
	// const isBtn = ref(0)

	// 表单数据
	const addModel = reactive({
		userId: uni.getStorageSync('userId'),
		goodsName: '',
		categoryId: '',
		categoryName: '',
		ingredId: '',
		ingredName: '',
		goodsDesc: '',
		userName: '',
		image: '',
		video: '',
		make: ''
	})
	const show = ref(false)
	const show1 = ref(false)
	//打开菜单分类
	const openSelect = () => {
		show.value = true;
	}
	const openSelect2 = () => {
		show1.value = true;
	}

	//分类数据
	const selectList = ref([])
	//读取后端分类数据
	const getSelectList = async () => {
		let res = await categoryApi()
		if (res && res.code == 200) {
			console.log(res)
			selectList.value = res.data;
		}
	}

	//食材数据
	const IngredList = ref([])
	//读取后端食材数据
	const getIngredList = async () => {
		let res = await IgredcategoryApi()
		if (res && res.code == 200) {
			console.log(res)
			IngredList.value = res.data;
		}
	}

	//选择分类
	const IngredConfirm = (e) => {

		addModel.ingredName = e[0].label;
		addModel.ingredId = e[0].value;
	}
	//选择分类
	const selectConfirm = (e) => {

		addModel.categoryName = e[0].label;
		addModel.categoryId = e[0].value;
	}
	// 图片上传路径
	const action = ref(http.baseUrl + "/api/upload/uploadImage")
	// 存储图片路径
	const imgUrl = ref([])
	// 图片上传触发
	const onChange = (res, index, lists, name) => {
		// console.log(res.data)
		let result = JSON.parse(res.data)
		imgUrl.value.push(http.baseUrl + result.data)
		// console.log(imgUrl.value)
		// 把数组里面的图片转为逗号分隔的字符的一行数据
		let url = ''
		for (let k = 0; k < imgUrl.value.length; k++) {
			url = url + imgUrl.value[k] + ','
		}
		addModel.image = url.substring(0, url.lastIndexOf(','))
	}

	// 删除图片
	const onRemove = (index) => {
		imgUrl.value.splice(index, 1)
		let url = ''
		for (let k = 0; k < imgUrl.value.length; k++) {
			url = url + imgUrl.value[k] + ','
		}
		addModel.image = url.substring(0, url.lastIndexOf(','))
	}
	// 视频路径
	const fileValue = ref();
	//选择视频方法
	const onFileSelect = (event) => {
		// 假设 event.detail.tempFilePaths 包含了选择的文件路径数组  
		// 获取第一个视频文件的路径（如果有多个文件，可以选择其他索引）  
		const videoPath = event.tempFilePaths[0];
		console.log('选择的视频路径:', videoPath);
		// 如果需要，可以更新 fileValue  
		// fileValue.value = event.detail; // 或者只保存路径
		uploadFile(videoPath)
	};
	// // 上传进度回调函数 
	const onProgress = (progressEvent) => {
		console.log('Upload progress:', progressEvent);
	};
	const onSuccess = (response) => {
		const dataUrl = JSON.parse(response); // 提取 data 属性的值  
		addModel.video = "http://localhost:8088" + dataUrl.data; // 注意这里我添加了斜杠 /  
		console.log(addModel.video);
		// 返回 data 的值（如果需要的话）  
		return dataUrl; // 这应该在打印和设置addModel.video之后  
	};
	// 上传失败的回调函数 
	const onFail = (error) => {
		console.error('Upload failed:', error);
	};
	//视频上传方法
	const uploadFile = (file) => {
		console.log(file),
			uni.uploadFile({
				url: "http://localhost:8088/api/upload/uploadImage",
				// 修改为你的后端上传接口
				filePath: String(file),
				name: 'file',
				success: (uploadFileRes) => {
					console.log(uploadFileRes)
					onSuccess(uploadFileRes.data);
				},
				fail: (error) => {
					onFail(error);
				},
				complete: () => {
					// Optional: handle completion
				}
			});
	};

	// 获取表单
	const form1 = ref()
	const imgRef = ref()

	// 表单验证规则
	const rules = reactive({
		goodsName: [{
			required: true,
			message: "请填写名称",
			trigger: ['change', 'blur']
		}],
		goodsDesc: [{
			required: true,
			message: "请填写描述",
			trigger: ['change', 'blur']
		}],

		userName: [{
			required: true,
			message: "请填写姓名",
			trigger: ['change', 'blur']
		}],
		phone: [{
			required: true,
			message: "请填写电话",
			trigger: ['change', 'blur']
		}],

	})

	// 提交表单
	// const commit = async () => {
	// 	// // 阻止重复提交  
	// 	// if (isBtn.value === 1) return;
	// 	// isBtn.value = 1; // 设置为 1，表示按钮已被点击  

	// 	// try {
	// 		// 验证表单  
	// 		await form1.value.validate(async (valid) => {
	// 			if (!valid) {
	// 				// 表单验证失败的处理逻辑  
	// 				uni.showToast({
	// 					title: '表单验证失败',
	// 					duration: 2000
	// 				});
	// 				isBtn.value = 0; // 重置按钮状态为可点击  
	// 				return;
	// 			}

	// 			// 提交表单数据到后端  
	// 			let res = await releaseApi(addModel.value);
	// 			if (res && res.code === 200) {
	// 				// 表单提交成功后的处理  
	// 				uni.showToast({
	// 					title: '商品发布成功',
	// 					duration: 2000
	// 				});
	// 					uni.switchTab({
	// 						url: '../index/index'
	// 					});

	// 			} else {
	// 				// 后端返回错误的处理逻辑  
	// 				uni.showToast({
	// 					title: '提交失败',
	// 					duration: 2000
	// 				});
	// 			}


	// 		});

	// };
	// 提交表单
	const commit = () => {
		// console.log(addModel)
		form1.value.validate(async (valid) => {
			if (valid) {
				let res = await releaseApi(addModel)
				if (res && res.code == 200) {
					uni.showToast({
						title: '商品发布成功',
						duration: 2000
					})
					console.log(addModel)
					if (addModel.type == '0') {
						uni.switchTab({
							url: '../unused/unused'
						})
					} else {
						uni.switchTab({
							url: '../buy/buy'
						})
					}
					// 清空数据
					form1.value.resetFields()
					imgUrl.value = []
					addModel.image = '';
					imgRef.value.clear()
					return;
				}
			} else {
				uni.showToast({
					title: '请填写表单',
					duration: 2000
				})
			}
		})
	}
	onReady(() => {
		getSelectList()
		getIngredList()
	})

	// 生命周期函数
	onReady(() => {
		// 设置表单验证规则
		form1.value.setRules(rules);

		getSelectList()
		getIngredList()
	})
</script>

<style lang="scss" scoped>
	.bg {
		padding: 20rpx;
		background: linear-gradient(to bottom, #d7d7d7, #ffffff);
	}

	.box {
		height: 40rpx;
	}

	.form_box {
		padding: 30rpx;
		background-color: #fff;
		width: 95%;
		height: 1100rpx;
		border-radius: 20rpx;
		margin: auto;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	}



	// 按钮
	.btn {
		color: #fefefe;
		width: 95%;
		border-radius: 50rpx;
		background: #ffffff;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		background-color: #000000;
		font-size: 32rpx;
		letter-spacing: 20rpx;
		font-weight: 500;
	}
</style>