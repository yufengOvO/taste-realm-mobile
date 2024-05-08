import http from "../common/http.js"
//发布商品分类
export const categorApi = (parm) =>{
	return http.get('/api/category/getSelectList',parm)
}

// 发布页面发布商品
export const releaseApi = (parm) => {
	return http.post('api/goods/release',parm)
}