$(function() {
    var letao = new Letao();
    letao.slide();
    letao.kuanjia();
    letao.getCategory();
    letao.getBrand();
    letao.getBrandData(1);
})
var Letao = function() {};
Letao.prototype = {
    slide: function() {
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    kuanjia: function() {
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
    },
    getCategory: function() {
        $.ajax({
            url: '/category/queryTopCategory',
            success: function(data) {
                console.log(data);
                var html = template('cateTmp', data);
                $('.cate-left ul').html(html);
            }
        })
    },
    getBrand: function() {
        this.getBrandData(1);
        var that = this;
        $('.cate-left ul').on('click', 'li a', function() {
            var id = $(this).data('id');
            that.getBrandData(id);
            $(this).parent().addClass('active').siblings().removeClass('active');
        });
    },
    getBrandData: function(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            data: { 'id': id },
            success: function(data) {
                // console.log(data);
                var html = template('cateContent', data);
                $('.cate-right .mui-row').html(html);

            }

        })
    }
}
