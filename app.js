var flatiron = require("flatiron");
var ecstatic = require("ecstatic");
var _ = require("underscore");
var app = flatiron.app;

app.use(flatiron.plugins.http, {
    before: [
        ecstatic(__dirname + "/static"),
        ecstatic(__dirname + "/node_modules/eventemitter2/lib")
    ]
});

app.router.mount({
    "/" : {
        get : function (){

        }
    },
    "/data" : {

    }
});

app.start(8080, function (err){
    if (err){
        app.error(err);
    }
    app.log.info("The application was started at http://localhost:8080");
});