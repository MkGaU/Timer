/**
 * [...]  
 * @author  Viet Pham
 * @version 1.0, 18/05/18
 * @since   
 */

 var Coordinate = {

 	_pos1 : 0,

	_pos2 : 0,

	_pos3 : 0,

	_pos4 : 0,

	_currentPos : [], //fisrt item is top pos, second is left pos

	_targetId : null,


 	drag : function(){

 		if (document.getElementById("titleBox")) {
 			/* if present, the header is where you move the DIV from:*/
 			document.getElementById("titleBox").onmousedown = Coordinate.dragMouseDown;
 		}else{
 			/* otherwise, move the DIV from anywhere inside the DIV:*/
 			this._targetId.onmousedown = Coordinate.dragMouseDown;
 		}
 	},

 	dragMouseDown : function(e){
 		// console.log("dragMouseDown START");
 		e = e || window.event;
 		// get the mouse cursor position at startup:
 		this._pos3 = e.clientX;
 		this._pos4 = e.clientY;

 		document.onmouseup  = Coordinate.closeDragElement;
 		// call a function whenever the cursor moves:
 		document.onmousemove = Coordinate.elementDrag;
 		// console.log("dragMouseDown END");
 	},


 	elementDrag : function(e){
 		// console.log("elementDrag START");
 		e = e || window.event;
	    // calculate the new cursor position:
	    this._pos1 = this._pos3 - e.clientX;
	    this._pos2 = this._pos4 - e.clientY;
	    this._pos3 = e.clientX;
	    this._pos4 = e.clientY;
	    // set the element's new position:
	    Coordinate._currentPos[0] = Coordinate._targetId.offsetTop - this._pos2;
	    Coordinate._currentPos[1] = Coordinate._targetId.offsetLeft - this._pos1;
	    Coordinate._targetId.style.top = Coordinate._currentPos[0] + "px";
	    Coordinate._targetId.style.left = Coordinate._currentPos[1] + "px";
 		// console.log("elementDrag END");
 	},

 	closeDragElement : function(e){
 		 /* stop moving when mouse button is released:*/
 		document.onmouseup  = null;
 		document.onmousemove = null;
 	},

 	minimize : function(){
		var btnMinimize = document.getElementById("minimize");
		btnMinimize.onmousedown = Coordinate.dragMouseDown;
		btnMinimize.addEventListener("click",function(){
			var step = 0;
			var run = setInterval(function(){
			if(step == 100){
				clearInterval(run);				
			}else{
				step+=20;
				Coordinate._targetId.style.top = step + "%";
	    		Coordinate._targetId.style.left = step + "%";
			}
		},10);
			document.getElementById("minimize_box").style.display = "block";
		});
			
 	},
 	maximize : function(){
		var btnMaximize = document.getElementById("maximize");
		btnMaximize.addEventListener("click",function(){
			Coordinate._targetId.style.top = Coordinate._currentPos[0] + "px";
	    	Coordinate._targetId.style.left = Coordinate._currentPos[1] + "px";
			document.getElementById("minimize_box").style.display = "none";
		});
 	},

 	run : function(targetId){
 		this._targetId = document.getElementById(targetId);
 		// set default position
 		Coordinate._currentPos[0] = Coordinate._targetId.offsetTop;
 		Coordinate._currentPos[1] = Coordinate._targetId.offsetLeft;
 		this.drag();
 		this.minimize();
 		this.maximize();
 	}
 }