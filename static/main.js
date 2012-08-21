var app = {};

// -- Build the bus
(function (){
    var tid = null;
    (function build_bus(){
        if ('EventEmitter2' in window){
            if (tid) {
                clearTimeout(tid);
            }
            app.bus = new EventEmitter2();
        }
        else{
            tid = setTimeout(build_bus, 100);
        }
    })();
})();