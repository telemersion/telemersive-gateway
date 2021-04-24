// set up inlets/outlets/assist strings
inlets = 1;
outlets = 1;

var OUTLET_THISPATCHER = 0;

var myUberPatcher;

var mySlotSize = 45;

var myPeerName = null;
var myPeerID = null;
var myRoomName = null;
var myRoomID = null;
var myPeerPublicIP = null;
var myPeerLocalIP = null;

var mySlotIndex = -1;

var taskMover = null;

function dpost(_post){
	post("peer("+myPeerName+"): " + _post + "\n");
}

function done(){
    init();
}

/**********************
  Init Functions
 **********************/

function init(){
//	myNodeVarName = getKeyValuefromDB(myNodeName, "_conn.id");
	if(myPeerName !== null){
		initNodeSpace();
	}		
}

/* recursively gets the the parents patcher information
*/
function initNodeSpace(){
    if(this.patcher.box.patcher.box != null){
        myUberPatcher = this.patcher.box.patcher.box.patcher;
    }
}

function peerJoined(_peerJoined){
   	outlet(0, "peerJoined", _peerJoined);
}

function peerName(_peerName){
	if(myPeerName !== _peerName){		
		myPeerName = _peerName;
   		outlet(0, "peerName", myPeerName);
	}
}

function peerID(_peerID){
	if(myPeerID !== _peerID){		
		myPeerID = _peerID;
    	outlet(0, "peerID", myPeerID);
	}
}

function peerLocalIP(_peerLocalIP){
	if(myPeerLocalIP !== _peerLocalIP){
		myPeerLocalIP = _peerLocalIP;
    	outlet(0, "peerLocalIPv4", myPeerLocalIP);
	}
}

function peerPublicIP(_peerPublicIP){
	if(myPeerPublicIP !== _peerPublicIP){
		myPeerPublicIP = _peerPublicIP;
    	outlet(0, "peerPublicIP", myPeerPublicIP);
	}
}

function roomName(_roomName){
	if(myRoomName !== _roomName){
		myRoomName = _roomName;
    	outlet(0, "roomName", myRoomName);
	}
}

function roomID(_roomID){
	if(myRoomID !== _roomID){
		myRoomID = _roomID;
    	outlet(0, "roomID", myRoomID);
	}
}

function slot(_index){
	if(mySlotIndex == -1){
        mySlotIndex = _index;
        dpost("start creation animation...");
		// start creation animation
        taskMover = new Task(creaMover, this, 720, 0, 20);
        taskMover.interval = 33; // 60fps
        taskMover.repeat(21);
	}
	if(mySlotIndex != _index){
        dpost("start reshuffle animation...");
		// start reshuflle animation
        taskMover = new Task(shuffleMover, this, mySlotIndex, _index, 20);
        taskMover.interval = 33; // 60fps
        taskMover.repeat(21);
        mySlotIndex = _index;
	}
}

function remove(){
    dpost("start remove animation... \n");
    // remove abstraction
    outlet(0, "peerJoined", 0);
    taskMover = new Task(reMover, this, 0, 720, 20);
    taskMover.interval = 33; // 60fps
    taskMover.repeat(21);
}

function shuffleMover(_indxStart, _indxTarget, _maxStep)
{
    var iter = arguments.callee.task.iterations;
    if(iter <= _maxStep){
        myUberPatcher.message("script", "sendbox", myPeerID, "presentation_position", 0, (_indxStart + (_indxTarget - _indxStart)/_maxStep * iter) * mySlotSize);
    } else {
        arguments.callee.task.cancel();
    	dpost("... reshuffle animation done.");
		messnamed("peerManager", "done");
    }
}

function creaMover(_indxStart, _indxTarget, _maxStep)
{
    var iter = arguments.callee.task.iterations;
    if(iter <= _maxStep){
        myUberPatcher.message("script", "sendbox", myPeerID, "presentation_position", _indxStart + (_indxTarget - _indxStart)/_maxStep * iter, mySlotIndex * mySlotSize);
    } else {
        arguments.callee.task.cancel();
    	dpost("... creation animation done.");
    	outlet(0, "peerJoined", 1);
		messnamed("peerManager", "done");
    }
}

function reMover(_indxStart, _indxTarget, _maxStep)
{
    var iter = arguments.callee.task.iterations;
    if(iter <= _maxStep){
        myUberPatcher.message("script", "sendbox", myPeerID, "presentation_position", _indxStart + (_indxTarget - _indxStart)/_maxStep * iter, mySlotIndex * mySlotSize);
    } else {
        arguments.callee.task.cancel();
    	dpost("... remove animation done.");
		messnamed("peerManager", "done");
        myUberPatcher.remove(myUberPatcher.getnamed(myPeerID));
    }
}

function anything(){
    // ignore everything else
}