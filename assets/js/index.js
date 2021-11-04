/*
 * @Author: your name
 * @Date: 2021-11-04 10:11:23
 * @LastEditTime: 2021-11-04 17:03:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前后端交互\大事件\assets\js\index.js
 */
$(function () {

    // 调用getUserInfo获取用户信息
    getUserInfo();


    var layer = layui.layer
    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('是否退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地存储中的token
            localStorage.removeItem('token');
            // 重新跳转回登录首页
            location.href = './login.html';
            layer.close(index);
        });
    })
})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }

            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        },

        // 请求成功会调用success函数 失败会调用error函数 不论成功与否都会调用complete函数
        // complete: function (res) {
        //     //console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token');
        //         // 强制跳转到登录页面
        //         location.href = './login.html';
        //     }
        // }
    })
}

function renderAvatar(data) {
    // 获取用户名称
    var name = data.nickname || data.username;

    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;' + name);

    // 按需渲染用户头像
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}