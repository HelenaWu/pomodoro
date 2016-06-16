(function(){
    function TimerCtrl($scope){
        $scope.onBreak = false;
        $scope.sessions = 0;
        $scope.toggle = function(){
            $scope.onBreak = !$scope.onBreak;
            if ($scope.onBreak){
                $scope.sessions +=1;                
            }
        }        
    }
    
    angular
        .module('pomo')
        .controller('TimerCtrl', ['$scope', TimerCtrl]);
})();