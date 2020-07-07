// const { listenerCount } = require("gulp")

$('.tabs-title li').on('click',function(){
    // console.log($(this))
    $(".tabs-img").stop().animate({
        left:-$(this).index()*743
    })
})


$('.feature-title1 li').on('click',function(){
    // console.log($(this))
    $('.feature-2-1').stop().animate({
        left:-$(this).index()*1400,
        
    })
    // if($(this).index()>2){
    //     $('.feature-title"').html('active')
    //  }
})

// $('.tab').on('mouseenter',function(){
   
// })
