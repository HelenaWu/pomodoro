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
            templateUrl: '../templates/timer.html'
        });
    }
    
    angular 
        .module("pomo", ['ui.router'])
        .config(config);
})();