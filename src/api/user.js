import  http from "../common/http.js"

//注册
export const registerApi = (parm)=>{
	return http.post('/api/wxUser/register',parm)
}
//登录
export const loginApi = (parm) =>{
	return http.post('/api/wxUser/login',parm)
}

//修改密码
export const wxupdatePasswordApi = (parm)=>{
	return http.post('/api/wxUser/wxupdatePassword',parm)
}
// 查询用户发布的菜品
export const userWriteListApi = (parm) =>{
	return http.post('/api/goods/getcooksWiter',parm)
}
// 用户删除发布的菜品
export const wxupdateDeleteApi = (parm)=>{
	return http.post('/api/goods/delete',parm)
}