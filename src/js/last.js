console.log(111)
console.log($(".swiper-wrapper button"));
$('.swiper-wrapper #first').on('click',function(){
    console.log(111)
    
    $('swiper-wrapper ul ').stop().animate({
        top:$(this).index()*73

    })
})