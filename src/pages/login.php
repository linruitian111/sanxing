<?php
//防止乱码

 header('content-type:text/html;charset=utf-8;');

 //定义变量
 $name = $_POST['username'];
 $pw  =$_POST['password'];


 //连接数据库
 $link = mysqli_connect('localhost','root','root','music');


//查询单行数据

$res ="SELECT * FROM `user` WHERE `username`='$name' AND `password`='$pw' ";

$sql = mysqli_query($link,$res);

$arr = mysqli_fetch_assoc($sql);

if($arr){
   header('location:./gouwu.html');
}else{
    header('location:./regisiter.html');
}


?>