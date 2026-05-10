import http from "../common/http.js"
//获取发布菜品系类分类
export const categoryApi = (parm) => {
	return http.get('/api/category/getSelectList', parm)
}
//获取发布菜品食材分类
export const IgredcategoryApi = (parm) => {
	return http.get('/api/ingredients/getSelectList', parm)
}
// 发布页面发布菜品
export const releaseApi = (parm) => {
	return http.post('/api/goods/release', parm)
}
//将食材Id和菜品Id传入Api
export const addIngred = (parm) => {
	return http.post('/api/goods/addIngred', parm)
}