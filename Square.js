
(function(window){
    var canvas = document.getElementById("myCanvas") ;
    var ctx = canvas.getContext("2d") ;
    ctx.strokeStyle = "#ffffff" ;
    var Square = function(index_x, index_y, position_x, position_y, colorstr, colorId) {
        this.x = index_x ;
        this.y = index_y ;
        this.px = position_x ;
        this.py = position_y ;
        this.color = colorstr ;
        this.colorId = colorId ;
        this.focused = false ;
        this.removed = false ;
    };
    Square.prototype.radius = 8 ;
    Square.prototype.width = 50 ;
    Square.prototype.height = 50 ;
    Square.prototype.getX = function(){
        return this.px;
    };
    Square.prototype.getY = function(){
        return this.py;
    };
    Square.prototype.getRight = function(){
        return (this.px + this.width);
    };
    Square.prototype.getBottom = function(){
        return (this.py + this.height);
    };
    Square.prototype.draw = function (context) {
        context.beginPath();
        context.moveTo( this.getX()+this.radius,this.getY() );
        context.lineTo( this.getRight()-this.radius,this.getY() );
        context.arc( this.getRight()-this.radius,this.getY()+this.radius, this.radius, 3*Math.PI/2,2*Math.PI, false);
        context.lineTo( this.getRight(),this.getBottom()-this.radius);
        context.arc( this.getRight()-this.radius,this.getBottom()-this.radius, this.radius, 0, Math.PI/2, false);
        context.lineTo( this.getX()+this.radius,this.getBottom() );
        context.arc( this.getX()+this.radius,this.getBottom()-this.radius, this.radius, Math.PI/2, Math.PI, false);
        context.lineTo( this.getX(),this.getY()+this.radius);
        context.arc( this.getX()+this.radius,this.getY()+this.radius, this.radius,Math.PI, 3*Math.PI/2, false);
        context.closePath();
        var radialGradient = context.createRadialGradient(this.getX()+15, this.getY()+15, 0.5, this.getX()+25, this.getY()+25, 33) ;
        radialGradient.addColorStop(0, "#dddddd") ;
        radialGradient.addColorStop(1, this.color) ;
        context.fillStyle = radialGradient ;
        context.fill() ;
    };
    Square.prototype.focusByStroke = function(context) {
        context.beginPath();
        context.moveTo( this.getX()+this.radius, this.getY() );
        context.lineTo( this.getRight()-this.radius, this.getY() );
        context.arc( this.getRight()-this.radius, this.getY()+this.radius, this.radius, 3*Math.PI/2,2*Math.PI, false);
        context.lineTo( this.getRight(), this.getBottom()-this.radius);
        context.arc( this.getRight()-this.radius, this.getBottom()-this.radius, this.radius, 0, Math.PI/2, false);
        context.lineTo( this.getX()+this.radius, this.getBottom() );
        context.arc( this.getX()+this.radius, this.getBottom()-this.radius, this.radius, Math.PI/2, Math.PI, false);
        context.lineTo( this.getX(), this.getY()+this.radius);
        context.arc( this.getX()+this.radius, this.getY()+this.radius, this.radius,Math.PI, 3*Math.PI/2, false);
        context.closePath();
        context.stroke() ;
    };
    window.Square = Square ;
})(window)