(function(window){
    var Controller = function() {
        this.setView = function() {
            setTimeout(function(){
                Global.gameLeft = document.getElementById("game").offsetLeft ;
                Global.gameTop = document.getElementById("game").offsetTop + 10 ;

                Global.game.style.marginLeft = "0px" ;
                Global.game.style.marginTop = "0px" ;
                Global.game.style.left = Global.gameLeft + "px" ;
                Global.game.style.top = Global.gameTop + "px" ;

                var best = document.getElementById("best") ;
                best.style.left = Global.game.offsetLeft - 260 + "px" ;
                best.style.top = Global.game.offsetTop + 20 + "px" ;
                var bonus = document.getElementById("bonus") ;
                bonus.style.left = Global.game.offsetLeft - 260 + "px" ;
                bonus.style.top = Global.game.offsetTop + 130 + "px" ;
                var target = document.getElementById("target") ;
                target.style.left = Global.game.offsetLeft + 259 + "px" ;
                target.style.top = Global.game.offsetTop + 20 + "px" ;
                var score = document.getElementById("score") ;
                score.style.left = Global.game.offsetLeft + 259 + "px" ;
                score.style.top = Global.game.offsetTop + 130 + "px" ;

                var best = document.getElementById("best") ;
                if( window.localStorage.best ) {
                    best.innerHTML = "best: " + window.localStorage.best ;
                }
                else {
                    best.innerHTML = "best: " ;
                }
            },100);
        };

        this.init = function() {
            console.log("initial the view of the game") ;
            clearTimeout(Global.timer) ;

            Global.map = new Array(10) ;
            for( var i = 0; i < 10; i ++ ) {
                Global.map[i] = new Array(10) ;
                Global.numOfElemPerCol[i] = 10 ;
            }

            var ctx = Global.canvas.getContext("2d") ;
            Global.gameLeft = Global.game.offsetLeft ;
            Global.gameTop = Global.game.offsetTop ;
            //console.log("Global.gameLeft " + Global.gameLeft + " Global.gameTop: " + Global.gameTop) ;
            /*var width = Global.canvas.width ;
             var height = Global.canvas.height ;
             //ctx.clearRect(0, 0, width, height) ;*/
            Global.divForTempScore.innerHTML = "" ;
            Global.divForBonus.innerHTML = "" ;
            Global.divForTarget.innerHTML = "Level: " + Global.level + "<br/>" + "Target: " + Global.levelScore[Global.level] ;

            for( var i = 0; i < 10; i ++ ) {
                for( var j = 0; j < 10; j ++ ) {
                    var colorId = Math.floor( Math.random() * 5 ) ;

                    Global.map[i][j] = new Square(i, j, j * 52, i * 52 + 20, Global.color[colorId], colorId) ;
                    Global.map[i][j].draw(ctx) ;
                }
            }

            if( document.onmouseup === null || document.onmouseup === undefined ) {
                document.onmouseup = Global.MouseClick ;
            }
        };

        this.initTools = function() {
            var red = document.getElementById("red") ;
            var blue = document.getElementById("blue") ;
            var yellow = document.getElementById("yellow") ;
            var green = document.getElementById("green") ;
            var purple = document.getElementById("purple") ;
            var hammer = document.getElementById("hammer") ;
            var bomb = document.getElementById("bomb") ;

            Global.brushColor = null ;
            Global.toolType = null ;

            if( red.onclick === null ) {
                red.onclick = function() {
                    if( red.className === "tools_disabled" ) {
                        return false ;
                    }
                    red.className = "tools_disabled" ;
                    Global.brushColor = "#ff4500" ;
                    Global.toolType = "brush" ;
                    return false ;
                };
            }
            if( blue.onclick === null ) {
                blue.onclick = function() {
                    if( blue.className === "tools_disabled" ) {
                        return false ;
                    }
                    blue.className = "tools_disabled" ;
                    Global.brushColor = "#4169e1" ;
                    Global.toolType = "brush" ;
                    return false ;
                };
            }
            if( yellow.onclick === null ) {
                yellow.onclick = function() {
                    if( yellow.className === "tools_disabled" ) {
                        return false ;
                    }
                    yellow.className = "tools_disabled" ;
                    Global.brushColor = "#ffd700" ;
                    Global.toolType = "brush" ;
                    return false ;
                };
            }
            if( green.onclick === null ) {
                green.onclick = function() {
                    if( green.className === "tools_disabled" ) {
                        return false ;
                    }
                    green.className = "tools_disabled" ;
                    Global.brushColor = "#32cd32" ;
                    Global.toolType = "brush" ;
                    return false ;
                };
            }
            if( purple.onclick === null ) {
                purple.onclick = function() {
                    if( purple.className === "tools_disabled" ) {
                        return false ;
                    }
                    purple.className = "tools_disabled" ;
                    Global.brushColor = "#9400d3" ;
                    Global.toolType = "brush" ;
                    return false ;
                };
            }

            if( hammer.onclick === null ) {
                hammer.onclick = function() {
                    if( hammer.className === "tools_disabled" ) {
                        return false ;
                    }
                    hammer.className = "tools_disabled" ;
                    Global.toolType = "hammer" ;
                    return false ;
                };
            }
            if( bomb.onclick === null ) {
                bomb.onclick = function() {
                    if( bomb.className === "tools_disabled" ) {
                        return false ;
                    }
                    bomb.className = "tools_disabled" ;
                    Global.toolType = "bomb" ;
                    return false ;
                };
            }
        }

        this.selectTarget = function(mouseX, mouseY) {
            var Global = window.Global ;
            //若鼠标在游戏区域内点击，则获取点击的方块索引值
            if( Global.gameLeft <= mouseX && mouseX <= Global.gameLeft + 518 && Global.gameTop + 20 <= mouseY && mouseY <= Global.gameTop + 518 + 20 ) {
                var y = Math.floor( ( mouseX - Global.gameLeft ) / 52 ) ;
                var x = Math.floor( ( mouseY - Global.gameTop - 20 ) / 52 ) ;

                if( Global.toolType === null ) {
                    if( Global.map[x][y].focused === true && Global.map[x][y].removed === false ) {
                        this.countingScore(Global.focused.length); //计算分数
                        this.removeSquares() ; //消去方块
                        this.reDraw() ;   //重绘
                    }
                    else {
                        if( Global.focused.length !== 0 ) {
                            this.reDraw() ; //重绘
                        }
                        if( Global.map[x][y].removed === false ) {
                            Global.focused = this.DFS(Global.map[x][y], Global.map) ;
                            if( Global.focused.length > 1 ) {
                                this.focusSquares(Global.focused) ;
                                this.showTempScore(Global.focused.length) ;
                            }
                            else {
                                Global.divForTempScore.innerHTML = "" ;
                            }
                        }
                    }
                }
                else {
                    this.usingTools(Global.toolType, Global.map[x][y]) ;
                }
            }
            else {  //若鼠标在游戏区域外点击，且之前有方块被选中，则重绘游戏区域
                if( Global.toolType === null ) {
                    if( Global.focused.length !== 0 ) {
                        this.reDraw() //重绘
                    }
                    Global.divForTempScore.innerHTML = "" ;
                    Global.brushColor = null ;
                    Global.toolType = null ;
                }
                else {
                    this.toolRecovery() ;
                }
            }
        };

        this.reDraw = function() {
            console.log("redraw") ;
            var map = Global.map ;
            var ctx = Global.canvas.getContext("2d") ;
            ctx.clearRect(0, 0, Global.canvas.width, Global.canvas.height) ;
            for( var i = 0 ; i < 10 ; i ++ ) {
                for( var j = 0 ; j < 10 ; j ++ ) {
                    map[i][j].focused = false ;
                    if( map[i][j].removed === false ) {
                        map[i][j].draw(ctx) ;
                    }
                }
            }

            //显示各个小方块的位置及其颜色
            for( var i = 0 ; i < 10 ; i ++ ) {
                var text = "" ;
                for( var j = 0 ; j < 10 ; j ++ ) {
                    text = text + "(" + map[i][j].x + "," + map[i][j].y + "," + map[i][j].colorId + "," + map[i][j].removed + ")" ;
                }
                console.log(text) ;
            }
        };

        this.sortAndDivide = function(focused) {
            var result = [] ;
            var algorithm = new Algorithm() ;

            //按列排序，从左到右，从上到下
            var cmp = function(a, b) {
                if(a.y > b.y ) {
                    return 1 ;
                }
                else if(a.y === b.y ) {
                    if( a.x > b.x ) {
                        return 1 ;
                    }
                    else if( a.x === b.x ) {
                        return 0 ;
                    }
                    else {
                        return -1 ;
                    }
                }
                else {
                    return -1 ;
                }
            };
            algorithm.quickSort(focused, 0, focused.length-1, cmp) ;

            //按列分割
            var index = 0 ;
            var col = new Array() ;
            col.push(focused[0]) ;
            var length = focused.length ;
            for( var i = 1; i < length; i ++ ) {
                if( focused[i-1].y !== focused[i].y || focused[i-1].x !== focused[i].x - 1 ) {
                    result[index] = col ;
                    col = new Array() ;
                    index = index + 1 ;
                }
                col.push(focused[i]) ;
            }
            result[index] = col ;

            return result ;
        };

        this.getSquaresAbove = function(x, y, map) {
            var squaresAbove = [] ;
            for( var i = x - 1; i >= 0 ; i -- ) {
                squaresAbove.push(map[i][y]) ;
            }

            return squaresAbove ;
        };

        this.elemMoveLeft = function(ctx, subMap, distance, last) {
            console.log("elemMoveLeft") ;
            if( subMap.length === 0 ) {
                console.log("the top to remove left") ;
                if( last === true ) {
                    document.onmouseup = Global.MouseClick ;
                    console.log("unlock in the front of elemMoveLeft") ;
                }
                return ;
            }

            //将右侧的所有小方块左移一位
            var map = Global.map ;
            var disOfElem = parseInt( distance / 52 ) ;
            var removedColunm = [] ;
            var left_elem_y = subMap[0][0].y ;
            for( var i = 0 ; i < 10 ; i ++ ) {
                removedColunm.push(map[i][left_elem_y-1]) ;
            }
            for( var i = left_elem_y ; i < 10 ; i ++ ) {
                for( var j = 0 ; j < 10 ; j ++ ) {
                    map[j][i-disOfElem] = map[j][i] ;
                    map[j][i-disOfElem].y = i - disOfElem ;
                }
            }
            for( var i = 0 ; i < 10 ; i ++ ) {
                map[i][9] = removedColunm[i] ;
                map[i][9].y = 9 ;
            }

            var tempX = subMap[0][0].y ;
            var height = Global.canvas.height ;

            var step = parseInt( distance / 3 ) ;
            distance = distance - step ;
            function moveLeft(that) {
                ctx.clearRect(tempX*52, 0, (subMap.length+1)*52, height) ;
                var lengthOfSubMap = subMap.length
                for( var i = 0 ; i < lengthOfSubMap ; i ++ ) {
                    var lengthOfCol = subMap[i].length ;
                    for( var j = 0 ; j < lengthOfCol ; j ++ ) {
                        subMap[i][j].px = subMap[i][j].px - step ;
                        if( subMap[i][j].removed === true ) {
                            continue ;
                        }
                        subMap[i][j].draw(ctx) ;
                    }
                }

                if( distance > 3 ) {
                    step = parseInt( distance / 3 ) ;
                }
                else {
                    step = 1 ;
                }
                distance = distance - step ;
                if( distance >= 0 ) {
                    setTimeout(_moveLeft(that),40) ;
                }
                else {
                    if( last === true ) {
                        document.onmouseup = Global.MouseClick ;
                        that.checkEnd(that) ;
                    }
                }
            }
            function _moveLeft(that) {
                return function() {
                    moveLeft(that)
                }
            }
            setTimeout(_moveLeft(this),10) ;
        }

        this.elemsMoveDown = function(squaresAbove, squaresToRemoved, distance, last) {
            if( squaresAbove.length === 0 ) {
                console.log("the top to remove down") ;
                if( last === true ) {
                    document.onmouseup = Global.MouseClick ;
                    console.log("unlock in the front of elemMoveDown") ;
                }
                return ;
            }

            var map = Global.map ;
            var disOfElem = parseInt( distance / 52 ) ;
            var bottom_x = squaresAbove[0].x ;
            var bottom_y = squaresAbove[0].y ;
            //console.log("bottom_x: " + bottom_x + " bottom.y: " + bottom_y) ;
            for( var i = 0 ; i < squaresAbove.length ; i ++ ) {
                map[bottom_x-i+disOfElem][bottom_y] = map[bottom_x-i][bottom_y] ;
                map[bottom_x-i+disOfElem][bottom_y].x = bottom_x-i+disOfElem ;
            }
            for( var i = 0 ; i < squaresToRemoved.length ; i ++ ) {
                map[i][bottom_y] = squaresToRemoved[i] ;
                map[i][bottom_y].x = i ;
            }

            var that = this ;
            var ctx = Global.canvas.getContext("2d") ;
            var step = parseInt( distance / 3 ) ;
            distance = distance - step ;

            function moveDown(that) {
                //console.log("squares[squares.length-1].y: " + squares[squares.length-1].y) ;
                ctx.clearRect(52*squaresAbove[squaresAbove.length-1].y, 0, 52, 52*( squaresAbove.length+ disOfElem )) ;
                for( var i = 0 ; i < squaresAbove.length ; i ++ ) {
                    squaresAbove[i].py = squaresAbove[i].py + step ;
                    if( squaresAbove[i].removed === true ) {
                        continue ;
                    }
                    squaresAbove[i].draw(ctx) ;
                }

                if( distance > 3 ) {
                    step = parseInt( distance / 3 ) ;
                }
                else {
                    step = 1 ;
                }
                distance = distance - step ;
                if( distance >= 0 ) {
                    setTimeout(_moveDown(that),40) ;
                }
                else {
                    //当最后一个小方块组下落后对各列进行检查，若哪一列的小方块数为0，则将其右边的各列左移
                    if( last === true ) {
                        console.log("last") ;
                        var isLeft = false ;
                        var max = 0 ;
                        for( var j = 0; j < 9; j ++ ) {
                            if( Global.numOfElemPerCol[j] === 0 ) {
                                isLeft = true ;
                                max = j ;
                            }
                        }
                        for( var j = 0 ; j < 9 ; j ++ ) {
                            if( Global.numOfElemPerCol[j] === 0 ) {
                                console.log("y: " + i) ;
                                var subMap = [] ;
                                var tempIndex = 0 ;
                                for( var l = j + 1; l < 10; l ++ ) {
                                    var colElem = [] ;
                                    for( var k = 0; k < 10; k ++ ) {
                                        colElem.push(map[k][l]) ;
                                    }
                                    subMap[tempIndex] = colElem ;
                                    tempIndex ++ ;
                                }
                                if( j === max ) {
                                    console.log("max") ;
                                    //console.log(that) ;
                                    that.elemMoveLeft(ctx, subMap, 52,true) ;
                                }
                                else {
                                    console.log("not max") ;
                                    //console.log(that) ;
                                    that.elemMoveLeft(ctx, subMap, 52, false) ;
                                    max = max - 1 ;
                                }
                                for( var l = j + 1; l < 10; l ++ ) {
                                    Global.numOfElemPerCol[l-1] = Global.numOfElemPerCol[l] ;
                                }
                                Global.numOfElemPerCol[9] = -1 ;

                                var text = "" ;
                                for( var i = 0 ; i < 10 ; i ++ ) {
                                    text = text + Global.numOfElemPerCol[i] + " " ;
                                }
                                console.log(text) ;
                                j = j - 1 ;
                            }
                        }

                        if( isLeft === false ) {
                            document.onmouseup = Global.MouseClick ;
                            that.checkEnd.call(that) ;
                        }
                    }
                }
            };

            function _moveDown(that) {
                //console.log("_moveDown") ;
                return function() {
                    moveDown(that) ;
                }
            }
            setTimeout(_moveDown(this),10) ;
        };

        this.elemMoveUp = function(squaresAbove, elems, distance, last) {
            if( squaresAbove.length === 0 ) {
                console.log("the top to remove up") ;
                if( last === true ) {
                    document.onmouseup = Global.MouseClick ;
                    console.log("unlock in the front of elemMoveDown") ;
                }
                return ;
            }
            var upDist = 20 ;
            var map = Global.map ;
            var disOfElem = parseInt( distance / 52 ) ;
            var ctx = Global.canvas.getContext("2d") ;
            var step = 5 ;
            distance = distance + upDist ;
            upDist = upDist - step ;

            var moveUp = function(that) {
                ctx.clearRect(52*squaresAbove[squaresAbove.length-1].y, 0, 52, 52*( squaresAbove.length ) + 20) ;
                for( var i = 0 ; i < squaresAbove.length ; i ++ ) {
                    squaresAbove[i].py = squaresAbove[i].py - step ;
                    if( squaresAbove[i].removed === true ) {
                        continue ;
                    }
                    squaresAbove[i].draw(ctx) ;
                }


                upDist = upDist - step ;
                if( upDist >= 0 ) {
                    setTimeout(_moveUp(that),40) ;
                }
                else {
                    that.elemsMoveDown(squaresAbove, elems, distance, last) ;
                }
            };

            function _moveUp(that) {
                return function() {
                    moveUp(that) ;
                }
            }
            setTimeout(_moveUp(this),10) ;
            //this.elemsMoveDown(squaresAbove, elems, distance, last) ;
        };

        this.moveELem = function(squaresAbove, elems, distance, last) {
            this.elemMoveUp(squaresAbove, elems, distance, last) ;
        };

        this.removeSquares = function() {
            console.log("removeSquares") ;
            document.onmouseup = null ;
            console.log("mouse lock") ;

            var map = Global.map ;
            Global.cols = this.sortAndDivide(Global.focused) ;
            var cols = Global.cols ;
            //console.log(Global.cols.length) ;

            for( var i = 0 ; i < cols.length ; i ++ ) {
                //console.log("cols[i][0].x: " + cols[i][0].x + " cols[i][0].y: " + cols[i][0].y ) ;
                var squaresAbove = this.getSquaresAbove(cols[i][0].x, cols[i][0].y, map) ;
                for( var j = 0 ; j < cols[i].length ; j ++ ) {
                    map[cols[i][j].x][cols[i][j].y].removed = true ;
                    Global.numOfElemPerCol[cols[i][j].y] = Global.numOfElemPerCol[cols[i][j].y] - 1 ;
                }
                var distance = cols[i].length * 52 ;
                if( i === cols.length - 1 ) {
                    this.moveELem(squaresAbove, cols[i], distance, true) ;
                }
                else {
                    this.moveELem(squaresAbove, cols[i], distance, false) ;
                }
            }
        };

        this.countingScore = function(numOfSquare) {
            console.log("countingCourse") ;
            clearTimeout(Global.timer) ;
            var tempScore = Global.score ;
            Global.score = Global.score +  parseInt( numOfSquare * numOfSquare ) * 5 ;
            var score = Global.score ;
            var gap = score - tempScore ;
            var step = parseInt( gap / 20 ) ;
            gap = gap - step ;

            var divForScore = Global.divForScore ;
            var showScore = function() {
                divForScore.innerHTML = "Score: " + tempScore ;

                if( gap < 20 ) {
                    step = 1 ;
                }

                if( tempScore < score ) {
                    tempScore = tempScore + step ;
                    gap = gap - step ;
                    timer = setTimeout(arguments.callee,20) ;
                }
                else {
                    divForScore.innerHTML = "Score: " + score ;
                }
            };
            showScore() ;
        };

        this.DFS = function(start, map) {
            console.log("DFS") ;
            if( start.removed === true ) {
                return new Array() ;
            }
            var result = [] ;
            var visit = new Array(100);
            for( var i = 0; i < 100; i ++ ) {
                visit[i] = false ;
            }

            var q = new Queue() ;
            q.push(start) ;
            result.push(start) ;
            //console.log(start) ;
            visit[start.x*10+start.y] = true ;

            while( q.empty() === false ) {
                var temp = q.front() ;
                q.pop() ;

                var x = temp.x ;
                var y = temp.y ;

                //console.log("temp.x: " + temp.x + ", temp.y: " + temp.y) ;

                if( x > 0 && map[x-1][y].color === temp.color && visit[(x-1)*10+y] === false && map[x-1][y].removed === false ) {
                    q.push(map[x-1][y]) ;
                    result.push(map[x-1][y]) ;
                    //console.log(map[x-1][y]) ;
                    visit[(x-1)*10+y] = true ;
                }
                if( x < 9 && map[x+1][y].color === temp.color && visit[(x+1)*10+y] === false && map[x+1][y].removed === false ) {
                    q.push(map[x+1][y]) ;
                    result.push(map[x+1][y]) ;
                    //console.log(map[x+1][y]) ;
                    visit[(x+1)*10+y] = true ;
                }
                if( y > 0 && map[x][y-1].color === temp.color && visit[x*10+y-1] === false && map[x][y-1].removed === false ) {
                    q.push(map[x][y-1]) ;
                    result.push(map[x][y-1]) ;
                    //console.log(map[x][y-1]) ;
                    visit[x*10+y-1] = true ;
                }
                if( y < 9 && map[x][y+1].color === temp.color && visit[x*10+y+1] === false && map[x][y+1].removed === false ) {
                    q.push(map[x][y+1]) ;
                    result.push(map[x][y+1]) ;
                    //console.log(map[x][y+1]) ;
                    visit[x*10+y+1] = true ;
                }
            }

            //console.log(result);
            //console.log("DFS end") ;
            return result ;
        };

        this.showTempScore = function(numOfSquares) {
            var tempScore = numOfSquares * numOfSquares * 5 ;
            Global.divForTempScore.style.fontSize = "1px" ;
            Global.divForTempScore.innerHTML = numOfSquares + " Squares " + tempScore + " Scores" ;
            var i = 1 ;

            var show = function() {
                i = i + 1 ;
                Global.divForTempScore.style.fontSize = i + "px" ;
                if( i < 35 ) {
                    setTimeout(arguments.callee,5) ;
                }
            };
            show() ;
        };

        this.focusSquares = function(focused) {
            console.log("focusSquares") ;
            var ctx = Global.canvas.getContext("2d") ;
            for( var i in focused ) {
                focused[i].focused = true ;
                focused[i].focusByStroke(ctx) ;
            }
        };

        this.checkEnd = function() {
            console.log("checkEnd") ;
            var map = Global.map ;
            var flag = false ;
            //遍历整张图寻找是否有成对的小方块存在，对于每个小方块只需要检查其下方和右侧的小方块即可
            for( var i = 0 ; i < 10 ; i ++ ) {
                for( var j = 0 ; j < 10 ; j ++ ) {
                    if( map[i][j].removed === true ) {
                        continue ;
                    }
                    if( i !== 9 && map[i+1][j].removed === false && map[i][j].color === map[i+1][j].color ) {
                        //console.log(map[i][j]) ;
                        flag = true ;
                        break ;
                    }
                    if( j !== 9 && map[i][j+1].removed === false && map[i][j].color === map[i][j+1].color ) {
                        //console.log(map[i][j]) ;
                        flag = true ;
                        break ;
                    }
                }
            }
            console.log("is the game continue? " + flag) ;
            var that = this ;
            //console.log(that) ;

            if( flag === false ) {
                console.log("this level is end") ;
                Global.divForTempScore.style.fontSize = "35px" ;
                setTimeout(function(){
                    return that.ending.call(that) ;
                },1000) ;
            }
            else {
                if( document.onmouseup === null || document.onmouseup === undefined ) {
                    console.log("unlock in checkEnd()") ;
                    document.onmouseup = Global.MouseClick ;
                }
            }
        } ;

        this.ending = function() {
            console.log("ending") ;
            document.onmouseup = null ;
            var map = Global.map ;
            var ctx = Global.canvas.getContext("2d") ;
            var width = Global.canvas.width ;
            var height = Global.canvas.height ;
            var elemLeft = [] ;

            for( var i = 0 ; i < 10 ; i ++ ) {
                for( var j = 0 ; j < 10 ; j ++ ) {
                    if( map[i][j].removed === false ) {
                        elemLeft.push(map[i][j]) ;
                    }
                }
            }

            this.leftBonus(elemLeft.length) ;

            if( elemLeft.length === 0 ) {
                return ;
            }

            var turn = 0 ;

            var show = function(that) {
                if( turn % 2 === 0 ) {
                    ctx.clearRect(0, 0, width, height) ;
                }
                else {
                    that.reDraw() ;
                }

                turn = turn + 1 ;
                if( turn < 20 ) {
                    timer = setTimeout(_show(that),100) ;
                }
            };
            function _show(that) {
                return function() {
                    show(that)
                }
            }
            setTimeout(_show(this),10) ;

            if( Global.score < Global.levelScore[Global.level] ) {
                Global.divForTempScore.innerHTML = "Lose" ;
                console.log("Lose") ;
                this.isBest() ;
            }
            else {
                Global.divForTempScore.innerHTML = "Pass" ;
                Global.level = Global.level + 1 ;
                if( Global.level < Global.levelScore.length ) {
                    console.log("Pass") ;
                    var that = this ;
                    //console.log(this) ;
                    function _nextLevel(that) {
                        return function() {
                            that.nextLevel() ;
                        }
                    }
                    setTimeout(_nextLevel(this),5000) ;
                }
                else {
                    this.isBest() ;
                }
            }
        } ;

        this.leftBonus = function(count) {
            clearTimeout(Global.timer) ;
            console.log("leftBonus") ;
            var bonus ;
            var tempscore ;

            if( count <= 10 ) {
                bonus = ( 10 - count ) * ( 400 - 20 * ( 10 - count ) ) ;
            }
            else {
                bonus = 0 ;
            }
            //console.log("bonus: " + bonus + ", score: " + Global.score) ;

            Global.divForBonus.innerHTML = count + " Squares Left" + "<br/>" + "Bonus: " + bonus ;

            tempscore = Global.score ;
            Global.score = Global.score + bonus ;
            //console.log("Glbal.score: " + Global.score) ;

            var step = parseInt( bonus / 15 ) ;
            bonus = bonus - step ;
            var show = function() {
                tempscore = tempscore + step ;
                //console.log("tempScore: " + tempscore) ;
                Global.divForScore.innerHTML = "Score: " + tempscore ;
                Global.divForBonus.innerHTML = count + " Squares Left" + "<br/>" + "Bonus: " + bonus ;

                if( bonus >= 15 ) {
                    step = parseInt( bonus / 15 ) ;
                    bonus = bonus - step ;
                }
                else {
                    step = 1 ;
                    bonus = bonus - step ;
                }

                if( bonus >= 0 ) {
                    timer = setTimeout(arguments.callee,20) ;
                }
                else {
                    Global.divForScore.innerHTML = "Score: " + Global.score ;
                }
            };

            if( bonus !== 0 ) {
                setTimeout(show,2000) ;
            }
        };

        this.nextLevel = function() {
            var ctx = Global.canvas.getContext("2d") ;
            console.log(this) ;
            this.init() ;
        };

        this.usingTools = function(toolName, elem) {
            var map = Global.map ;
            var ctx = Global.canvas.getContext("2d") ;
            if( elem.removed === true ) {
                this.toolRecovery() ;
                return ;
            }
            if( toolName === "brush" ) {
                Global.divForTempScore.innerHTML = "" ;
                elem.color = Global.brushColor ;
                elem.draw(ctx) ;
                Global.brushColor = null ;
                Global.toolType = null ;
            }
            if( toolName === "hammer" ) {
                var tempIndex = ( elem.x - 1 ) * 10 + elem.y ;
                Global.focused = [] ;

                elem.removed = true ;
                Global.focused.push(elem) ;
                this.reDraw() ;
                this.removeSquares() ;
                Global.toolType = null ;
            }
            if( toolName === "bomb" ) {
                Global.focused = [] ;
                for( var i = elem.y - 1; i <= elem.y + 1; i ++ ) {
                    for( var j = elem.x - 1; j <= elem.x + 1; j ++ ) {
                        if( i < 0 || i > 9 || j < 0 || j > 9 || map[j][i].removed === true ) {
                            continue ;
                        }
                        map[j][i].removed = true ;
                        Global.focused.push(map[j][i]) ;
                    }
                }
                Global.cols = this.sortAndDivide(Global.focused) ;
                this.reDraw() ;
                this.removeSquares() ;
                Global.toolType = null ;
            }
        };

        this.toolRecovery = function() {
            if( Global.toolType === "brush" ) {
                var colorClass = ["red", "blue", "yellow", "green", "purple"] ;
                var brushes = document.getElementById("tools").getElementsByTagName("div") ;
                for( var i = 0 ; i < 5 ; i ++ ) {
                    if( Global.brushColor == Global.color[i] ) {
                        brushes[i].className = colorClass[i] ;
                    }
                }
                Global.toolType = null ;
                Global.brushColor = null ;
            }
            if( Global.toolType === "hammer" || Global.toolType === "bomb" ){
                var tool = document.getElementById(Global.toolType) ;
                tool.className = Global.toolType ;

                Global.toolType = null ;
            }
        };

        this.isBest = function() {
            var best = document.getElementById("best") ;
            if( window.localStorage ) {
                if( window.localStorage.best ) {
                    if( Global.score > window.localStorage.best ) {
                        window.localStorage.best = Global.score ;
                        best.innerHTML = "best: " + window.localStorage.best ;
                    }
                }
                else {
                    window.localStorage.best = Global.score ;
                    best.innerHTML = "best: " + window.localStorage.best ;
                }
            }
        };
    }

    window.Controller = Controller ;
})(window);
