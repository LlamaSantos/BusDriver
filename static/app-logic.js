(function (app){
    "use strict";

    var model = {
        "driver" : null,
        "passengers" : 0,
        isDriving : false
    };

    var methods = {
        clear : function (){
            // -- Helper method for testing and clearing a context in a global scope
            model.driver = null;
            model.passengers = 0;
            model.isDriving = false;
        },

        drive : function (data, callback){

            if (!model.driver){
                callback("We have no driver to drive", null);
            }

            else if (model.isDriving){
                callback("We are already driving", null);
            }
            else if (model.driver && (!model.isDriving)){
                model.isDriving = true;
                callback(null, {
                    isDriving : model.isDriving,
                    message : model.driver + " is driving with " + model.passengers + " passengers!"
                });
            }
            else{
                callback("Not too sure if we have an error or not.", null);
            }
        },

        stop : function (data, callback){
            if (model.isDriving){
                model.isDriving = false;

                if (data.empty){
                    model.passengers = 0;
                }

                callback(null, {
                    passengers: 0,
                    message: "The bus has stopped and has " + model.passengers + " passengers."
                });
            }
            else{
                callback("Cannot stop the bus because its not driving.", null);
            }
        },

        driver : function (data, callback){
            if (!data.driver){
                callback("No driver was given", null);
            }
            if (model.isDriving){
                callback("Cannot change drivers when out driving", null);
            }
            else{
                model.driver = data.driver;
                callback(null, {
                    driver : model.driver,
                    message : model.driver + " is now driving the bus"
                });
            }
        },

        passenger : function (data, callback){
            if (model.isDriving){
                callback("The bus is currently in motion, cannot allow passengers on at this time.", null);
            }else{
                if(data.passengers){
                    model.passengers = model.passengers + data.passengers;
                    callback(null, {
                        passengers : model.passengers,
                        message : "There are currently " + model.passengers + " on the bus!"
                    });
                }
                else{
                    callback("No passengers to get on the bus.", null);
                }
            }
        }
    }

    app.logic = {
        schoolbus: methods
    };

    // -- Wire the events
    app.bus.on("app::bus::stop", methods.stop);
    app.bus.on("app::bus::drive", methods.drive);
    app.bus.on("app::bus::driver", methods.driver);
    app.bus.on("app::bus::passenger", methods.passenger);
})(app);