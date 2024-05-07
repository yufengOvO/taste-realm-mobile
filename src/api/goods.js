import http from "../common/http.js"
//发布商品分类
export const categorApi = (parm) =>{
	return http.get('/api/category/getSelectList',parm)
}