console.log($('.btn'))
$('.btn').on('click',function(){
    console.log($('.username'))
    $.ajax({
        url:'http://localhost/pages/regisiter.php',
        type:'post',
        data:{username:$('.username').val(),password:$('.password').val(),bool:0},
         success:function(data){
             
             var obj= JSON.parse(data)
             
             alert(obj.message)
             
         }
    })
})

