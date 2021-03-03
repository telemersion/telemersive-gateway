
var mySlotSize = 45;

var myval=0;
var myPeerList = new Dict("remotePeerList");;
var slots = [];

var myRoomName = "unkown";
var myRoomID = 0;

if (jsarguments.length>1)
	myval = jsarguments[1];

function dpost(_post){
	post("peerList: " + _post + "\n");
}

function bang()
{
	outlet(0,"myvalue","is",myval);
}

function joined(_joined){
	if(_joined == 0){
		dpost("local peer left room. cleaning up list of remote peers..");
		clear();
		done();
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
            localPeer.set("verified", 0);
            myPeerList.set(keys[i], localPeer);
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
        if(localPeer.get("peerName") !== _peerName ||
            localPeer.get("peerLocalIPv4") !== _peerLocalIPv4 ||
            localPeer.get("peerPublicIPv4") !== _peerPublicIPv4){
            // something changed.
            localPeer.set("peerName", _peerName);
            localPeer.set("peerLocalIPv4", _peerLocalIPv4);
            localPeer.set("peerPublicIPv4", _peerPublicIPv4);
            localPeer.set("verified", 2); // this indicates a changed peer
        } else {
            // verify the remote peer
            localPeer.set("verified", 1); // this indicates an existing peer
        }
        myPeerList.set(_peerID, localPeer);
    }
    // since in the last step a peer might have been removed because of a change we test again
    if(!myPeerList.contains(_peerID)){
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
    // first remove all the peers not verified
    var keys = myPeerList.getkeys();
    if(keys != null){
        if(typeof(keys) == 'string'){
            keys = [keys];
        }
		dpost("remote peers found:" + keys);
        for(var i = 0; i < keys.length; i++){
            var localPeer = myPeerList.get(keys[i]);
            if(localPeer.get("verified") === 0){
				dpost("remove remote peer: " + localPeer.get("peerName"));
                // this peer has gone
                removePeer(keys[i]);
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
				dpost("add remote peer: " + localPeer.get("peerName"));
                slots.push(keys[i]);
                createPeer(keys[i]);
            }
        }
    }

    // update Slots with new peer
    slots.forEach(update);
}

function createPeer(_peerID){
    this.patcher.remove(this.patcher.getnamed(_peerID));
    this.patcher.message(makeCreationMessage(_peerID));
}

function update(_peerID, _index) {
    var localPeer = myPeerList.get(_peerID);
    messnamed("pl_" + _peerID, "peerName", localPeer.get("peerName"));
    messnamed("pl_" + _peerID, "peerLocalIPv4", localPeer.get("peerLocalIPv4"));
    messnamed("pl_" + _peerID, "peerPublicIPv4", localPeer.get("peerPublicIPv4"));
    messnamed("pl_" + _peerID, "roomName", myRoomName);
    messnamed("pl_" + _peerID, "roomID", myRoomID);
    messnamed("pl_" + _peerID, "slot", _index);
}

function makeCreationMessage(_peerID){
    var localPeer = myPeerList.get(_peerID);
    var slotIndex = slots.indexOf(_peerID)
	var msp = new Array();
	msp.push("script");
	msp.push("newobject");
	msp.push("bpatcher");
    msp.push("Peer.maxpat");
    msp.push("@presentation_rect");
	msp.push(720);
	msp.push(slotIndex * mySlotSize);
	msp.push(720);
	msp.push(mySlotSize);
	msp.push("@varname");
	msp.push(_peerID);
	msp.push("@presentation");
	msp.push(1);
	msp.push("@args");
	msp.push("remote");
	msp.push(_peerID);
	msp.push(localPeer.get("peerName"));
	msp.push(localPeer.get("peerLocalIPv4"));
	msp.push(localPeer.get("peerPublicIPv4"));
	msp.push(myRoomName);
	msp.push(myRoomID);
	msp.push(slotIndex);
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
	var a = arrayfromargs(messagename, arguments);
	post("received message " + a + "\n");
	myval = a;
	bang();
}
