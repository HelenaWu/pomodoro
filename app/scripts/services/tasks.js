(function(){
   function Tasks($firebaseArray){       
    var ref = new Firebase("https://crackling-torch-4400.firebaseio.com/data");
    //download tasks into a synchronized array
    var tasks = $firebaseArray(ref);
    return {
        all: tasks
    };
   }
    angular
        .module('pomo')
        .factory('Tasks', ['$firebaseArray', Tasks]);
})();