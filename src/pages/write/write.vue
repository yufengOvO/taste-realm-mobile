<template>
	<view class="bg">
		<view class="form_box">
			<u-form :model="addModel" ref="form1">
				<view v-show="isBtn == 0">
					<u-form-item prop="goodsName" label="菜名:" required>
						<u-input placeholder="请输入名称" v-model="addModel.goodsName" />
					</u-form-item>
					<u-form-item prop="goodsDesc" label="简介:" required>
						<uni-easyinput type="textarea" v-model="addModel.goodsDesc" autoHeight placeholder="请输入菜品简介">
						</uni-easyinput>
					</u-form-item>
					<!-- 分类 -->
					<u-form-item prop="categoryName" label="分类">
						<u-input @click="openSelect" placeholder="请选择分类" v-model="addModel.categoryName"></u-input>
						<u-select @confirm="selectConfirm" v-model="show" :list="selectList"></u-select>
					</u-form-item>
					<!-- 食材 -->
					<u-form-item prop="ingredName" label="食材" required>
						<u-input @click="openSelect1" placeholder="请选择分类" v-model="addModel.ingredName"></u-input>
					</u-form-item>

					<u-form-item prop="make" label-width="auto" label="步骤:" required>
						<uni-easyinput type="textarea" v-model="addModel.make" maxlength="-1"
							placeholder="请输入例:1.xxxx 2.xxx"></uni-easyinput>
					</u-form-item>
					<u-form-item prop="userName" label-width="auto" label="发布人:" required>
						<u-input placeholder="请输入您的姓名" v-model="addModel.userName" />
					</u-form-item>

				</view>

				<!-- 微信号，联系地址 -->
				<view v-show="isBtn == 1">
					<text
						style="display: flex; justify-content: flex-start; font-weight: 600; margin-bottom: 25rpx; letter-spacing: 4px;"
						@click="Previous()">{{text}}</text>
					<u-form-item prop="phone" label-width="auto" label="联系电话:" required>
						<u-input placeholder="请输入联系电话" v-model="addModel.phone" />
					</u-form-item>
					<u-form-item prop="image" label="封面:">
						<u-upload ref="imgRef" :action="action" :file-list="fileList" @on-remove='onRemove'
							max-count="1" @on-change="onChange"></u-upload>
					</u-form-item>
					<u-form-item prop="video" label="视频">
						<uni-file-picker v-model="fileValue" file-mediatype="video/*" limit="1" @select="onFileSelect"
							@progress="onProgress" @success="onSuccess" @fail="onFail" />
					</u-form-item>
				</view>
				<!-- <u-button :custom-style="customStyle" @click="commit">发布</u-button> -->
			</u-form>
		</view>
		<view class="box"></view>
		<button @click="commit" class="btn">{{btnText}}</button>

	</view>

	<u-popup v-model="show1" mode="bottom" border-radius="20" height="600rpx">
		<view class="fooding_box">
			<checkbox-group @change="checkboxChange">
				<checkbox style="margin: auto; width: 25%;padding: 20px  0px 0px 0px;"
					v-for="(item, index) in IngredList" :key="index" :value="[item.label,item.value]">
					{{ item.label }}
				</checkbox>
			</checkbox-group>
		</view>
	</u-popup>
</template>

<script setup>
	import {
		categoryApi,
		releaseApi,
		IgredcategoryApi,
		addIngred
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

	const text = ref('<上一步')

	// // 下一步
	const btnText = ref('下一步')
	const isBtn = ref(0)
	let addIngredlist = ref([])
	// 表单数据
	const addModel = reactive({
		userId: uni.getStorageSync('userId'),
		goodsName: '',
		categoryId: '',
		categoryName: '',
		ingredName: '',
		goodsDesc: '',
		userName: '',
		image: '',
		video: '',
		make: ''
	})
	const show1 = ref(false)
	//打开菜单分类

	const openSelect1 = () => {
		show1.value = true;
	}
	const show = ref(false)
	//打开菜单分类
	const openSelect = () => {
		show.value = true;
	}
	//分类数据
	const selectList = ref([])
	//读取后端分类数据
	const getSelectList = async () => {
		let res = await categoryApi()
		if (res && res.code == 200) {

			selectList.value = res.data;
			console.log(selectList)
		}
	}
	//选择分类
	const selectConfirm = (e) => {
		addModel.categoryName = e[0].label;
		addModel.categoryId = e[0].value;

	}
	const checkboxChange = (res) => {
		const list = res.detail.value
		// 将 list 转换为所需的对象
		const transformedList = list.map(item => {
			const [label, value] = item.split(",");
			return {
				value: parseInt(value),
				label: label
			};
		});
		// 提取所有的 label
		const labels = transformedList.map(item => item.label).join(',');
		addModel.ingredName = String(labels)
		// 提取所有的 label
		const value = transformedList.map(item => item.value);
		addIngredlist = value
		console.log("选中的食材id")
		console.log(addIngredlist)
		console.log(labels)
	}
	//食材数据
	const IngredList = ref([])
	//读取后端食材数据
	const getIngredList = async () => {
		let res = await IgredcategoryApi()
		if (res && res.code == 200) {
			IngredList.value = res.data
			console.log(IngredList.value)
		}
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
		const videoPath = event.tempFilePaths[0];
		console.log('选择的视频路径:', videoPath);
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
				complete: () => {}
			});
	};

	// 获取表单
	const form1 = ref()
	const imgRef = ref()

	// 表单验证规则
	const rules = reactive({
		goodsName: [{
			required: true,
			message: "请填写菜品名称",
			trigger: ['change', 'blur'],
		}, {
			min: 3,
			max: 10,
			message: '菜品名称长度必须在3到10个字符之间',
			trigger: ['change', 'blur']
		}],
		goodsDesc: [{
			required: true,
			message: "请填写简介",
			trigger: ['change', 'blur'],

		}, {
			min: 5,
			max: 200,
			message: '菜品名称长度必须在5到200个字符之间',
			trigger: ['change', 'blur']
		}],
		make: [{
			required: true,
			message: "请填写步骤",
			trigger: ['change', 'blur']
		}, {
			min: 5,
			max: 500,
			message: '菜品名称长度必须在5到70个字符之间',
			trigger: ['change', 'blur']
		}],
		userName: [{
			required: true,
			message: "请填写姓名",
			trigger: ['change', 'blur']
		}, {
			min: 2,
			max: 10,
			message: '菜品名称长度必须在2到8个字符之间',
			trigger: ['change', 'blur']
		}],

		phone: [{
			required: true,
			message: "请填写电话",
			trigger: ['change', 'blur']
		}, {
			pattern: /^(13[0-9]|14[57]|15[0-9]|16[6]|17[0-9]|18[0-9]|19[0-9])\d{8}$/,
			min: 11,
			max: 11,
			message: '请输入正确的手机号',
			trigger: ['change', 'blur']
		}],

	})

	// 返回上一步
	const Previous = () => {
		btnText.value = '下一步',
			isBtn.value = 0
	}

	const commit = () => {
		if (isBtn.value != 0) {
			console.log('点击了提交')
			commit1()
		} else {

			btnText.value = '提交',
				isBtn.value = 1
			console.log(isBtn.value)
			console.log('点击了下一步')
		}

		// console.log(addModel)

	}



	const commit1 = () => {

		form1.value.validate(async (valid) => {
			const list = addIngredlist;
			console.log("++++++++++")
			if (valid) {
				let res = await releaseApi(addModel);
				if (res && res.code == 200) {
					console.log('完整的响应对象:', res); // 打印完整的响应对象
					// 假设res.data是一个数组，并且我们关心第一个元素  
					const firstItem = res.data[0]; // 获取数组的第一个元素  
					if (firstItem && firstItem.goodsId) { // 确保元素存在且包含goodsId  
						const cooksId = firstItem.goodsId; // 提取goodsId  

						let ress = await addIngred({
							cooksId,
							list,
						})
						console.log(ress);
					} else {
						console.log('响应中未找到有效的goodsId');
					}
					console.log(addModel)
					uni.showToast({
						title: "发布成功"
					})
					
			
					// 假设你想在2秒后跳转到页面  
					setTimeout(function() {  
					    uni.switchTab({  
					        url: '../index/index'  
					    });  
					}, 1000); // 延迟时间为2000毫秒，即2秒

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
				});
			}
		});
	};

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
	.fooding_box {
		margin-top: 30px;
		margin-left: 30px;
		margin-right: 30px;
		display: flex;
		flex-direction: column;
	}

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