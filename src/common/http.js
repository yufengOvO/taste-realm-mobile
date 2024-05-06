// 后端根路径
const baseUrl = 'http://localhost:8089';

const http = (options = {}) => {
    return new Promise((resolve, reject) => {
        // 封装请求基本信息 
        uni.request({
            url: baseUrl + (options.url || ''),
            method: options.type || 'GET',
            data: options.data || {},
            header: options.header || {},
        }).then((response) => {
            // 封装响应基本信息 
            if (response.data && response.data.code == 200) {
                resolve(response.data);
            } else {
                // console.log('') 
                uni.showToast({ icon: 'none', title: response.data.msg, duration: 2000 });
            }
        }).catch(error => {
            reject(error);
        });
    });
};

// 封装get请求方法 
const get = (url, data, options = {}) => {
    options.type = 'GET';
    options.data = data;
    options.url = url;
    return http(options);
};

// 封装post请求 
const post = (url, data, options = {}) => {
    options.type = 'POST';
    options.data = data;
    options.url = url;
    return http(options);
};

// 封装修改请求 
const put = (url, data, options = {}) => {
    options.type = 'PUT';
    options.data = data;
    options.url = url;
    return http(options);
};

// 上传文件 
const upload = (parm) => {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: baseUrl + parm.url,
            filePath: parm.filePath,
            name: 'file',
            formData: {
                openid: uni.getStorageSync('openid')
            },
            header: {
                // Authorization: uni.getStorageSync("token")
            },
            success: (res) => {
                resolve(res.data);
            },
            fail: (error) => {
                reject(error);
            }
        });
    });
};

// 基本参数 
export default {
    get,
    post,
    put,
    upload,
    baseUrl
};
