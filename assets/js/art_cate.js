/*
 * @Author: your name
 * @Date: 2021-11-05 21:12:22
 * @LastEditTime: 2021-11-06 21:44:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \前后端交互\大事件\assets\js\art_cate.js
 */
$(function () {

    var layer = layui.layer;
    var form = layui.form;

    initArtCateList();

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }

    // 为添加类别按钮绑定点击事件
    // 获取弹层index
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        // 导入弹出层
        indexAdd = layer.open({
            type: 1,
            area: ['700px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 因为表单是在点击添加类别之后才出现的，所以要使用代理的方式添加事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加类别失败')
                }
                initArtCateList();
                layer.msg('添加类别成功');
                // 关闭弹出层
                layer.close(indexAdd);
            }
        })
    })

    // 编辑弹出层
    var indexEdit = null;
    $('body').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['700px', '300px'],
            title: '编辑文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id');
        // 发起请求 获取相应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data);
            }
        })
    })

    // 通过代理的形式，为修改分类的榜单绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败！')
                }
                layer.msg('更新分类信息成功！');
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    // 通过代理的方式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {

        var id = $(this).attr('data-id');
        // 询问用户是否要删除
        layer.confirm('确定删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除信息失败')
                    }
                    layer.msg('删除信息成功');
                    layer.close(index);
                    initArtCateList();
                }
        })
       
        })
    })
})