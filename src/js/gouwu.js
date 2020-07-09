

function show() {
    $.ajax({
        url: '../interface/showlist.php',
        type: 'post',
        // dataType:'jsonp',
        success: function (data) {
            console.log(data)
            var json = JSON.parse(data);

            var html = template('shoppingCat', { "json": json.data });

            $('.list-title-2').append(html);

            $('.add').on("click", function (data) {
                $('.num').html(Number($('.num').html()) + 1)
                $('.sum').html(Number($('.num').html())*Number($('.dj span').html()))
                $.get('../interface/updatewq.php', {
                    id: 1,
                    type: 'add',
                }, function (data) {
                    var json = JSON.parse(data);
                    // if(json.code==1){
                    //     alert('商品增加成功')
                    // }
                })

            })
            var num = 10
            $('.reduce').on('click', function (data) {
               $('.num').html(Number($('.num').html()) - 1)
                    $('.sum').html(Number($('.num').html())*Number($('.dj span').html()))
                if (num <= 0) {

                } else {
                    $.get('../interface/updatewq.php?id=1', { type: "reduce" }, function (data) {
                        var json = JSON.parse(data)

                    })
                }
            })
            $('.dele').click(function(){
                $.get('../interface/delwq.php',{
                    id:1
                },function(data){
                     var json =JSON.parse(data);
                     if(json.code==1){
                         alert('商品删除成功')
                     }
                })
            })


        }
    })
}

show()









