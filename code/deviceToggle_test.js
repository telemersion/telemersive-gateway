mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

var g_icon_off;
var g_icon_on;

var myToggle = 0;
var myScale = 1.

// process arguments
if (jsarguments.length>1)
	g_icon_off = new MGraphicsSVG(jsarguments[1]);	
if (jsarguments.length>2)
	g_icon_on = new MGraphicsSVG(jsarguments[2]);	

onresize();

function bang()
{
	myToggle = 1 - myToggle;
    mgraphics.redraw();
	notifyclients();
}

function paint()
{
 	gc();
	
    mgraphics.translate(3,1);
    mgraphics.scale(myScale, myScale);
    mgraphics.svg_render((myToggle == 0)?g_icon_off:g_icon_on);
}

function onclick()
{
	bang();
	outlet(0, myToggle);
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
}