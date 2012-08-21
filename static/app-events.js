(function ($, _, app){

    var success = function success(event, fn){
        return function (err, data){
            if (err){
                logMessage(event, "Error: " + err, null);
            }else{
                logMessage(event, "Success: " + fn(data), data);
            }
        }
    }

    var logMessage = function logMessage(event, message, data){
        $("tbody").append("<tr><td>" + event  + "</td><td>" + message + "</td><td>" + JSON.stringify(data) + "</td></tr>");
    };

    $(".app-bus-drive").on("click", function (){
        app.bus.emit("app::bus::drive", {}, success("Drive", function (data){
            return data.message;
        }));
    });

    $(".app-bus-stop").on("click", function (){
        app.bus.emit("app::bus::stop", {
            empty : $(".app-bus-empty").hasClass("active")
        }, success("Stop", function (data){
            return data.message;
        }));
    });

    $(".app-bus-driver").on("click", function (){
        app.bus.emit("app::bus::driver", { driver: $("#driver-name").val() }, success("Driver", function (data){
            return data.message;
        }));
    });

    $(".app-bus-students").on("click", function (){
        app.bus.emit("app::bus::passenger", {
            passengers : parseInt($("#student-count").val())
        }, success("Passengers", function (data){
            return data.message;
        }));
    });

})(jQuery, _, app);