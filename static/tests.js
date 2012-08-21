pavlov.specify("School Bus Demo", function (){
    describe("The school bus", function (){
        var methods;
        before(function (){
            app.logic.schoolbus.clear();
            methods = app.logic.schoolbus;
        });

        it("should be defined on the global app variable", function (){
            assert(app).isDefined();
            assert(app.logic).isDefined();
            assert(app.logic.schoolbus).isDefined();
        });

        describe("when we have a driver", function (){
            before(function (){
                methods.driver({ driver: "Bob"}, function (err){
                    if (err){
                        assert().fail();
                    }
                })
            });
            it("should be able to drive", function (){
                methods.drive({}, function (err, data){
                    assert(err).isNull();
                    assert(data.isDriving).isTrue();
                    assert(data.message).isNotNull();
                })
            })
        });

        describe("when we have no driver", function (){
            it("should not be started", function (){
                methods.drive({}, function (err, data){
                    assert(err).isNotNull();
                    assert(err).isEqualTo("We have no driver to drive");
                });
            });
        });

        describe("when not driving", function (){
            it("should be able to set a new driver", function (){
                methods.driver({ driver: "Bob"}, function (err, data){
                    assert(err).isNull();
                    assert(data.driver).isEqualTo("Bob");
                });
            });
        });

        describe("when driving", function (){
            before(function (){
                methods.driver({driver: "Steve"}, function (err){ assert(err).isNull(); });
                methods.drive({}, function (err){ assert(err).isNull(); });
            });

            it("should not be able to set a new driver", function(){
                methods.driver({ driver: "Bob"}, function (err, data){
                    assert(data).isNull();
                    assert(err).isEqualTo("Cannot change drivers when out driving");
                });
            });

            it ("should not allow passengers to come on to the bus.", function (){
                methods.passenger({passengers : 4}, function (err, data){
                    assert(data).isNull();
                    assert(err).isEqualTo("The bus is currently in motion, cannot allow passengers on at this time.");
                })
            });

            describe("when stopping", function (){
                it("should empty the bus when requested", function (){
                    methods.stop({ empty: true}, function (err, data){
                        assert(data.passengers).isEqualTo(0);
                        assert(data.message).isEqualTo("The bus has stopped and has 0 passengers.");
                    });
                });
            });
        });

        describe("when the bus has passengers and is driving", function (){
            before(function (){
                methods.passenger({passengers: 4}, function (err) { assert(err).isNull(); });
                methods.driver({driver: "Steve"}, function (err){ assert(err).isNull(); });
                methods.drive({}, function (err){ assert(err).isNull(); });
            });
            it ("should empty the bus when asked to empty", function (){
                methods.stop({ empty: true }, function (err, data){
                    assert(err).isNull();
                    assert(data.passengers).isEqualTo(0);
                    assert(data.message).isEqualTo("The bus has stopped and has 0 passengers.");
                });
            });
        });

    });
});