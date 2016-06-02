(function(){
    function Timer($interval, TIME){
        var minutes;
        var promise;
        var sessions = 0;
        var toSeconds = function(minutes){
            return TIME.MINSINHOUR * minutes;
        }        
 
        return{
            templateUrl: "../templates/directives/timer.html",
            replace: true,
            restrict: 'E',
            scope: {
                toggle: '&'
            },
            link: function(scope, element, attrs){
                scope.buttonText = "start";
                var decrement = function(){
                    return scope.timeRemainingSecs --;
                }   
                scope.timeRemainingSecs = toSeconds(attrs.max);   
                
                scope.$watch(function(){
                    if (scope.timeRemainingSecs <= 0 ){
                        scope.stop();  
                        scope.toggle();
                        scope.reset();
                    }
                });
                scope.reset = function(){
                    console.log('session' + sessions);
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