outlets = 2;

var myIndex=0;
var myPath = null;
var myCommands = null;
var myWinPath = null;
var myWinTask = null;
var myOS = null;
var myTitle = null;

var copyFeedback = false;
var runningFeedback = false;

var isRunning = false;

if (jsarguments.length>2){
	myIndex = jsarguments[1];
	myTitle = jsarguments[2] + " " + myIndex;
} else {
	post('Error: missing arguments!\n')
}

function bang(){
	myOS = this.max.os;
	//post("os:" + myOS + '\n' );
}


function loadbang(){
	bang();
}

function testRunning(){
	if(myOS === 'windows'){
		post('test running : ' + myTitle + ' \n');
		outlet(1, 'tasklist', '/FI', 'WINDOWTITLE eq '+ myTitle, '/NH');
		runningFeedback = true;
	}
}

function pkill(){
	if(isRunning){
		outlet(1, 'pkill');
		if(myOS === 'windows'){
			outlet(1, 'taskkill', '/FI', 'WINDOWTITLE eq '+ myTitle, '/T', '/F');
		}
		isRunning = false;
	}
}

function notifydeleted(){
	pkill();
}

function execute(){
	//post("execute: " + myCommands + "\n");
	if(myOS === 'windows'){
	   outlet(0, 'start', myTitle, '/min',  myCommands);
    } else {
	   outlet(0, myCommands);
    }
	isRunning = true;
}

function start(){
	myCommands = arrayfromargs(arguments);

	myPath = myCommands[0];

	if(myOS === 'windows'){
		myWinPath = myPath.replace(/\//g, '\\\\');
		myWinTask = myCommands[0].substring(myCommands[0].lastIndexOf('/') + 1);
		// on windows we have to replace apostrophes with quotation marks:
		for(var i = 1; i < myCommands.length; i++){
            if((typeof myCommands[i]) === 'string'){
                myCommands[i] = myCommands[i].replace(/'/g, '"');
            }
		}
		//post("myWinTask = " + myWinTask);
		testRunning();
	} else {
		execute();
	}

	//post("my window path " + myWinPath + "\n");
}


function anything()
{
	var a = arrayfromargs(messagename, arguments);
	if(copyFeedback){
		execute();
		copyFeedback = false;
	} else if(runningFeedback){
		if(a[0] === myWinTask){
			// -> task is already running - need to kill..
			post("found running task: " + myWinTask + ". Killing it...\n");
			pkill();
		} else {
			//post("found no running task: " + myWinTask + ".\n");
		}
		runningFeedback = false;
		execute();
	} else {
	}
}

function ignore(){
    ;
}
