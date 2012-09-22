


function Queue() {
    var queueNode = function() {
        this.next = null ;
        this.prev = null ;
    };

    var head = new queueNode() ;
    var tail = new queueNode() ;
    var length = 0 ;

    head.next = tail ;
    head.prev = null ;
    tail.prev = head ;
    tail.next = null ;

    this.empty = function() {
        if( head.next === tail ) {
            return true ;
        }
        else {
            return false ;
        }
    };

    this.size = function() {
        return length ;
    };

    this.front = function() {
        if( this.empty() === true ) {
            return null ;
        }
        else {
            return head.next.value ;
        }
    };

    this.back = function() {
        if( this.empty() === true ) {
            return null ;
        }
        else {
            return tail.prev.value ;
        }
    };

    this.push = function(value) {
        if( value == undefined ) {
            console.log("The value to be pushed should be specify!") ;
            return false;
        }
        var newNode = new queueNode() ;
        newNode.value = value ;

        newNode.prev = tail.prev ;
        tail.prev.next = newNode ;
        newNode.next = tail ;
        tail.prev = newNode ;

        length = length + 1 ;

        return true ;
    };

    this.pop = function() {
        var to_delete = head.next ;

        if( to_delete === tail ) {
            console.log("The queue is already empty!") ;
            return null ;
        }

        head.next = to_delete.next ;
        to_delete.prev = null ;
        to_delete.next.prev = head ;
        to_delete.next = null ;

        return to_delete ;
    };

    this.clear = function() {
        var to_delete = head.next ;

        while( to_delete !== tail ) {
            head.next = to_delete.next ;
            head.next.prev = head ;

            to_delete.prev = null ;
            to_delete.next = null ;

            to_delete = head.next ;
        }

        length = 0 ;
    };

    this.show = function() {
        var current = head.next ;
        var result = "" ;

        while( current !== tail ) {
            result = result + " " + current.value ;
            current = current.next ;
        }

        console.log(result) ;
    };
}

