
(function(window){
    if( !window.localStorage )
    {
        alert("This browser does NOT support localStorage, you can choose the Chrome browser to get better experience.") ;
        return ;
    }
    var canvas = Global.canvas ;
    var ctx = canvas.getContext("2d") ;
    var controller = new Controller() ;

    controller.setView() ;
    controller.init() ;
    controller.initTools() ;
    function MouseClick(ev) {
        ev = ev || window.event ;
        //console.log("mouse click") ;
        var getMousePosition = function(ev){
            if(ev.pageX || ev.pageY){
                return {x:ev.pageX, y:ev.pageY};
            }

            return {
                x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y:ev.clientY + document.body.scrollTop  - document.body.clientTop
            };
        };
        var mousePos = getMousePosition(ev) ;
        var Global = window.Global ;
        //若鼠标在游戏区域内点击，则获取点击的方块索引值
        if( Global.gameLeft <= mousePos.x && mousePos.x <= Global.gameLeft + 518 && Global.gameTop + 20 <= mousePos.y && mousePos.y <= Global.gameTop + 518 + 20 ) {
            var y = Math.floor( ( mousePos.x - Global.gameLeft ) / 52 ) ;
            var x = Math.floor( ( mousePos.y - Global.gameTop - 20 ) / 52 ) ;

            if( Global.toolType === null ) {
                if( Global.map[x][y].focused === true && Global.map[x][y].removed === false ) {
                    controller.countingScore(Global.focused.length); //计算分数
                    controller.removeSquares() ; //消去方块
                    controller.reDraw() ;   //重绘
                }
                else {
                    if( Global.focused.length !== 0 ) {
                        controller.reDraw() ; //重绘
                    }
                    if( Global.map[x][y].removed === false ) {
                        Global.focused = controller.DFS(Global.map[x][y], Global.map) ;
                        if( Global.focused.length > 1 ) {
                            controller.focusSquares(Global.focused) ;
                            controller.showTempScore(Global.focused.length) ;
                        }
                        else {
                            Global.divForTempScore.innerHTML = "" ;
                        }
                    }
                }
            }
            else {
                controller.usingTools(Global.toolType, Global.map[x][y]) ;
            }
        }
        else {  //若鼠标在游戏区域外点击，且之前有方块被选中，则重绘游戏区域
            if( Global.toolType === null ) {
                if( Global.focused.length !== 0 ) {
                    controller.reDraw() //重绘
                }
                Global.divForTempScore.innerHTML = "" ;
                Global.brushColor = null ;
                Global.toolType = null ;
            }
            else {
                controller.toolRecovery() ;
            }
        }
    };

    document.onselectstart = function() {
        return false;
    }
    document.onmouseup = MouseClick ;
    Global.MouseClick = MouseClick ;
})(window);
