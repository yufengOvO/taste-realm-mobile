<template>
	<view class="u-wrap u-p-1-20 u-p-r-20">
		<u-form :model="addModel" ref="form1">
			<u-form-item prop="name" label="类型">
				<u-radio-group v-model="addModel.name">
					<u-radio activeColor="#00cc33" v-for="(item,index) in list" :key="index" :name="item.name"
						:disabled="item.disabled">{{item.name}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item prop="goodsName" label="名称:">
				<u-input placeholder="请输入名称" v-model="addModel.goodsName" />
			</u-form-item>
			<!-- 分类 -->
			<u-form-item prop="categoryName" label="分类">
				<u-input @click="openSelect" placeholder="请选择分类" v-model="addModel.categoryName"></u-input>
				<u-select @confirm="selectConfirm" v-model="show" :list="selectList"></u-select>
			</u-form-item>
			<u-form-item prop="goodsDesc" label="简介:">
				<u-input placeholder="请输入简介" v-model="addModel.goodsDesc" />
			</u-form-item>
			<u-form-item prop="goodsPrice" label="价格:">
				<u-input placeholder="    请输入价格" v-model="addModel.goodsPrice" />
			</u-form-item>
			<u-form-item prop="userName" label-width="auto" label="联系人:">
				<u-input placeholder="请输入联系人" v-model="addModel.userName" />
			</u-form-item>
			<u-form-item prop="phone" label-width="auto" label="联系电话:">
				<u-input placeholder="请输入联系电话" v-model="addModel.phone" />
			</u-form-item>
			<!-- 微信号，联系地址 -->
			<u-form-item prop="wxNum" label-width="auto" label="微信号:">
				<u-input placeholder="请输入微信号" v-model="addModel.wxNum"></u-input>
			</u-form-item>
			<u-form-item prop="address" label-width="auto" label="联系地址:">
				<u-input v-model="addModel.address"></u-input>
			</u-form-item>
			<u-form-item prop="image" label="图片:">
				<u-upload ref="imgRef" :action="action" :file-list="fileList" @on-remove='onRemove'
					@on-change="onChange"></u-upload>
			</u-form-item>
		</u-form>
		<u-button :custom-style="customStyle" @click="commit">发布</u-button>
	</view>

</template>

<script setup>
	import {
		categoryApi,
		releaseApi
	} from '../../api/goods.js'
	//导入生命周期函数
	import {
		onReady
	} from '@dcloudio/uni-app'
	import {
		reactive,
		ref
	} from 'vue';
	import http from '../../common/http.js'



	// 表单数据
	const addModel = reactive({
		userId: uni.getStorageSync('userId'),
		name: '',
		type: '',
		goodsName: '',
		categoryId: '',
		categoryName: '',
		goodsDesc: '',
		goodsPrice: '',
		userName: '',
		phone: '',
		wxNum: '',
		image: '',
		address: ''
	})
	const show = ref(false)
	//打开菜单分类
	const openSelect = () => {
		show.value = true;
	}
	//物品发布类型
	const list = [{
			value: "0",
			name: '闲置',
			disabled: false
		},
		{
			value: "1",
			name: '求购',
			disabled: false
		},
	]

	// 发布按钮
	const customStyle = reactive({
		background: '#00cc33',
		color: '#FFF',
		marginTop: '15px',
		width: '100%',

	})
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
	//生命周期
	onReady(() => {
		getSelectList()
	})
	//选择分类
	const selectConfirm = (e) => {
		console.log(e)
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

	// 闲置求购类型选择
	const radioChange = (e) => {
		for (let i = 0; i < list.length; i++) {
			if (list[i].name == e) {
				addModel.type = list[i].value;
			}
		}
	}

	// 获取表单
	const form1 = ref()
	const imgRef = ref()

	// 表单验证规则
	const rules = reactive({
		name: [{
			required: true,
			message: "请选择类型",
			trigger: ['change', 'blur']
		}],
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
		goodsPrice: [{
			required: true,
			message: "请填写价格",
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
		wxNum: [{
			required: true,
			message: "请填写微信号",
			trigger: ['change', 'blur']
		}],
		addres: [{
			required: true,
			message: "请填写发布/求购地址",
			trigger: ['change', 'blur']
		}]
	})

	// 提交表单
	const commit = () => {
		// console.log(addModel)
		form1.value.validate(async (valid) => {
			let res = await releaseApi(addModel)
			if (res && res.code == 200) {
				uni.showToast({
					title: '商品发布成功',
					duration: 2000
				})
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
		})
	}

	// 生命周期函数
	onReady(() => {
		// 设置表单验证规则
		form1.value.setRules(rules);
		getSelectList()
	})
</script>

<style lang="scss" scoped>

</style>