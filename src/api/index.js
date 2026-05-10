import http from '../common/http.js'
// 推荐到首页商品查询

export const getIndexListApi = (parm) => {
	return http.get('/api/goods/getIndexList', parm)
}
// 轮播图
export const getSwiperListApi = (parm) => {
	return http.get('/api/swiper/getSwiperList', parm)
}
//根据食材查询菜单
export const getCooksByingredApi = (parm) => {
	return http.post('/api/goods/getByingred',parm)
}
//查询食材
export const getIngredListApi = (parm) => {
	return http.get('/api/ingredients/getSelectList',parm)
}