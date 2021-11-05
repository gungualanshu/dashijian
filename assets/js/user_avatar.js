/*
 * @Author: your name
 * @Date: 2021-11-05 16:48:12
 * @LastEditTime: 2021-11-05 20:08:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \前后端交互\大事件\assets\js\user_avatar.js
 */
$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#btnload').on('click', function () {
        $('#file').click();
    })

    $('#file').on('change', function (e) {
        //  console.log(e);
        var fileList = e.target.files;
        if (fileList.length === 0) {
            return layer.msg('请选择图片');
        }

        var file = e.target.files[0];
        //  根据选择的文件，创建一个对应的URL地址
        var newImgURL = URL.createObjectURL(file);

        //  先“销毁”旧的图片 再重新设置新的路径 ，创建新的裁剪区
        $image.cropper('destroy').attr('src', newImgURL).cropper(options);
    })

    // 为确定按钮绑定点击事件
    $('#btnUpload').on('click', function (e) {
        e.preventDefault();
        // 要拿到用户裁剪之后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！');
                window.parent.getUserInfo();
            }
        })
    })
})