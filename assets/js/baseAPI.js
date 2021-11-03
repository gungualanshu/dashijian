/*
 * @Author: your name
 * @Date: 2021-11-03 16:00:21
 * @LastEditTime: 2021-11-03 16:09:34
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
})
