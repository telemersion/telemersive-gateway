// set up inlets/outlets/assist strings
inlets = 1;
outlets = 1;

var OUTLET_THISPATCHER = 0;

var myUberPatcher;

var mySlotSize = 45;

var myPeerName = null;
var myPeerID = null;
var mySlotIndex = -1;

var taskMover = null;

function done(){
    init();
}

function init(){
//	myNodeVarName = getKeyValuefromDB(myNodeName, "_conn.id");
	post("init peer..("+myPeerName+") \n");
	initNodeSpace();
	post("...init("+myPeerName+") done\n");
}

/**********************
  Init Functions
 **********************/

function peerName(_peerName){
	myPeerName = _peerName;
}

function peerID(_peerID){
	myPeerID = _peerID;
}

function slot(_index){
	if(mySlotIndex == -1){
        mySlotIndex = _index;
        post("..start creation animation..("+myPeerName+") \n");
		// start creation animation
        taskMover = new Task(creaMover, this, 720, 0, 20);
        taskMover.interval = 33; // 60fps
        taskMover.repeat(21);
	}
	if(mySlotIndex != _index){
        post("..start reshuffle animation..("+myPeerName+") \n");
		// start reshuflle animation
        taskMover = new Task(shuffleMover, this, mySlotIndex, _index, 20);
        taskMover.interval = 33; // 60fps
        taskMover.repeat(21);
        mySlotIndex = _index;
	}
}

function remove(){
    post("..start remove animation..("+myPeerName+") \n");
    // remove abstraction
    taskMover = new Task(reMover, this, 0, 720, 20);
    taskMover.interval = 33; // 60fps
    taskMover.repeat(21);
    outlet(0, "peerJoined", 0);
}

function shuffleMover(_indxStart, _indxTarget, _maxStep)
{
    var iter = arguments.callee.task.iterations;
    if(iter <= _maxStep){
        myUberPatcher.message("script", "sendbox", myPeerID, "presentation_position", 0, (_indxStart + (_indxTarget - _indxStart)/_maxStep * iter) * mySlotSize);
    } else {
        arguments.callee.task.cancel();
    }
}

function creaMover(_indxStart, _indxTarget, _maxStep)
{
    var iter = arguments.callee.task.iterations;
    if(iter <= _maxStep){
        myUberPatcher.message("script", "sendbox", myPeerID, "presentation_position", _indxStart + (_indxTarget - _indxStart)/_maxStep * iter, mySlotIndex * mySlotSize);
    } else {
        arguments.callee.task.cancel();
    }
}

function reMover(_indxStart, _indxTarget, _maxStep)
{
    var iter = arguments.callee.task.iterations;
    if(iter <= _maxStep){
        myUberPatcher.message("script", "sendbox", myPeerID, "presentation_position", _indxStart + (_indxTarget - _indxStart)/_maxStep * iter, mySlotIndex * mySlotSize);
    } else {
        arguments.callee.task.cancel();
        myUberPatcher.remove(myUberPatcher.getnamed(myPeerID));
    }
}

/* recursively gets the the parents patcher information
*/
function initNodeSpace(){
    if(this.patcher.box.patcher.box != null){
        myUberPatcher = this.patcher.box.patcher.box.patcher;
    }
}

function anything(){
    // ignore everything else
}