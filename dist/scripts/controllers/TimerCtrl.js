(function(){
    function TimerCtrl(Timer){
        this.timer = Timer;
    }
    
    angular
        .module('pomo')
        .controller('TimerCtrl', ['Timer', TimerCtrl]);
})();