(function(){
    function Timer($interval){
        var minutes;
        var promise;
        var toSeconds = function(minutes){
            return 60 * minutes;
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
                    if (scope.timeRemainingSecs == 0 ){
                        scope.stop();            
                        scope.toggle();
                        scope.reset();
                    }
                });
                scope.reset = function(){
                    scope.timeRemainingSecs = toSeconds(attrs.max);
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
        .directive('timer', ['$interval', Timer]);
})();