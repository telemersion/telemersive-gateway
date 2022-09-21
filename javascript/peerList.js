
var myval=0;
var myPeerList = new Dict("remotePeerList");;
var myPeerCount = 0;
var slots = [];
var isJoined = 0;

var myRoomName = "unkown";
var myRoomID = 0;

var slotResizer = null;
var mySlotHeight = 45;
var myRootPatcher = null;

var myRootSize = null;
var myListHeight = 0;
var myExpandWidth = 500;

var myFlagHeight = true;
var myFlagWidth = false;

if (jsarguments.length>1)
	myval = jsarguments[1];

function loadbang(){
    if(this.patcher.box != null){
    	//post("gathering information on the patcher hierarchy..\n");
        myRootPatcher = this.patcher.box.patcher;
        myRootSize = myRootPatcher.wind.size;        
    }
}

function dpost(_post){
	//post("peerList: " + _post + "\n");
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
	// a circumvental way to set the new size, since to set the size directly causes errors..
	var loc = myRootPatcher.wind.location;
    var newsize = [(myFlagWidth)?myRootSize[0] + myExpandWidth: myRootSize[0], (myFlagHeight)?myRootSize[1] + myListHeight:myRootSize[1]];
   	myRootPatcher.wind.setlocation(loc[0, loc[1], loc[2] + newsize[0], loc[3] + newsize[1]]);
	//myRootPatcher.wind.size = [(myFlagWidth)?myRootSize[0] + myExpandWidth: myRootSize[0], (myFlagHeight)?myRootSize[1] + myListHeight:myRootSize[1]];
	//post("done: applyWindowSize\n");
}

function slotResize(_indxStart, _indxTarget, _maxStep)
{
    var iter = arguments.callee.task.iterations;
    if(iter <= _maxStep){
		resizeWinHeight(_indxStart * mySlotHeight + _indxTarget * mySlotHeight / _maxStep * iter );
    } else {
        arguments.callee.task.cancel();
        arguments.callee.task.freepeer();
    	dpost("... slot-resize animation done.");
    }
}


function joined(_joined){
	if(isJoined !== _joined){
		isJoined = _joined;
		if(_joined == 0){
			dpost("local peer left room. cleaning up list of remote peers..");
			//clear();
			//done();
		}
	}
}

function roomName(_roomName){
    myRoomName = _roomName;
}

function roomID(_roomID){
    myRoomID = _roomID;
}

// on a peer update this is the first message
function clear()
{
    // first mark all remote peers of not beeing verified
    var keys = myPeerList.getkeys();
    if(keys != null){
        if(typeof(keys) == 'string'){
            keys = [keys];
        }
        for(var i = 0; i < keys.length; i++){
            var localPeer = myPeerList.get(keys[i]);
			if(localPeer.get("verified") !== 3){
            	localPeer.set("verified", 0);
            	myPeerList.set(keys[i], localPeer);
			}
        }
    }
}

// next we get all the current peers sequentially
function append(_peerName, _peerID, _peerLocalIPv4, _peerPublicIPv4)
{
   // first test if the peerID is already existing
    if(myPeerList.contains(_peerID)){
       // we make a sanity check if nothing has changed
        var localPeer = myPeerList.get(_peerID);
		if(localPeer.get("verified") !== 3){
        	localPeer.set("verified", 1); // this indicates an existing peer
        	myPeerList.set(_peerID, localPeer);
		}
    }
    // since in the last step a peer might have been removed because of a change we test again
    if(!myPeerList.contains(_peerID)){
 		dpost("append peer ("+_peerName+")");

        var localPeer = new Dict();
        localPeer.set("peerName", _peerName);
        localPeer.set("peerLocalIPv4", _peerLocalIPv4);
        localPeer.set("peerPublicIPv4", _peerPublicIPv4);
        localPeer.set("verified", 3); // this indicates a new peer
        myPeerList.set(_peerID, localPeer);
    }
}

// once we got all the peer info, we can create, rearrange, cleanup
function done()
{
    var currentPeerCount = 0;
    if(myPeerList.getkeys() != null){
        if(typeof(myPeerList.getkeys()) == 'string'){
            currentPeerCount = 1;
        } else {
            currentPeerCount = myPeerList.getkeys().length;
        }
    }
	// depending on the amount of peers, we will have to show the slider:
	if(currentPeerCount > 14){
		outlet(0, "hidden", 0);
	} else {
		outlet(0, "hidden", 1);
	}

	dpost("updating remote peer list...("+currentPeerCount+")");
    if(myPeerCount != currentPeerCount){
    	dpost("Start slot-resize animation ("+myPeerCount+" / " + currentPeerCount + ") ...\n");
        if(slotResizer !== null && slotResizer.running){
            slotResizer.cancel();
        }
        slotResizer = new Task(slotResize, this, myPeerCount, (currentPeerCount - myPeerCount), 10);
        slotResizer.interval = 33; // 30fps
        slotResizer.repeat(11);
        myPeerCount =  currentPeerCount;
    }
	
	dpost("carry on \n");
    // first remove all the peers not verified
    var keys = myPeerList.getkeys();
    if(keys != null){
        if(typeof(keys) == 'string'){
            keys = [keys];
        }
        for(var i = 0; i < keys.length; i++){
            var localPeer = myPeerList.get(keys[i]);
            if(localPeer.get("verified") === 0){
				dpost("... remove remote peer: " + localPeer.get("peerName"));
                // this peer has gone
                removePeer(keys[i]);
				return; // peer is beeing removed and sends a 'done' message
            }
        }
    }
    // update Slots with new peer
    var keys = myPeerList.getkeys();
    if(keys != null){
        if(typeof(keys) == 'string'){
            keys = [keys];
        }
        for(var i = 0; i < keys.length; i++){
            var localPeer = myPeerList.get(keys[i]);
            if(localPeer.get("verified") === 3){
				dpost("... add remote peer: " + localPeer.get("peerName"));
                createPeer(keys[i]);
    			localPeer.set("verified", 1); // this indicates an existing peer
				myPeerList.set(keys[i], localPeer);
				return; // peer is beeing removed and sends a 'done' message
            }
        }
    }

    // update Slots with new peer
    slots.forEach(update);
}

function update(_peerID, _index) {
    var localPeer = myPeerList.get(_peerID);
    if(localPeer.get("verified") === 1){
    	messnamed("pl_" + _peerID, "slot", _index);
	}
}


function createPeer(_peerID){
    slots.push(_peerID);

    this.patcher.remove(this.patcher.getnamed(_peerID));
    this.patcher.message(makeCreationMessage(_peerID));
}

function makeCreationMessage(_peerID){
    var localPeer = myPeerList.get(_peerID);
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
	msp.push(localPeer.get("peerName"));
	msp.push(localPeer.get("peerLocalIPv4"));
	msp.push(localPeer.get("peerPublicIPv4"));
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
    // remove the slot
    slots.splice(slots.indexOf(_peerID), 1);
}



function anything()
{
	//var a = arrayfromargs(messagename, arguments);
	//post("received message " + a + "\n");
	//myval = a;
	//bang();
}
