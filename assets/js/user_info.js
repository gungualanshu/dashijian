/*
 * @Author: your name
 * @Date: 2021-11-04 19:49:15
 * @LastEditTime: 2021-11-05 11:04:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前后端交互\大事件\assets\js\user_info.js
 */
$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称的长度必须在1~6之间'
            }
        }
    })


    initUserInfo();
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);

                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data);

            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault();

        initUserInfo();
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户失败！')
                }
                layer.msg('更新用户成功！');

                // 调用父页面中的方法，重新渲染用户的头像和用户的信息\
                // 这里的window是指表单所在的区域 index是window.parent  调用里面的函数
                window.parent.getUserInfo();
            }
        })
    })
})


