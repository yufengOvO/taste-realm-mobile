<template>
	<view class="u-wrap u-p-1-20 u-p-r-20">
		<u-form :model="addModel" ref="form1">
			<u-form-item prop="name" label="类型">
				<u-radio-group v-model="addModel.name">
					<u-radio activeColor="#00cc33" v-for="(item,index) in list" :key="index" :name="item.name"
						:disabled="item.disabled">{{item.name}}</u-radio>
				</u-radio-group>
			</u-form-item>
		</u-form>
		<u-form-item prop="goodsname" label="名称:">
			<u-input placeholder="请输入名称" v-model="addModel.goodsName" />
		</u-form-item>
		<!-- 分类 -->
		<u-form-item prop="ca" label="分类">
			<u-input @click="openSelect" placeholder="请选择分类" v-model="addModel.categoryName"></u-input>
			<u-select @confirm="selectConfirm" v-model="show" :list="selectList"></u-select>
		</u-form-item>
		<u-form-item prop="goodsDesc" label="简介:">
			<u-input placeholder="请输入简介" v-model="addModel.goodsDesc" />
		</u-form-item>
		<u-form-item prop="goodsPrice" label="价格:">
			<u-input placeholder="请输入价格" v-model="addModel.goodsPrice" />
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
		<u-form-item prop="addres" label-width="auto" label="联系地址:" >
			<u-input v-model="addModel.addres"></u-input>
		</u-form-item>
		<u-form-item prop="image" label="图片:">
			<u-upload :action="action" :file-list="fileList" @on-remove='onRemove' @on-change="onChange"></u-upload>
		</u-form-item>
		<u-button :custom-style="customStyle" @click="commit">发布</u-button>
	</view>

</template>

<script setup>
	import {categorApi} from '../../api/goods.js' 
	//导入生命周期函数
	import{ onReady } from '@dcloudio/uni-app'
	import {
		reactive,
		ref
	} from 'vue';
	// 表单数据
	const addModel = reactive({
		userId: uni.getSkylineInfoSync('userId'),
		name:'',
		type: '',
		categoryId:'',
		categoryName:'',
		goodsName:'',
		goodsName:'',
		goodsDesc:'',
		goodsPrice:'',
		userName:'',
		phone:'',
		wxNum:'',
		Image:'',
		addres:''
	})
	const show = ref(false)
	//打开菜单分类
	const openSelect = () =>{
		show.value = true;
	}
	//物品发布类型
	const list = [{
			name: '闲置',
			disabled: false
		},
		{
			name: '求购',
			disabled: false
		},
	]
	//图片上传
	const value = ref('')
	const action = ref('')
	const fileList = ref([])
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
	const getSelectList = async () =>{
		let res = await categorApi()
		if(res && res.code == 200){
			console.log(res)
			selectList.value = res.data;
		}
	}
	//生命周期
	onReady(()=>{
		getSelectList()
	})
	//选择分类
	const selectConfirm = (e) => {
		console.log(e)
		addModel.categoryName = e[0].label;
		addModel.categoryId  = e[0].value;
	}
</script>

<style lang="scss" scoped>

</style>
