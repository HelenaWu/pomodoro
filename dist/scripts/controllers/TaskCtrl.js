(function(){
    function TaskCtrl($scope, $firebaseArray){        
        var ref = new Firebase("https://crackling-torch-4400.firebaseio.com");
        $scope.tasks = $firebaseArray(ref);
        $scope.item = "";
        $scope.addMsg = function(task){            
            $scope.tasks.$add({
                text: task
            });            
        };
    }
    
    angular
        .module('pomo')
        .controller('TaskCtrl', ['$scope', '$firebaseArray', TaskCtrl]);
})();