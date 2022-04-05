mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

var g_icon;
var defaultColor = [0., 0., 0., 1.];
var myval = 0;

var pressColor = [1., 0., 0., 1.]
var releaseColor = [0., 1., 0., 1.]

// process arguments
if (jsarguments.length>1)
	g_icon = new MGraphicsSVG(jsarguments[1]);	
	
function bang()
{
	myval = 1 - myval; // toggle 0/1
    mgraphics.redraw();
}

function paint()
{
 	gc(),

	g_icon.mapcolor(defaultColor, (myval == 0)?releaseColor:pressColor);

    mgraphics.translate(1,1);
    mgraphics.scale(1.,1.);
    mgraphics.svg_render(g_icon);
}

function onclick()
{
	bang();
	outlet(0, myval);
}
onclick.local = 1; //private
