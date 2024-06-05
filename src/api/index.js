import http from '../common/http.js'
// 推荐到首页商品查询

export const getIndexListApi = (parm) => {
	return http.get('/api/goods/getIndexList', parm)
}
// 轮播图
export const getSwiperListApi = (parm) => {
	return http.get('/api/swiper/getSwiperList', parm)
}