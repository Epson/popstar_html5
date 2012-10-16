
(function(window){
    var GlobalInitial = function() {
        var Global = {} ;

        Global.divForTempScore = document.getElementById("tempScore") ;
        Global.divForScore = document.getElementById("score") ;
        Global.divForTarget = document.getElementById("target") ;
        Global.divForBonus = document.getElementById("bonus") ;
        Global.colorImage = [] ;
        Global.game = document.getElementById("game") ;
        Global.canvas = document.getElementById("myCanvas") ;
        Global.levelScore = [0,1000,3000,5000,7000,9000,12000,15000,18000,21000] ;
        Global.level = 1 ;
        Global.focused = [] ;
        Global.score = 0 ;
        Global.numOfElemPerCol = [] ;
        Global.cols = [] ;
        Global.divs = [] ;
        Global.gameLeft = 0 ;
        Global.gameTop = 0 ;
        Global.gameWidth = 0 ;
        Global.gameHeight = 0 ;
        Global.map = [] ;
        Global.timer = null ;
        Global.brushColor = null ;
        Global.toolType = null ;
        Global.MouseClick = null ;

        Global.colorImage[0] = new Image()  ;
        Global.colorImage[1] = new Image()  ;
        Global.colorImage[2] = new Image()  ;
        Global.colorImage[3] = new Image()  ;
        Global.colorImage[4] = new Image()  ;

        Global.colorImage[0].src = "images/0.png" ;
        Global.colorImage[1].src = "images/1.png" ;
        Global.colorImage[2].src = "images/2.png" ;
        Global.colorImage[3].src = "images/3.png" ;
        Global.colorImage[4].src = "images/4.png" ;

        Global.colorImage[4].onload = function() {

            var head = document.getElementsByTagName("head")[0] ;
            var SquareJs = document.createElement("script") ;
            SquareJs.src = "Square.js" ;
            head.appendChild(SquareJs) ;
            var ControllerJs = document.createElement("script") ;
            ControllerJs.src = "Controller.js" ;
            head.appendChild(ControllerJs) ;
            var mainJs = document.createElement("script") ;
            mainJs.src = "main.js" ;
            head.appendChild(mainJs) ;
        }

        window.Global = Global ;
    };
    document.body.onload = GlobalInitial() ;
})(window)