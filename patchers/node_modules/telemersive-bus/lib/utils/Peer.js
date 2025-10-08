const publicIp = require('public-ip');
const internalIp = require('internal-ip');
const getInternalIP = require("get-internal-ip");
const sha1 = require("sha1");
const CryptoJS = require("crypto-js");

const BusMsgPub = require("../msg/BusMsgPub");
const BusMsgSub = require("../msg/BusMsgSub");
const BusTopics = require('./BusTopics');
const { PeerInfo, RoomInfo, PeerCredentials } = require('../protos/BusMessages.js');

const ChatClient = require("./ChatClient");
const MQTTClient = require("./MqttClient");
const OSCClient = require("./OSCClient");
const SpeedClient = require("./SpeedClient");

const Version = require("./version.js");

class Peer {
    mqttClient;
    oscClient;
    speedClient;
    roomName;

    constructor(_communicator, _peerId, _appVersion)
    {
        this.protocolVersion = new Version().getProtocolVersion();
        this.appVersion = _appVersion;

        this.communicator = _communicator;
        this.busTopics = new BusTopics();
        this.chatClient = new ChatClient(_communicator, _peerId);
        this.mqttClient = new MQTTClient(_communicator, _peerId);
        this.oscClient = new OSCClient(_communicator, _peerId);
        this.speedClient = new SpeedClient(_communicator, _peerId);
        this.peers = {};
        this.peerId = _peerId;
        this.clientId = _peerId;
        this.peerName = null;
        this.roomName = null;
        this.roomPwd = null;
        this.roomPwdHashed = null;
        this.roomId = 0;
        this.roomUuid = "unknown";
        this.joined = false;
        this.BusCredentials = null;
        this.BusInfo = null;
        this.publicIPv4 = null;
        this.localIPv4 = null;
    }

    /**
     * gathers the public and ALL internal IP's and returns them as a dictionary
     */
    gatherIPs = async () => {
        console.log("init: gathering IP information... ");
        this.publicIPv4 = await publicIp.v4();
        this.localIPv4 = await internalIp.v4();
        this.getLocalIPv4s = await getInternalIP.v4();
 //       console.log(this.getLocalIPv4s );
 //       this.publicIPv6 = await publicIp.v6(); // seems to be a problem on windows
 //       this.localIPv6 = await internalIp.v6(); // seems to be a problem on windows
        console.log("   ...gathering done.");
        return this.getLocalIPv4s;
    };

    /**
     * set the local IP - it might need to be selected by the user
     * @param _localIP
     */
    setLocalIPv4(_localIP){
        this.localIPv4 = _localIP;
    }

    /**
     * encrypt string with hashed room password
     * this mode of encryption is also used by the BusManager to
     * encrypt the roomUuid: there we only have access to the hashed password...
     * @param _message
     * @returns {string}
     */
    encrypt = (_message) => {
        // Encrypt with single hashed password.
        return CryptoJS.AES.encrypt(_message, this.roomPwdHashed).toString();
    }

    /**
     * decrypt string with hashed room password
     * @param _message
     * @returns {string}
     */
    decrypt = (_message) => {
        // Decrypt
        const bytes  = CryptoJS.AES.decrypt(_message, this.roomPwdHashed);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    /**
     * initialize peer on new join message
     * create credentials
     * @param _peerName
     * @param _roomName
     * @param _roomPwd
     */
    init = async (_peerName, _roomName, _roomPwd) => {
        this.peerName = _peerName;
        this.roomName = _roomName;
        this.roomPwdHashed = sha1(_roomPwd).substr(0, 10);
        this.roomPwd = _roomPwd;
        this.joined = false;

        // update to the final client id
        // which is a combination of peerID and single hashed roomPwd
        this.clientId = this.peerId + ":" + this.roomPwdHashed;

        const localIpV4 = this.encrypt(this.localIPv4);
        const publicIpV4 = this.encrypt(this.publicIPv4);

        this.BusCredentials = {
            protocolVersion: this.protocolVersion,
            peerId: this.peerId,
            peerName: this.peerName,
            roomName: this.roomName,
            roomPwd: this.roomPwdHashed,
            localIpV4: localIpV4,
            publicIpV4: publicIpV4,
            clientId: this.clientId,
            appVersion: this.appVersion,
        };

        this.BusInfo = {
            peerId: this.peerId,
            peerName: this.peerName,
            roomName: this.roomName,
            localIpV4: localIpV4,
            publicIpV4: publicIpV4,
        };

        this.chatClient.init(this.peerName, this.roomName, this.roomPwdHashed);
        this.mqttClient.init(this.peerName, this.roomName, this.roomPwdHashed);
        this.oscClient.init(this.peerName, this.roomName, this.roomPwdHashed);
        this.speedClient.init(this.peerName, this.roomName, this.roomPwdHashed);
    };

    getClientId(){
        return this.clientId;
    }

    /**
     * Set the call back function to return messages to max
     */
    setCallBackFunction(_callBackFunc){
        this.bubbleUpCallback = _callBackFunc;
        this.chatClient.setCallBackFunction(_callBackFunc);
        this.mqttClient.setCallBackFunction(_callBackFunc);
        this.oscClient.setCallBackFunction(_callBackFunc);
        this.speedClient.setCallBackFunction(_callBackFunc);
    }

    getCredentials = () => {
        this.BusCredentials.timestamp = Math.round(new Date().getTime() / 1000);
        return this.BusCredentials;
    };

    getBusInfo = () => {
        this.BusInfo.timestamp = Math.round(new Date().getTime() / 1000);
        return this.BusInfo;
    };

    isJoined = () => {
        return this.joined;
    };

    /**
     * joins the approved peer to the room
     */
    join = async (_roomId, _roomUuid) => {
        const decryptedRoomUuid = this.decrypt(_roomUuid);
        if(!this.joined){
            console.log(`   <-- local peer (${this.peerId}) subscribing...`);
            this.roomId = _roomId;
            this.roomUuid = decryptedRoomUuid;

            // let the chat client join
            await this.chatClient.join(_roomId);
            await this.mqttClient.join(_roomId);
            await this.oscClient.join(_roomId);
            await this.speedClient.join(_roomId);

            this.joined = true;

            this.updateCallback();

            // it is important to start the subscription after a successfull joining.
            // important to subscribe to my room ping messages first - otherwise we can run into the problem that we miss
            // the room alive ping while building up the peer list.
            await this.communicator.subscribe(new BusMsgSub(this.busTopics.baseRoomAlive(this.roomName).build(), this.onRoomPing, RoomInfo, 0));

            // subscribe to all peer joined messages
            await this.communicator.subscribe(new BusMsgSub(this.busTopics.roomPeerJoin(this.roomName, '+').build(), this.onPeerJoined, PeerInfo, 2));

            // subscribe to peer left messages
            await this.communicator.subscribe(new BusMsgSub(this.busTopics.roomPeerLeft(this.roomName, '+').build(), this.onPeerLeft, PeerInfo, 2));

            console.log("   <-- ... local peer subscriptions complete");
        } else {
            if(decryptedRoomUuid !== this.roomUuid){
                this.roomUuid = decryptedRoomUuid;
                this.bubbleUpCallback('bus', [ 'peer', 'room', 'uuid', this.roomUuid]);
            }
        }
        return true;
    }

    /**
     * send a message to the chat
     * @param _message string
     */
    chat = async (_message) =>{
        if(this.joined)
            await this.chatClient.chat(_message);
    }

    /**
     * leaves to peer from the joined room
     */
    leave = async () => {
        console.log("   --> local peer unsubscribing...");
        await this.chatClient.leave();
        await this.mqttClient.leave();
        await this.oscClient.leave();
        await this.speedClient.leave();

        // unsubscribe to peer left messages
        await this.communicator.unsubscribe(this.busTopics.roomPeerLeft(this.roomName, '+').build());

        // unsubscribe to all peer joined messages
        await this.communicator.unsubscribe(this.busTopics.roomPeerJoin(this.roomName, '+').build());
        
        // unsubscribe to my room ping messages
        await this.communicator.unsubscribe(this.busTopics.baseRoomAlive(this.roomName).build());

        this.communicator.clearAutoGeneratedSubscriptions();

        this.peers = {};
        this.joined = false;
        this.roomUuid = "unknown";

        this.updateCallback();
        this.updatePeerListMessage();
        console.log("   --> ...local peer unsubscription complete");
    }

    /**
     * called by the manager when a new peer joins the room
     */
    onPeerJoined = async (_topic, _message, _packet) => {
        if (_message.peerId === this.peerId){
            //console.log("onPeerJoined: its our own message, discard.");
            return;
        }
        // if the peer joined the same room and has not yet been registered
        if(_message.roomName === this.roomName && this.peers[_message.peerId] == null){
            console.log(`   <-- remote peer '${_message.peerName}' - ${_message.peerId} joined room`);
            this.peers[_message.peerId] = {
                peerName: _message.peerName,
                peerId: _message.peerId,
                localIpV4: this.decrypt(_message.localIpV4),
                publicIpV4: this.decrypt(_message.publicIpV4),
            }
            // check if peer has identical name to this
            if(this.peerName === _message.peerName){
                this.bubbleUpCallback('bus', [ 'warning', 'peer', `another peer is using the same name: '${this.peerName}'`]);
            }

            let currentPeer = this.peers[_message.peerId];
            this.bubbleUpCallback('bus', [ 'peers', 'remote', 'joined', currentPeer.peerName, currentPeer.peerId, currentPeer.localIpV4, currentPeer.publicIpV4])

            this.updatePeerListMessage();
        }
    };

    /**
     * called by the manager when a peer leaves the room
     */
    onPeerLeft = async (_topic, _message, _packet) => {
        if (_message.peerId === this.peerId){
            console.log(`   --> local peer is kicked out of room`);
            await this.leave();
            return;
        }

        if(this.peers[_message.peerId] != null){
            console.log(`   --> remote peer '${_message.peerName}' - ${_message.peerId}  left room`);

            let currentPeer = this.peers[_message.peerId];
            this.bubbleUpCallback('bus', [ 'peers', 'remote', 'left', currentPeer.peerName, currentPeer.peerId])

            delete this.peers[_message.peerId];
            this.updatePeerListMessage();
        } else {
            //console.log(`peer '${_message.peerName}' left from room '${_message.roomName}'`);
        }
    };

    /**
     * updates the app with the current list of joined peers
     */
    updatePeerListMessage = () => {
        this.bubbleUpCallback('bus', [ 'peers', 'menu', 'clear']);
        for (let tPeerName in this.peers) {
            let currentPeer = this.peers[tPeerName];
            this.bubbleUpCallback('bus', [ 'peers', 'menu', 'append', currentPeer.peerName, currentPeer.peerId, currentPeer.localIpV4, currentPeer.publicIpV4])
        }
        this.bubbleUpCallback('bus', [ 'peers', 'done']);
    }

    /**
     * updates the application about the current status via bubbleUpCallbacks
     */
    updateCallback = () => {
        this.bubbleUpCallback('bus', [ 'peer', 'name', this.peerName]);
        this.bubbleUpCallback('bus', [ 'peer', 'id', this.peerId]);
        this.bubbleUpCallback('bus', [ 'peer', 'localIP', this.localIPv4]);
        this.bubbleUpCallback('bus', [ 'peer', 'publicIP', this.publicIPv4]);
        this.bubbleUpCallback('bus', [ 'peer', 'room', 'name', (this.isJoined())?this.roomName:'>not joined<']);
        this.bubbleUpCallback('bus', [ 'peer', 'room', 'id', (this.isJoined())?this.roomId:0]);
        this.bubbleUpCallback('bus', [ 'peer', 'room', 'uuid', this.roomUuid]);
        // it is important to send the joined message at the end...
        this.bubbleUpCallback('bus', [ 'peer', 'joined', (this.isJoined())?1:0]);
    }

    /**
     * called by the manager to see if the peer is still joined. it returns a ping answer
     */
    onRoomPing = async (_topic, _message, _packet) => {
        //console.log(`${this.peerName}] onRoomPing: room: ${_message.roomName} | ${_message.roomId}`);
        //console.log(`${this.peerName}] onRoomPing: peer: ${this.peerId} | ${this.peerName}`);
        //console.log(`Payload: ${JSON.stringify(payload)}`);

        console.log(`   <-- received room ping`);
        if(this.isJoined()){
            // send my room alive message
            await this.communicator.publish(
                new BusMsgPub(this.busTopics.baseRoomAlivePing(_message.roomName).build(),
                    PeerCredentials, 1, false).encode(this.getCredentials()));
        } else {
            console.log(`       <-- this shouldn't happen - local peer has already left the room`);
            await this.leave();
        }
    }
}

module.exports = Peer;