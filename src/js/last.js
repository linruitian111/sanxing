// console.log(111)
// console.log($(".swiper-wrapper button"));
// $('.swiper-wrapper #first').on('click',function(){
//     console.log(111)
    
//     $('swiper-wrapper ul ').stop().animate({
//         top:$(this).index()*73

//     })
// })

/*
1 在详情页加入购物车功能
   需要获取页面的商品：id = 10000 ，img="" price name



*/
 $('.footer-title').click(function(){
     $.get('../interface/addwq.php',{
         id:'1',
         img:"../images/25.jpg",
         price:13999,
         name:"Samsung Galaxy Z Flip"
     },function(data){
         var json = JSON.parse(data);
         console.log(data);
         if(json.code==1){
             alert('添加商品成功')
         }
     })
 })

