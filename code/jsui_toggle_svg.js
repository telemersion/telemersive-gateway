// Created my maybites.ch (2021) - License: Free to use and hack. happy patching.

mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

var g_icon_off;
var g_icon_on;

var myToggle = 0;
var myScale = 1.

var myOffset = [0., 0.];

var hasResized = true;
var presentation = 0;

declareattribute("offset","getmyOffset","setmyOffset");

// listeners on the rect values to keep track on changes 
// 	reason: onresize() is not working in presentation mode

var l1 = new MaxobjListener(this, "patching_rect", rect_changed);
var l2 = new MaxobjListener(this, "presentation_rect", rect_changed);

// process arguments
if (jsarguments.length>1)
	g_icon_off = new MGraphicsSVG(jsarguments[1]);	
if (jsarguments.length>2)
	g_icon_on = new MGraphicsSVG(jsarguments[2]);	

rescale();

// updating the gui and output.
function bang()
{
    mgraphics.redraw();
	outlet(0, myToggle);
}

function msg_int(value){
	setvalueof(value);
}

// drawing function
function paint()
{
	gc();
 	check_mode();	
	rescale();
	
    mgraphics.translate(myOffset);
    mgraphics.scale(myScale, myScale);
    mgraphics.svg_render((myToggle == 0)?g_icon_off:g_icon_on);
}

// wating for a mouseclick
function onclick()
{
	myToggle = 1 - myToggle;
	notifyclients();
	bang();
}
onclick.local = 1; //private

// called by rect listeners
function rect_changed(data){
	hasResized = true;
}

// check presentation mode
function check_mode(){
	if(presentation != this.patcher.getattr("presentation")){
		presentation = this.patcher.getattr("presentation");
		hasResized = true;
	}
}

// calculate new scale depending on mode 
function rescale()
{
	if(hasResized){	
		var boxRect = this.box.getattr("patching_rect");
		if(presentation){
			boxRect = this.box.getattr("presentation_rect");
		}
	
		myScale = Math.min(boxRect[2], boxRect[3]) / Math.max(g_icon_on.size[0],g_icon_on.size[1]); 
	}
	hasResized = false;
}

// get function for pattr system
function getvalueof () { 
	return myToggle 
}

// set function for pattr sysemt
function setvalueof (val) {
    myToggle = val;
    bang();
}

// attribute setter
function setmyOffset(posX, posY){
	myOffset = [posX, posY];
}

//attribute getter
function getmyOffset(){
	return myOffset;
}
