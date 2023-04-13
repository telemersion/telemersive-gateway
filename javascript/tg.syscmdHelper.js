outlets = 1;

var myIndex=0;
var myPath = null;
var myCommands = null;

var myOS = null;
var myTitle = null;

if (jsarguments.length>2){
	myIndex = jsarguments[1];
	myTitle = jsarguments[2] + " " + myIndex;
} else {
	post('Error: missing arguments!\n')
}

function loadbang(){
	bang();
}

function ignore(){
	// do just that
}

function bang(){
	myOS = this.max.os;
	//post("os:" + myOS + '\n' );
}

function start(){
	var a = arrayfromargs(arguments);
	myPath = a.shift();
	myCommands = a;

    for(var i = 1; i < myCommands.length; i++){
        if((typeof myCommands[i]) === 'string'){
			// remove all the ' - characters from strings.
			myCommands[i] = myCommands[i].replace(/'+/g, "");
        }
    }

    outlet(0, "args", myPath, myCommands);
    outlet(0, "start");
}

function stop(){
	outlet(0, 'stop');
}

function notifydeleted(){
	stop();
}
