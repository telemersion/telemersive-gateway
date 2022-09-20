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
	//post("os:" + myOS + '\n' );
}


function loadbang(){
	bang();
}

function testRunning(){
	if(myOS === 'windows'){
		outlet(1, 'tasklist', '/NH', '/FI', 'imagename eq '+ myWinTask);
		runningFeedback = true;
	}
}

function pkill(){
	if(isRunning){
		outlet(2, 'pkill');
		if(myOS === 'windows'){
			outlet(1, 'taskkill', '/IM', myWinTask, '/F');
			del();
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
		myWinPath = myPath.replace(/\//g, '\\\\');
		//post("myWinPath = " + myWinPath + "\n");
		myNewPath = myWinPath.replace('.exe', '_tb' + myIndex + '.exe');
		//post("myNewPath = " + myNewPath + "\n");
		myPath = myPath.replace('.exe', '_tb' + myIndex + '.exe');
		//post("myPath.replace = " + myPath + "\n");
		myWinTask = myPath.substring(myPath.lastIndexOf('/') + 1);
		// on windows we have to replace apostrophes with quotation marks:
		for(var i = 0; i < myCommands.length; i++){
            if((typeof myCommands[i]) === 'string'){
                myCommands[i] = myCommands[i].replace(/'/g, '"');
            }
		}
		// post("myWinTask = " + myWinTask);
		testRunning();
	} else {
		execute();
	}

	//post("my window path " + myWinPath + "\n");
}

function del(){
	if(myOS === 'windows' && myNewPath != null){
		outlet(0, "del", myNewPath);
	}
}

function copy(){
	if(myOS === 'windows' && myNewPath != null){
		copyFeedback = true;
		outlet(0, "copy",  myWinPath, myNewPath);
	}
}

function Exit(){
	del();
}
	
function anything()
{
	if(copyFeedback){
		execute();
		copyFeedback = false;
	} else if(runningFeedback){
		if(messagename === myWinTask){
			// -> task is already running - need to kill..
			post("found running task: " + myWinTask + ". Killing it...\n");
			outlet(1, 'taskkill', '/IM', myWinTask, '/F');
		}
		copy();
		runningFeedback = false;
	} 
}

function ignore(){
    ;
}
