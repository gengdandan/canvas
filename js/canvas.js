//菜单选项
$(".menu li").click(function(){
    var index=$(this).index(".menu li")
    //alert(index)
    $(".option").css("display","none").eq(index).css("display","block")
    $(".menu li").removeClass("active")//导航的字体颜色随着点击而变化
    $(this).addClass("active")
})
$(".option li").click(function(){//左边的字体颜色随着变化
    $(".option li ").css("color","#000").css("text-shadow","none")
    $(this).css("color","red").css("text-shadow","0 0 1px red")
})

//画图功能
var canvas=$("canvas")[0]
var copy=$(".copy")[0]
var xp=$(".xp")[0]
var cobj=canvas.getContext("2d");
var obj=new shape(copy,cobj,xp)

//点击下标为1的画图，出现工具
$(".box .body .left .option:eq(1) li").click(function(){
    var type=$(this).attr("data-role")
        obj.type=type
        obj.draw()
    if(type=="qianbi"){
        obj.qianbi()
    }
    if(type=="bian"){
        obj.biannum=prompt("请输入边数","5")
        obj.type=type
        obj.draw()
    }
    if(type=="jiao"){
        obj.biannum=prompt("请输入角数","5")
        obj.type=type
        obj.draw()
    }
})

$(".box .body .left .option:eq(2) li").click(function(){
    var style=$(this).attr("data-role")
    obj.style=style
    obj.draw()
})
$(".stroke").change(function(){
    obj.strokeStyle=$(this).val()
})
$(".fill").change(function(){
    obj.fillStyle=$(this).val()
})

$(".box .body .left .option:eq(4) li").click(function(){
    obj.lineWidth=$(this).attr("data-role")
    obj.draw()
})

$(".box .body .left .option:eq(4) li input").change(function(){
    obj.lineWidth=$(this).val()
    obj.draw()
})
$(".box .menu li:last").click(function(){
    obj.clear()
})
$(".box .body .left .option:eq(5) li input").change(function(){
    obj.xpsize=$(this).val()
    obj.clear()
})


//返回
$(".box .body .left .option:eq(0) li:eq(1)").click(function(){
    obj.back()
})
//保存
$(".save").click(function(){
    if(obj.history.length>0){
        location.href=canvas.toDataURL().replace("image/png","stream/octet")
    }
})
//新建
$(".new").click(function(){
    if(obj.history.length>0){
      var yes=confirm("是否保存")
        if(yes){
            location.href=canvas.toDataURL().replace("image/png","stream/octet")
        }
        obj.clearRect(0,0,canvas.width,canvas.height)
        obj.history=[]
    }
})