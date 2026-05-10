import http from "../common/http.js"

//查询收藏
export const userCollectionListApi = (parm) =>{
	return http.post('/api/userCollection/list',parm)
}


export const collectApi = (parm) =>{
	return http.post('/api/userCollection/collect',parm)
}
export const hasCollect = (parm) =>{
	return http.get('/api/userCollection/hasCollect',parm)
}