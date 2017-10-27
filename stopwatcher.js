var stopWatcher = {

	_stopWatcher : "",
	_milliSeconds : 0,
	_seconds : 0,
	_minutes : 0,
	_hours : 0,
	_btStage : 0,
	stopWatcher: function() {
        var btStart = document.getElementById("btStart");
        var btStop = document.getElementById("btStop");        
        btStart.addEventListener("click", function() {
           stopWatcher._stopWatcher = setInterval(function() {
                stopWatcher.timeRun();
                stopWatcher.displayStopWatcher();
                stopWatcher._btStage = 1;
                stopWatcher.changeStage();
            }, 100);
        });
        btStop.addEventListener("click", function() {
            clearInterval(stopWatcher._stopWatcher);
            	stopWatcher._btStage = 0;
                stopWatcher.changeStage();
        });
    },

    timeRun: function() {
        this._milliSeconds++;
        if(this._milliSeconds>=10){
        	this._milliSeconds = 0;
        	this._seconds++;
        	if(this._seconds>=60){
        		this._seconds = 0;
        		this._minutes++;
        		if(this._minutes>=60){
        			this._minutes = 0;
        			this._hours++;
        		}
        	}
        }        
    },

    clear: function() {
    	var btClear = document.getElementById("btClear");
    	btClear.addEventListener("click",function(){
    		stopWatcher._milliSeconds = stopWatcher._seconds = stopWatcher._minutes = stopWatcher._hours = 0;
    		stopWatcher.displayStopWatcher();    		
    	});
    },
    check: function() {
    	var elementById = "";
    	var order = 1;
    	var btCheck = document.getElementById("btCheck");
    	
    	var parent = document.getElementById("time_checked");
    		
    	btCheck.addEventListener("click",function(){
    		if(order>3){
    			order = 1;
    		}
    		elementById = document.getElementById("timeChecked_"+order);		
    		stopWatcher.displayStopWatcher(elementById);    		
    		order++;
    		stopWatcher.reOrderCheckedTime(parent);
    	});    	
    },
    displayStopWatcher : function(id){
      	var elementById = "";
    	if(id === undefined && !id){
    		elementById = document.getElementById("stop_watcher_time");
    	}else{
    		elementById = id;
    	}
    	elementById.innerHTML =
                this.timeFormat(stopWatcher._hours)+":"
                +this.timeFormat(stopWatcher._minutes)+":"
                +this.timeFormat(stopWatcher._seconds)+":"
                +this.timeFormat(stopWatcher._milliSeconds);
    },
    timeFormat : function(time){
    	return ("00"+time).slice(-2);
    },
    changeStage : function(){
    	var btClear = document.getElementById("btClear");
    	var btCheck = document.getElementById("btCheck");
    	if(this._btStage){
    		btClear.setAttribute("hidden","hidden");
    		btCheck.removeAttribute("hidden","hidden");    		
    	}else{
    		btCheck.setAttribute("hidden","hidden");
    		btClear.removeAttribute("hidden","hidden");    		
    	}
    },
    reOrderCheckedTime : function(list){
    	var switching, b, shouldSwitch;		  
		  switching = true;

		  while (switching) {		   
		    switching = false;
		    b = list.getElementsByTagName("LI");
		    
		    for (var i = 0; i < (b.length - 1); i++) {		   
		      shouldSwitch = false;
		      
		      if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {		       
		        shouldSwitch= true;
		        break;
		      }
		    }
		    if (shouldSwitch) {		  
		      b[i].parentNode.insertBefore(b[i + 1], b[i]);
		      switching = true;
		    }
  }
    },
    run : function(){
		stopWatcher.stopWatcher();
		stopWatcher.clear();
		stopWatcher.check(); 	
    },
};
stopWatcher.run();