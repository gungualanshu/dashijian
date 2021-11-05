/*
 * @Author: your name
 * @Date: 2021-11-05 11:14:00
 * @LastEditTime: 2021-11-05 15:28:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \前后端交互\大事件\assets\js\user_pwd.js
 */
$(function () {
    var form = layui.form;

    form.verify({
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'],

        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入密码不相同'
            }
        }
    })

    $('.layui-form').on('submit', function () {
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('上传密码失败')
                }
                layui.layer.msg('上传密码成功')
                // 重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})