(function(){
    function Timer($interval){
        var Timer = {};
        var minutes = 25;
        var promise;
        var decrement = function(){
            return Timer.timeRemainingSecs --;
        }
        Timer.buttonText = "start";
        
        Timer.action = function(){
            if (!angular.isDefined(promise)){
                Timer.start();
                Timer.buttonText = "reset";
            }else{
                Timer.stop();
                Timer.reset();
                Timer.buttonText = "start";
            }            
        };
        Timer.reset = function(){
            Timer.timeRemainingSecs = minutes * 60;
            if (angular.isDefined(promise)){
                promise = undefined;
            }
        };
        Timer.reset();
        Timer.start = function(){            
            promise = $interval(decrement, 1000);
        };
        
        Timer.stop = function(){
            if(angular.isDefined(promise)){
                $interval.cancel(promise);
                promise = undefined;
            }
        };

        return Timer;
    }
    
    angular 
        .module("pomo")
        .factory('Timer', ['$interval', Timer]);
})();