/**
 * [...]  
 * @author  Viet Pham
 * @version 1.0, 18/05/18
 * @since   
 */

 var draggable = {

 	_pos1 : 0,

	_pos2 : 0,

	_pos3 : 0,

	_pos4 : 0,

	_targetId : null,


 	drag : function(targetId){
 		this._targetId = document.getElementById(targetId);console.log(this._targetId);
 		if (document.getElementById("titleBox")) {
 			/* if present, the header is where you move the DIV from:*/
 			document.getElementById("titleBox").onmousedown = draggable.dragMouseDown;
 		}else{
 			/* otherwise, move the DIV from anywhere inside the DIV:*/
 			this._targetId.onmousedown = draggable.dragMouseDown;
 		}
 	},

 	dragMouseDown : function(e){
 		// console.log("dragMouseDown START");
 		e = e || window.event;
 		// get the mouse cursor position at startup:
 		this._pos3 = e.clientX;
 		this._pos4 = e.clientY;

 		document.onmouseup  = draggable.closeDragElement;
 		// call a function whenever the cursor moves:
 		document.onmousemove = draggable.elementDrag;
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
	    console.log(draggable._targetId.offsetTop);
	    console.log(draggable._targetId.offsetLeft);
	    draggable._targetId.style.top = (draggable._targetId.offsetTop - this._pos2) + "px";
	    draggable._targetId.style.left = (draggable._targetId.offsetLeft - this._pos1) + "px";
 		// console.log("elementDrag END");
 	},

 	closeDragElement : function(e){
 		 /* stop moving when mouse button is released:*/
 		document.onmouseup  = null;
 		document.onmousemove = null;
 	}
 }