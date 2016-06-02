(function(){
    function secToMin(){
        return function(seconds){
            
            var mins = Math.floor(seconds / 60) ;
            var seconds = (seconds % 60).toFixed(0);
            output = mins + ":";
            if (seconds < 10){
                output += "0";
            }            
            return output + seconds;
        }    
    };
    
    
    angular
        .module('pomo')
        .filter('sectomin', secToMin);
})();