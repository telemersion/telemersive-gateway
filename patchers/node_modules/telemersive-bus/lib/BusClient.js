const short = require('short-uuid');
const Communicator = require('./connect/Communicator.js')
const Peer = require('./utils/Peer.js');
const BusMsgPub = require("./msg/BusMsgPub");
const BusMsgSub = require("./msg/BusMsgSub");
const { RoomAccess, PeerCredentials, RoomInfo } = require('./protos/BusMessages.js');
const BusTopics = require('./utils/BusTopics');

class BusClient {
    peer;

    constructor(_appVersion)
    {
        this.appVersion = _appVersion;
        const translator = short(); // Defaults to flickrBase58
        // Generate short UUID as peerId
        this.peerId = translator.new(); // mhvXdrZT4jP5T8vBxuvm75

        this.communicator = new Communicator();
        this.peer = new Peer(this.communicator, this.peerId, this.appVersion);
        this.busTopics = new BusTopics();
        this.rooms = [];
        this.bubbleUpCallback = null; // bubbleUpFuncion to call parent class
        this.joinTimeout = null;
        this.connectTimeout = null;
    }

    /**
     * gathers all IP's and returns all the internal network cards as dictionary
     * @returns {Promise<*>}
     */
    init = async () => {
        return await this.peer.gatherIPs();
    }

    /**
     * Set the call back function to return messages to max
     */
    setCallback = (_func) => {
        this.bubbleUpCallback = _func;
        this.peer.setCallBackFunction(_func);
    }

    /**
     * configure the mqtt broker connection
     * @param {*} _host
     * @param {*} _port
     * @param {*} _username
     * @param {*} _password
     * @param _peerName
     */
    configureServer = (_host, _port, _username, _password, _localIP) => {
        this.communicator.configure(_host, _port, _username, _password, this.peerId);
        if(_localIP != null){
            this.peer.setLocalIPv4(_localIP);
        }
    }

    /**
     * connect with mqtt broker
     */
    connectServer = async () => {
        console.log("connect: attempting to connect to broker...")
        try{
            this.connectTimeout = setTimeout(this.connectionTimeout,4000);
            await this.communicator.connect();
            // if connection was successful, subscribe to room info topic
            await this.communicator.subscribe(new BusMsgSub(this.busTopics.baseRoomInfo('+').build(), this.onRooms, RoomInfo, 2));
            // if connection was successful, subscribe to room delete topic
            await this.communicator.subscribe(new BusMsgSub(this.busTopics.roomDelete().build(), this.onRoomDelete, RoomInfo, 2));
            //console.log(`...subscribe to. ${this.busTopics.basePeerRoomAccess(this.peerId).build()}`);
            this.bubbleUpCallback('bus', [ 'broker', 'connected', 1]);
            console.log("...successfully connected.");
        } catch (e) {
            console.log("...unsuccessful connection attempt.");
            if(typeof(e) === 'object'){
                if(e.code === 5){
                    this.bubbleUpCallback('bus', [ 'error', 'broker', "username / password invalid. connection refused"]);
                } else if (e.code === "ECONNREFUSED"){
                    this.bubbleUpCallback('bus', [ 'error', 'broker', "invalid configuration. connection refused"]);
                } else if (e.code === "ERR_INVALID_URL"){
                    this.bubbleUpCallback('bus', [ 'error', 'broker', `invalid url: '${e.input}'. connection refused`]);
                } else {
                    this.bubbleUpCallback('bus', [ 'error', 'broker', JSON.stringify(e)]);
                }
            }
            else {
                this.bubbleUpCallback('bus', [ 'error', 'broker', e]);
            }
            this.bubbleUpCallback('bus', [ 'broker', 'connected', 0]);
        }
        if(this.connectTimeout !== null){
            // we stop the timeout thread
            console.log("...stopping connection timout thread.");
            clearTimeout(this.connectTimeout);
        }
    }

    /**
     * disconnect from mqtt broker
     */
    disconnectServer = async () => {
        console.log("disconnecting...");
        // first we leave the room
        await this.leave();
        // then we clean up all subscriptions
        await this.communicator.unsubscribeAll();
        // and properly disconnect
        await this.communicator.disconnect();
        // and send a feedback
        this.bubbleUpCallback('bus', [ 'broker', 'connected', 0]);
        // clean all stored infos about rooms
        this.rooms = [];
        console.log("...successfully disconnected.");
    }

    /**
     * attempting to join the peer under this name and room
     * @param {*} _peerName 
     * @param {*} _roomName 
     * @param {*} _roomPwd 
     */
    join = async (_peerName, _roomName, _roomPwd) => {
        console.log(`<-- local peer attempting to join room ${_roomName}...`);
        if(!this.peer.isJoined()){
            if(this.communicator.isConnected()){

                // initialize peer - this also reconnects to the broker with the
                // final clientID
                await this.peer.init( _peerName, _roomName, _roomPwd);

                // we reconnect with the final clientID. this protects this peer from a
                // potential BAD ACTOR spoofing as itself.
                this.communicator.setClientID(this.peer.getClientId());

                console.log(`   <-- reconnect to broker with correct last will...`);
                // we reconnect again and set this time the correct last will message
                // with the room info and password
                // this should be done before we internally join the room and subscribe to all the
                // topics
                await this.communicator.reconnect(
                    new BusMsgPub(
                        this.busTopics.peerLeaving().build(),
                        PeerCredentials, 2, false).encode(this.peer.getCredentials()));
                console.log(`   <-- ... reconnected.`);

                // if connection was successful, subscribe to roomAccess topic
                await this.communicator.subscribe(new BusMsgSub(this.busTopics.basePeerRoomAccess(this.peer.getClientId()).build(), this.onRoomJoined, RoomAccess, 2));

                // now we start the timeout thread
                this.joinTimeout = setTimeout(this.joinedTimeout,5000);

                console.log(`   <-- send request to create / join room...`);
                // now we can send the room create message - knowing the manager
                // will resend the answer to a clientID protected topic
                await this.communicator.publish(
                    new BusMsgPub(
                        this.busTopics.roomCreate().build(),
                        PeerCredentials, 1, false).encode(this.peer.getCredentials()));

            } else {
                this.bubbleUpCallback('bus', [ 'error', 'peer', 'cannot join unless connected']);
            }
        } else {
            this.bubbleUpCallback('bus', [ 'error', 'peer', 'already joined']);
        }
    }

    connectionTimeout = () => {
        console.error(">>> connection timeout. broker not answering");
        this.bubbleUpCallback('bus', [ 'broker', 'connected', 0]);
        this.bubbleUpCallback('bus', [ 'error', 'broker', 'timeout: broker is not answering. check configure.']);
    }

    joinedTimeout = () => {
        console.error(">>> room join timeout. manager not answering");
        this.bubbleUpCallback('bus', [ 'peer', 'joined', 0]);
        this.bubbleUpCallback('bus', [ 'error', 'peer', 'timeout: manager is not answering']);
    }

    /**
     * answer from room manager on request to create / join room
     */
    onRoomJoined = async (_topic, _message, _packet) => {
        if(this.joinTimeout !== null){
            // we stop the timeout thread
            console.log("...stopping join timout thread.");
            clearTimeout(this.joinTimeout);
        }
        if (_message.access === false){
            if(this.peer.isJoined()){
                console.error(`>>> room ${_message.roomName} access rejected - ${_message.reason}.`);
                this.bubbleUpCallback('bus', [ 'error', 'peer', `room access declined - ${_message.reason}`]);
                await this.peer.leave();
                return;
            } else {
                console.error(`>>> room ${_message.roomName} access declined - ${_message.reason}.`);
                this.bubbleUpCallback('bus', [ 'error', 'peer', `join access declined - ${_message.reason}`]);
                this.bubbleUpCallback('bus', [ 'peer', 'joined', 0]);
                return;
            }
        } else {
            if(!this.peer.isJoined()){
                console.log(`<-- access to room ${_message.roomName} accepted.`);

                // now we can join the peer and give it its room id
                await this.peer.join(_message.roomId, _message.roomUuid);

            } else {
                console.log(`<-- access to room ${_message.roomName} confirmed.`);

                // we rejoin, knowing it will only reset the UUID if it has changed
                await this.peer.join(_message.roomId, _message.roomUuid);
            }
        }
    };

    /**
     * command to let the peer leave to room
     * @returns {Promise<void>}
     */
    leave = async () => {
        console.log("--> leave command received...");
        if(this.peer.isJoined()){
            //console.log("...was connected....");
            // send peer leaving message
            await this.peer.leave();
            console.log("   --> local peer informs manager it leaves the room");
            await this.communicator.publish(
                new BusMsgPub(
                    this.busTopics.peerLeaving().build(),
                    PeerCredentials, 2, false).encode(this.peer.getCredentials()));
            console.log("--> local peer left the room");
        } else {
            console.log("...already left");
        }
    }

    /**
     * message from manager if a room has been removed
     */
    onRoomDelete = async (_topic, _message, _packet) => {
        // remove room from list
        if(this.rooms.includes(_message.roomName)) {
            console.log(`--> room '${_message.roomName}' removed by manager`);
            this.rooms.splice(this.rooms.indexOf(_message.roomName), 1);
            // update app
            this.updateRoomListMessage()
            // unlikely event:
            if (this.peer.isJoined() && this.peer.roomName === _message.roomName) {
                console.error(`>>> local peers room was removed!!`);
            }
        }
    };

    /**
     * retained messages about existing rooms
     */
    onRooms = async (_topic, _message, _packet) => {
        if(!this.rooms.includes(_message.roomName)){
            if(_message.appVersion === this.appVersion){
                console.log(`<-- found room '${_message.roomName}'`);
                this.rooms.push(_message.roomName);
            } else {
                console.log(`<-- incompatible room '${_message.roomName}' registered | created by app version '${_message.appVersion}'`);
                this.rooms.push(_message.roomName + " (incompatible)");
            }
            this.updateRoomListMessage()
        }
    };

    /**
     * helper function to return current room list back to max
     */
    updateRoomListMessage = () => {
        this.bubbleUpCallback('bus', [ 'rooms', 'menu', 'clear']);
        const sendRooms = (currentRoom) => this.bubbleUpCallback('bus', [ 'rooms', 'menu', 'append', currentRoom]);
        this.rooms.forEach(sendRooms);
        if(this.peer.roomName === true){
            this.bubbleUpCallback('bus', [ 'rooms', 'menu', 'set', this.peer.roomName]);
        }
        this.bubbleUpCallback('bus', [ 'rooms', 'listing', ...this.rooms]);
        this.bubbleUpCallback('bus', [ 'rooms', 'done']);
    }

}

module.exports = BusClient;
