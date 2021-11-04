/*
 * @Author: your name
 * @Date: 2021-11-03 16:00:21
 * @LastEditTime: 2021-11-04 17:02:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前后端交互\大事件\assets\js\baseAPI.js
 */


//  注意：每次调用$.get() $.post() $.ajax() 时都需要
// 先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的Ajax请求之前 统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    options.complete = function (res) {
        //console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = './login.html';
        }
    }
})
