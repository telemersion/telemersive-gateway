/**********************************************************

The creation of the remote peer list is a tricky task. Since 
a lot of asynchronous processes are involved, a lot of care 
needs to be taken to make sure, each task is only executed
once all the previous tasks have concluded.

the core function is update() - a function that is called many
times by different tasks and the remote peer abstractions once
they are done with their job.

***********************************************************/

var myval=0;
var myPeerList = new Dict("remotePeerList");;
var myPeerCount = 0;
var slots = [];
var isJoined = 0;

var myRoomName = "unkown";
var myRoomID = 0;

var slotResizer = null;
var mySlotHeight = 45;
var myLocalPeerSlotHeight = 60;
var myRootPatcher = null;

var myRootSize = null;
var myListHeight = 0;
var myExpandWidth = 500;

var myFlagHeight = true;
var myFlagWidth = false;

var myPeerList_IsUpdating = false;

var myPeerListToRemove = null;
var myPeerListToAdd = null;

var myPeerListToRemove_count = 0;
var myPeerListToAdd_count = 0;

var tgGlobals = new Global("tg_globals");
var ugVerbose = tgGlobals.verboseExecute;

if (jsarguments.length>1)
	myval = jsarguments[1];

function loadbang(){
    myPeerListToRemove = new Dict();
    myPeerListToAdd = new Dict();
    
    if(this.patcher.box != null){
    	//post("gathering information on the patcher hierarchy..\n");
        myRootPatcher = this.patcher.box.patcher;
        myRootSize = myRootPatcher.wind.size;        
    	//post("..myRootSize: " + myRootSize + "\n");
    }
}

function dpost(_post){
    if(ugVerbose){
        post("remotePeerList: " + _post + "\n");
    }
}

var prepareUpdater = null; //TASK variable

// TASK prepareUpdate 
function TASK_prepareUpdate()
{
    arguments.callee.task.cancel();
    arguments.callee.task.freepeer();
    dpost("start update from task...");
    myPeerList_IsUpdating = true;
    update();
}

function startPrepareUpdateTask(){
    // we start the perpare updater task if no updating is happening right now.
    if(!myPeerList_IsUpdating){
        dpost("... restart update Task.");
        if(prepareUpdater !== null && prepareUpdater.running){
            prepareUpdater.cancel();
        }
        prepareUpdater = new Task(TASK_prepareUpdate, this);
        prepareUpdater.schedule(100);        
    } else {
        dpost("... do not restart update Task: still updating...");
    }
}

// TASK Slot RESIZE 
function slotResize(_indxStart, _indxTarget, _maxStep)
{
    var iter = arguments.callee.task.iterations;
    if(iter <= _maxStep){
		resizeWinHeight(_indxStart * mySlotHeight + _indxTarget * mySlotHeight / _maxStep * iter );
    } else {
        arguments.callee.task.cancel();
        arguments.callee.task.freepeer();
    	dpost("   ... slot-resize animation done. go back to update...");
        update();
    }
}


function joined(_joined){
	if(isJoined !== _joined){
		isJoined = _joined;
		if(_joined == 0){
			dpost("local peer left room. cleaning up list of remote peers..");
            var keys = myPeerList.getkeys();
            if(keys != null){
                if(typeof(keys) == 'string'){
                    keys = [keys];
                }
                for(var i = 0; i < keys.length; i++){
                    var localPeer = myPeerList.get(keys[i]);
                    // this peer has gone
                    myPeerListToRemove.set(keys[i], localPeer);  
                }
            }
            startPrepareUpdateTask();
		}
	}
}

function roomName(_roomName){
    myRoomName = _roomName;
}

function roomID(_roomID){
    myRoomID = _roomID;
}

function remotePeerJoined(_peerName, _peerID, _peerLocalIPv4, _peerPublicIPv4){
    dpost("remote peer ("+_peerName+") joining");

    if(!myPeerList.contains(_peerID)){
        var localPeer = new Dict();
        localPeer.set("peerName", _peerName);
        localPeer.set("peerLocalIPv4", _peerLocalIPv4);
        localPeer.set("peerPublicIPv4", _peerPublicIPv4);
        myPeerListToAdd.set(_peerID, localPeer);  

        startPrepareUpdateTask();
    } else {
        dpost("... already joined peer ("+_peerName+")");
    }
}

function remotePeerLeft(_peerName, _peerID){
    dpost("remote peer ("+_peerName+") leaving");
    if(myPeerList.contains(_peerID)){
        var localPeer = new Dict();
        localPeer.set("peerName", _peerName);
        myPeerListToRemove.set(_peerID, localPeer);  
        
        startPrepareUpdateTask();
    } else {
        dpost("... unkonwn joined peer ("+_peerName+")");
    }
}

function update(){
    dpost("update remote peer list ...");

    var currentPeerCount = countDictKeys(myPeerList) + countDictKeys(myPeerListToAdd) - countDictKeys(myPeerListToRemove);
    
	// depending on the amount of peers, we will have to show the slider:
	if(currentPeerCount > 14){
		outlet(0, "hidden", 0);
	} else {
		outlet(0, "hidden", 1);
	}

    if(slotResizer == null || (slotResizer != null && !slotResizer.running)){
        if(myPeerCount != currentPeerCount){
            dpost("   ... start slot-resize animation ("+myPeerCount+" / " + currentPeerCount + ") ...\n");
            slotResizer = new Task(slotResize, this, myPeerCount, (currentPeerCount - myPeerCount), 10);
            slotResizer.interval = 33; // 30fps
            slotResizer.repeat(11);
            myPeerCount =  currentPeerCount;
            return;
        }
    }

    // first remove all the peers not verified
    var keys = myPeerListToRemove.getkeys();
    if(keys != null){
        dpost("   ... carry on removing peers...\n");
        if(typeof(keys) == 'string'){
            keys = [keys];
        }
        for(var i = 0; i < keys.length; i++){
            var localPeer = myPeerListToRemove.get(keys[i]);
            dpost("      ... remove remote peer: " + localPeer.get("peerName"));
            // this peer has gone
            removePeer(keys[i]);
            return; // peer is beeing removed and sends a 'done' message
        }
    }
    
    // update Slots with new peer
    var keys = myPeerListToAdd.getkeys();
    if(keys != null){
        dpost("   ... carry on adding peers...\n");
        if(typeof(keys) == 'string'){
            keys = [keys];
        }
        for(var i = 0; i < keys.length; i++){
            var localPeer = myPeerListToAdd.get(keys[i]);
            dpost("       ... add remote peer: " + localPeer.get("peerName"));
            createPeer(keys[i], localPeer);
            myPeerList.set(keys[i], localPeer);
            myPeerListToAdd.remove(keys[i]);
            return; // peer is beeing added and sends a 'done' message
        }
    }

    // update Slots with new peer
    slots.forEach(update_slots);

    myPeerList_IsUpdating = false;
    // once calling update() reaches this point, the update is truly done.
    dpost("... update done.\n");
}


function update_slots(_peerID, _index) {
    var localPeer = myPeerList.get(_peerID);
    messnamed("pl_" + _peerID, "slot", _index);
}

function createPeer(_peerID, _localPeer){
    slots.push(_peerID);

    this.patcher.remove(this.patcher.getnamed(_peerID));
    this.patcher.message(makeCreationMessage(_peerID, _localPeer));
}

function makeCreationMessage(_peerID, _localPeer){
    var slotIndex = slots.indexOf(_peerID)
	var msp = new Array();
	msp.push("script");
	msp.push("newobject");
	msp.push("bpatcher");
    msp.push("tg.Peer.maxpat");
    msp.push("@presentation_rect");
	msp.push(1220);
	msp.push(slotIndex * mySlotHeight);
	msp.push(1220);
	msp.push(mySlotHeight);
	msp.push("@varname");
	msp.push(_peerID);
	msp.push("@presentation");
	msp.push(1);
	msp.push("@args");
	msp.push("remote");
	msp.push(slotIndex);
	msp.push(_peerID);
	msp.push(_localPeer.get("peerName"));
	msp.push(_localPeer.get("peerLocalIPv4"));
	msp.push(_localPeer.get("peerPublicIPv4"));
	msp.push(myRoomName);
	msp.push(myRoomID);
    //dpost("makeCreationMessage() " + msp + "\n");
	return msp;
}


function removePeer(_peerID){
    // remove the abstraction
    messnamed("pl_" + _peerID, "remove");
    // remove the db entry
    myPeerList.remove(_peerID);
    myPeerListToRemove.remove(_peerID);
    // remove the slot
    slots.splice(slots.indexOf(_peerID), 1);
}

/********************* General Functions ******************/

// my rootheight depending on beeing joined or not
function getMyRootHeight(){
	//post("getMyRootHeight: isJoined " + isJoined + "\n");
	var joinedHeight = (isJoined)?myLocalPeerSlotHeight:0;
	return myRootSize[1] + joinedHeight;
}

function expand(_flagHeight, _flagWidth){
	myFlagHeight = (_flagHeight == 1)?true:false;
	myFlagWidth = (_flagWidth == 1)?true:false;
	applyWindowSize();
}

function resizeWinHeight(_height){
	myListHeight = _height;
	applyWindowSize();
}

function applyWindowSize(){
	myRootPatcher.wind.size = [(myFlagWidth)?myRootSize[0] + myExpandWidth: myRootSize[0], (myFlagHeight)?getMyRootHeight() + myListHeight:getMyRootHeight()];
	//post("done: applyWindowSize " + getMyRootHeight() + "\n");
}

function countDictKeys(_dict){
    var _counter
    if(_dict.getkeys() != null){
        if(typeof(_dict.getkeys()) == 'string'){
            _counter = 1;
        } else {
            _counter = _dict.getkeys().length;
        }
    } else {
        return 0;
    }
    return _counter;
}


function anything()
{
	//var a = arrayfromargs(messagename, arguments);
	//post("received message " + a + "\n");
	//myval = a;
	//bang();
}
