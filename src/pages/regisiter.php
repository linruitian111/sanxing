<?php
//防止乱码
header('content-type:text/html;charset=utf-8;');
$responseData = array("code"=>0,"message"=>"");

//随机定义变量
$name = $_POST['username'];
$pw = $_POST['password'];

if(!$name){
    $responseData["code"] =1;
    $responseData["message"] ="用户名不能为空";
    echo json_encode($responseData);
    exit;
}
if(!$pw){
    $responseData["code"] =2;
    $responseData["message"] ="密码不能为空";
    echo json_encode($responseData);
    exit;
}
//连接数据库
 
$link = mysqli_connect('localhost','root','root','music');
$arr = "SELECT * FROM `user` WHERE `username`='$name'";
// echo $arr;
$res1 = mysqli_query($link,$arr);
$res2 = mysqli_fetch_assoc($res1);

if(!$res2==null){
    $responseData["code"] =3;
    $responseData["message"] ="用户名重复";
    echo json_encode($responseData);
    exit;
}
    




$res = "INSERT INTO `user`(`username`,`password`) VALUES('$name','$pw')";

//执行
$sql2 = mysqli_query($link,$res);

 // 给条件

 if(!$sql2){
    $responseData["code"] =4;
    $responseData["message"] ="注册失败";
    echo json_encode($responseData);
    
 }else{
    $responseData["message"] ="注册成功";
    echo json_encode($responseData);
 }
  mysqli_close($link);
?>