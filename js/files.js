/**
 * [...]  
 * @author  Viet Pham
 * @version 1.0, 17/10/27
 * @since   
 */
var file = {
	
	_logContents : [],

	exportLog : function(){
		// var element = document.createElement('a');
		//   element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("text"));
		//   element.setAttribute('download', "dkm.csv");

		//   element.style.display = 'none';
		//   document.body.appendChild(element);

		//   element.click();

		//   document.body.removeChild(element);
		
	},

	actionDetectLog : function(){

	},
	warningStartLog : function(time){
		console.log(time);
	},
	warningEndLog : function(){},
	warningLog : function(){},
	maxSize : function(){},

	run : function(){
		file.exportLog();
	}
}