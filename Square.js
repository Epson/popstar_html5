
(function(window){
    var canvas = document.getElementById("myCanvas") ;
    var ctx = canvas.getContext("2d") ;
    ctx.strokeStyle = "#ffffff" ;
    var Square = function(index_x, index_y, position_x, position_y, colorId) {
        this.x = index_x ;
        this.y = index_y ;
        this.px = position_x ;
        this.py = position_y ;
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
        context.drawImage(Global.colorImage[this.colorId], this.px, this.py) ;
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