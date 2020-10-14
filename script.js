window.onload = function(){
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blocksize = 30;
    var delay = 100;
    var ctx ;
    var xcoord=0;
    var ycoord=0;
    var snakee;
    init()
       
    function init(){
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");
        snakee= new snake([[6,4],[5,4],[4,4],],"left");
       /* snakee= new snake([[10,4],[9,4]]);*/
        refreshCanvas();
    }
    function refreshCanvas()
    { 
    
        ctx.fillStyle= "#ff0000";
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        snakee.advance();
        /*ctx.fillRect(xcoord , ycoord , 100 , 50);*/
        snakee.draw();
        setTimeout(refreshCanvas,delay);
    }
    function drawBlock(ctx,postion)
    { 
        var x = postion[0] * blocksize;
        var y = postion[1] * blocksize;
        ctx.fillRect(x,y,blocksize,blocksize);
    }
    function snake(body,direction)
    {
        this.body= body;
        this.direction= direction;
        this.draw=function()
        {
            ctx.save();
            ctx.fillStyle= "#ff0000";
            for(var i=0; i<this.body.length;i++)
                {
                    drawBlock(ctx,this.body[i])
                }
            ctx.restore();
        };
    
    this.advance=function()
    {
     var nextpostion= this.body[0].slice();
        switch(this.direction)
            {
                    case "left":
                    nextpostion[0]-=1;
                    break;
					case "right":
                    nextpostion[0]+=1;
                    break;
                    case "down":
                    nextpostion[1]+=1;
                    break;
                    case "up":
                    nextpostion[1]-=1;
                    break;
                    default:
                    throw("invalid direction");
                    
                    
            }
		
            
        /*nextpostion[0] +=1;*/
        this.body.unshift(nextpostion); //copy coord ele
        this.body.pop();//delete last ele 
		}
	
        this.setdirection=function(newdirection)
        {
            var allowedDirection;
            switch(this.direction)
                {
                    case "left":
                    case "right":
                    allowedDirection = ["up","down"];
                    break;
                    case "down":
                    case "up":
                    allowedDirection = ["left","right"];
					break;
                    default:
                        throw("invalid direction");
                    
                }
            if (allowedDirection.indexOf(newdirection)>-1)
                {
                    this.direction= newdirection;
                }
		}
       
        
    
        

    document.onkeydown=function handlekeyDown(e)
            {
                    var key = e.keyCode;
                    var newdirection;
                    switch(key)
                        {
                        case 37:
                        newdirection= "left";
                        break;
                        case 38:
                        newdirection= "up";
                        break;
                        case 39:
                        newdirection= "right";
                        break;
                        case 40:
                        newdirection= "down";
                        break;
                            default:
                        return;
         
						}
	
	snakee.setdirection(newdirection);
	
	}
	
	}
		
           
 
      
 
	
}