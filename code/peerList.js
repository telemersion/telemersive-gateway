
var mySlotSize = 45;

var myval=0;
var myPeerList = new Dict("remotePeerList");;
var slots = [];
var isJoined = 0;

var myRoomName = "unkown";
var myRoomID = 0;

if (jsarguments.length>1)
	myval = jsarguments[1];

function dpost(_post){
	post("peerList: " + _post + "\n");
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
	dpost("updating remote peer list...");
	
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

	if(isJoined === 1){
		outlet(0, "peerList", "uptodate");
	} else {
		if(myPeerList.getkeys() === null){
			outlet(0, "peerList", "clear");
		}
	}
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
