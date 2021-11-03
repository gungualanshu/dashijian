/*
 * @Author: your name
 * @Date: 2021-11-02 21:20:39
 * @LastEditTime: 2021-11-03 16:10:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前后端交互\大事件\assets\js\login.js
 */
$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 从layui中获取form元素
    var form = layui.form;
    // 从layui中获取layer元素
    var layer = layui.layer;

    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义一个pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须是六到十二位，且不能为空格'],

        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败就return一个提示消息
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次输出的密码不一致';
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交事件
        e.preventDefault();
        // 发起Ajax的POST请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post('/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');
                $('#link_login').click();
            })
    })

    // 监听登录的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');

                // 将登陆成功获取到的token字符串，保存到localStrage
                // 获得的这个token字符串很重要 只有有这个才能访问那些有权限的接口
                localStorage.setItem('token', res.token);

                // 跳转到后台主页
                location.href = '/index.html';
            }
        })
    })
})





