/**
 * Created by Administrator on 2016/8/31.
 */
function shape (copy,cobj,xp){
    this.copy=copy;
    this.cobj=cobj;
    this.style="stroke";
    this.type="";
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.history=[];
    this.lineWidth=1;
    this.canvasw=copy.offsetWidth
    this.canvash=copy.offsetHeight
    this.biannum=5;
    this.jiaonum=5;
    this.xpsize=10;
    this.xp=xp;
    this.flag=true;
}
shape.prototype={
    init:function(){
        this.cobj.fillStyle=this.fillStyle//填充色
        this.cobj.strokeStyle=this.strokeStyle
        this.cobj.lineWidth=this.lineWidth
        this.xp.style.display="none"
    },
    draw:function(){
        var that=this
        that.init()
        this.flag=true
        that.copy.onmousedown=function(e){
            this.flag=true
            that.init()
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                this.flag=true
                var movex= e.offsetX;
                var movey= e.offsetY;
                that.cobj.clearRect(0,0,that.canvasw,that.canvash)
                if(that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0)
                }
                that[that.type](startx,starty,movex,movey);
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasw,that.canvash));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null
            }
        }
    },
    qianbi:function(){
        var that=this
        that.init()
        this.flag=true
        that.copy.onmousedown=function(e){
            that.init()
            that.flag=true
            var ox= e.offsetX;
            var oy= e.offsetY;
            that.cobj.beginPath()
            that.cobj.moveTo(ox,oy);
            that.copy.onmousemove=function(e){
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke()
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasw,that.canvash));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.beginPath()
        this.cobj.moveTo(x,y)
        this.cobj.lineTo(x1,y1)//移动的路径
        this.cobj.stroke()//绘制图形命令
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath()
        this.cobj.rect(x,y,x1-x,y1-y)
        this.cobj[this.style]()
    },
    arc:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))
        this.cobj.beginPath()
        this.cobj.arc(x,y,r,0,2*Math.PI)
        this.cobj[this.style]()
    },
    bian:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var a=360/this.biannum*Math.PI/180
        this.cobj.beginPath()
        for(var i=0;i<this.biannum;i++){
            this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i))
        }
        this.cobj.closePath();
        this.cobj[this.style]()
    },
    jiao:function(x,y,x1,y1){
        var a=360/(this.jiaonum*2)*Math.PI/180
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))
        var r1=r/3
        this.cobj.beginPath()
        for(var i=0;i<this.jiaonum*2;i++){
            if(i%2==0){
             this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i))
            }else {
            this.cobj.lineTo(x+r1*Math.cos(a*i),y+r1*Math.sin(a*i))
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]()
    },
    clear:function(){
        var that=this
        that.copy.onmousemove=function(e){
            var movex= e.offsetX
            var movey= e.offsetY
            var left=movex-that.xpsize/2;
            var top=movey-that.xpsize/2;
            if(left<0){
                left=0
            }
            if(left>that.canvasw-that.xpsize){
                left=that.canvasw-that.xpsize
            }
            if(top<0){
                top=0
            }
            if(top>that.canvash-that.xpsize){
                top=that.canvash-that.xpsize
            }
            that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px"
        }
        that.copy.onmousedown=function(){
            that.copy.onmousemove=function(e){
                var movex= e.offsetX
                var movey= e.offsetY
                var left=movex-that.xpsize/2;
                var top=movey-that.xpsize/2;
                if(left<0){
                    left=0
                }
                if(left<0){
                    left=0
                }
                if(left>that.canvasw-that.xpsize){
                    left=that.canvasw-that.xpsize
                }
                if(top<0){
                    top=0
                }
                if(top>that.canvash-that.xpsize){
                    top=that.canvash-that.xpsize
                }
                that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px"
                that.cobj.clearRect(left,top,that.xpsize,that.xpsize)
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasw,that.canvash))
                that.copy.onmousemove=null
                that.copy.onmouseup=null
                that.clear()
            }
        }
    },
    back:function(){
        if(this.history.length==0){
            this.cobj.clearRect(0,0,this.canvasw,this.canvash)
            setTimeout(function(){
                alert("不能返回")
            },10)

            //return;
        }
        if(this.flag){
            if(this.history.length==1){
                this.history.pop()
                this.cobj.clearRect(0,0,this.canvasw,this.canvash)
            }else{
                this.history.pop()
                this.cobj.putImageData(this.history.pop(),0,0)
            }
        }else{
            this.cobj.putImageData(this.history.pop(),0,0)
        }
        this.flag=false
    }
}