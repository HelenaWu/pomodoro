(function(){
    function TimerCtrl($scope){
        $scope.onBreak = false;
        $scope.toggle = function(){
            $scope.onBreak = !$scope.onBreak;
        }
    }
    
    angular
        .module('pomo')
        .controller('TimerCtrl', ['$scope', TimerCtrl]);
})();