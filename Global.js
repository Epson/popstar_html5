
(function(window){
    var GlobalInitial = function() {
        var Global = {} ;

        Global.divForTempScore = document.getElementById("tempScore") ;
        Global.divForScore = document.getElementById("score") ;
        Global.divForTarget = document.getElementById("target") ;
        Global.divForBonus = document.getElementById("bonus") ;
        Global.color = ["#ff4500","#4169e1","#ffd700","#32cd32","#9400d3"] ;
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

        window.Global = Global ;
    };
    document.body.onload = GlobalInitial() ;
})(window)