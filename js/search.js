$(function() {
    var letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.removeHistory();
    letao.clearHistory();

})
var Letao = function() {};
Letao.prototype = {
    addHistory: function() {
        var that = this;
        $('#search1 .btn-search').on('tap', function() {
            var search = $('.input-search').val();
            $('.input-search').val('');
            if (!search) {
                alert('请输入商品');
                return;
            }
            var searchObj = {
                id: 1,
                search: search
            }
            var historyList = JSON.parse(localStorage.getItem('historyList')) || [];
            if (historyList.length > 0) {
                searchObj.id = historyList[historyList.length - 1].id + 1;
            }
            historyList.push(searchObj);
            localStorage.setItem('historyList', JSON.stringify(historyList));
            that.queryHistory();
        });
    },
    queryHistory: function() {
        var historyList = JSON.parse(localStorage.getItem('historyList')) || [];
        historyList = historyList.reverse();
        var html = template('historyTmp', { 'rows': historyList });
        $('#record .bt-content').html(html);
    },
    removeHistory: function() {
        var that = this;
        $('#record .bt-content').on('tap', '.btn-delete', function() {
            console.log('5555555555555555555');
            var id = $(this).data('id');
            console.log(id);
            var historyList = JSON.parse(localStorage.getItem('historyList')) || [];
            for (var i = 0; i < historyList.length; i++) {
                if (historyList[i].id == id) {
                    historyList.splice(i, 1);
                }
            }
            localStorage.setItem('historyList', JSON.stringify(historyList));
            that.queryHistory();
        })

    },
    clearHistory: function() {
        var that = this;
        $('#display1 .icon_clear').on('tap', function() {
            console.log('66666666');
            localStorage.removeItem('historyList');
            that.queryHistory();
        })

    }
}
