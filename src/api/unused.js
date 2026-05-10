import http from "../common/http.js"
// 分类
export const getCategoryApi = (parm) => {
	return http.get('/api/category/getSelectList',parm)

}
export const getCategoryListApi = (parm) => {
	return  http.get('/api/goods/getcooksCategory', parm)
}