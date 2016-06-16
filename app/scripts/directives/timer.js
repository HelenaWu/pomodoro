(function(){
    function Timer($interval, TIME){
        var minutes;
        var promise;
        var sessions = 0;
        var toSeconds = function(minutes){
            return TIME.MINSINHOUR * minutes;
        }        
        var mySound = new buzz.sound("../assets/sounds/ding.mp3",{
           preload: true
        });
        return{
            templateUrl: "../templates/directives/timer.html",
            replace: true,
            restrict: 'E',
            scope: {
                toggle: '&'
            },
            link: function(scope, element, attrs){
                scope.buttonText = "start";
                scope.init = true;
                scope.counting = false;
                scope.timesInterrupted = 0;                 
                var decrement = function(){
                    return scope.timeRemainingSecs --;
                }   
                scope.timeRemainingSecs = toSeconds(attrs.max);   
                
                scope.$watch('timeRemainingSecs', function(newVal, oldVal){
                    if (newVal <= 0 ){
                        scope.stop(); 
                        mySound.play();
                        if (attrs.toggle){
                            scope.toggle();                            
                        }
                        scope.reset();
                    }
                });
                scope.addInterruption = function(){
                    scope.timesInterrupted +=1;
                }
                scope.reset = function(){
                    scope.init = true;
                    scope.timesInterrupted = 0;
                    if (sessions === TIME.LONG_BREAK_TURNS){
                        scope.timeRemainingSecs = toSeconds(TIME.LONG_BREAK_DURATION);
                        sessions = -2;
                    }else{
                        scope.timeRemainingSecs = toSeconds(attrs.max);              
                        sessions +=1;                                                 
                    }
                    if (angular.isDefined(promise)){
                        promise = undefined;
                    }
                };
                scope.start = function(){ 
                    scope.counting = true;
                    promise = $interval(decrement, 1000);
                };
                scope.action = function(){
                    if (!angular.isDefined(promise)){
                        scope.start();
                        scope.buttonText = "reset";
                    }else{
                        scope.stop();
                        scope.reset();
                        scope.buttonText = "start";
                    }
                };
                scope.stop = function(){
                    scope.counting = false;
                    scope.init = false;                
                    if(angular.isDefined(promise)){
                        $interval.cancel(promise);
                        promise = undefined;
                    }
                };
                             
            }
    
        }
    };    
    angular 
        .module("pomo")
        .directive('timer', ['$interval', 'TIME', Timer]);
})();