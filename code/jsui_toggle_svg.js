mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

var g_icon_off;
var g_icon_on;

var myToggle = 0;
var myScale = 1.

var myOffset = [0., 0.];

declareattribute("offset","getmyOffset","setmyOffset");


// process arguments
if (jsarguments.length>1)
	g_icon_off = new MGraphicsSVG(jsarguments[1]);	
if (jsarguments.length>2)
	g_icon_on = new MGraphicsSVG(jsarguments[2]);	

onresize();

function bang()
{
    mgraphics.redraw();
	outlet(0, myToggle);
}

function paint()
{
 	gc();
	
    mgraphics.translate(myOffset);
    mgraphics.scale(myScale, myScale);
    mgraphics.svg_render((myToggle == 0)?g_icon_off:g_icon_on);
}

function onclick()
{
	myToggle = 1 - myToggle;
	notifyclients();
	bang();
}
onclick.local = 1; //private

function onresize()
{
	myScale = Math.min(this.box.rect[2] - this.box.rect[0], this.box.rect[3] - this.box.rect[1]) / Math.max(g_icon_on.size[0],g_icon_on.size[1]); 
}
onresize.local = 1;

function getvalueof () { 
	return myToggle 
}
	
function setvalueof (val) {
    myToggle = val;
    bang();
}

function setmyOffset(posX, posY){
	myOffset = [posX, posY];
}

function getmyOffset(){
	return myOffset;
}
