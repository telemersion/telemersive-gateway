var posX;
var posY;
var myWidth;
var myHeight;

if (jsarguments.length == 5){
	posX = jsarguments[1];
	posY = jsarguments[2];
	myWidth = jsarguments[3];
	myHeight = jsarguments[4];
}

function resizeBox() {
	this.patcher.box.varname = "bp_" + Math.random()*10000;
	this.patcher.parentpatcher.message("script", "sendbox", this.patcher.box.varname, "patching_size", myWidth, myHeight);
	this.patcher.box.varname = "";
}

function resizeWin() {
	this.patcher.box.varname = "bp_" + Math.random()*10000;
	this.patcher.wind.location = [posX, posY, posX + myWidth, posY + myHeight];
	this.patcher.box.varname = "";
}
