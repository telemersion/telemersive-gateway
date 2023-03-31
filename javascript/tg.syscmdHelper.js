outlets = 3;

var myIndex=0;
var myPath = null;
var myCommands = null;
var myWinPath = null;
var myNewPath = null;
var myWinTask = null;
var myOS = null;
var myTitle = null;

var myPortNumber = null;
var OSXProcessID = null;

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
	post("os:" + myOS + '\n' );
}


function loadbang(){
	bang();
}

function pkill(){
	outlet(2, 'stop');
}

function notifydeleted(){
	pkill();
}

function execute(){
	//post("execute: " + myCommands + "\n");
    
    if(myOS === 'windows'){
        outlet(2, '"', myPath, myCommands, '"');
	   //outlet(0, 'start', myTitle, '/min',  myCommands);
    } else {
        outlet(2, myPath, myCommands);
    }
	isRunning = true;
}

function start(_path, _cli){
	myCommands = _cli.split(" ");

    for(var i = 1; i < myCommands.length; i++){
        if((typeof myCommands[i]) === 'string'){
            if(myCommands[i].indexOf("-P") == 0){
                myPortNumber = myCommands[i];
            }
        }
    }

	myPath = _path;

	if(myOS === 'windows'){
		//post("myPath = " + myPath + "\n");
		myPath = myPath.replace(/\\/g, '/');
		//myPath = myPath + '\\ ';
		//post("myPath = " + myPath + "\n");
		// on windows we have to replace apostrophes with quotation marks:
		for(var i = 0; i < myCommands.length; i++){
            if((typeof myCommands[i]) === 'string'){
                myCommands[i] = myCommands[i].replace(/'/g, '\"');
            }
		}
		// post("myWinTask = " + myWinTask);
	}
	
	execute();

	//post("my window path " + myWinPath + "\n");
}

function execute(){
	post("execute: " + myCommands + "\n");
	
	stringCommand = '';
	for(var i = 0; i < myCommands.length; i++){
		stringCommand += " " + myCommands[i];
	}
    
    if(myOS === 'windows'){
        outlet(0, 'cmd', '\\"'+ myPath + '\\"' + stringCommand);
        //outlet(1, 'cmd', myPath + '\\"' + myCommands + " ");
    } else {
        outlet(0, myPath, myCommands);
    }
	isRunning = true;
}

	