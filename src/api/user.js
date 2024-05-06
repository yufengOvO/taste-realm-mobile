import  http from "../common/http.js"

//注册
export const registerApi = (parm)=>{
	return http.post('/api/wxUser/register',parm)
}