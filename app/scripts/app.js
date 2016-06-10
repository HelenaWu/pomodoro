(function(){
    function config($stateProvider, $locationProvider){
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
        $stateProvider
            .state('timer', {
            url: '/' ,
            controller: 'TimerCtrl as timerCtrl',
            templateUrl: '../templates/index.html'
        });
    }
    
    angular 
        .module("pomo", ['ui.router', 'firebase'])
        .config(config);
})();