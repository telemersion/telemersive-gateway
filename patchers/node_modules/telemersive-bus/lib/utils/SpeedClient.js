const BusMsgPub = require("../msg/BusMsgPub");
const BusMsgSub = require("../msg/BusMsgSub");
const BusTopics = require('../utils/BusTopics');
const { SpeedPing } = require('../protos/BusMessages.js');

class SpeedClient {

    constructor(_communicator, _peerId){
        this.communicator = _communicator;
        this.busTopics = new BusTopics();
        this.peerId = _peerId;
        this.peerName = null;
        this.roomName = null;
        this.roomPwd =  null;
        this.roomId = 0;
        this.joined = false;
        this.bubbleUpCallback = false;
    };

    /**
     * Set the call back function to return messages to max
     */
    setCallBackFunction(_callBackFunc){
        this.bubbleUpCallback = _callBackFunc;
    };

    init = (_peerName, _roomName, _roomPwd) => {
        this.peerName = _peerName;
        this.roomName = _roomName;
        this.roomPwd =  _roomPwd;
    };

    join = async (_roomId) => {
        this.joined = true;
        this.roomId = _roomId;
        // subscribe to my room chat messages
        await this.communicator.subscribe(
            new BusMsgSub(this.busTopics.baseRoomSpeed(this.roomName).build(),
                this.onSpeedMessage, SpeedPing, 0));
        await this.communicator.subscribe(
            new BusMsgSub(this.busTopics.baseRoomSpeedPing(this.peerId).build(),
                this.onSpeedPingMessage, SpeedPing, 0));
    };

    leave = async () => {
        await this.communicator.unsubscribe(this.busTopics.baseRoomSpeed(this.roomName).build());
        await this.communicator.unsubscribe(this.busTopics.baseRoomSpeedPing(this.peerId).build());
        this.joined = false;
    };

    /**
     * ping sent by a peer as an answer to a speed request
     */
    onSpeedPingMessage = (_topic, _message, _packet) => {
        if(_message.peerId !== this.peerId){
            this.bubbleUpCallback('speed', ['ping', _message.peerName,  _message.peerId, Math.round(new Date().getTime()) - _message.timestamp]);
        }
    };

    /**
     * speed request sent by a peer -> answers back to peer.
     */
    onSpeedMessage = async(_topic, _message, _packet) => {
        if(_message.peerId !== this.peerId){
            await this.communicator.publish(
                new BusMsgPub(
                    this.busTopics.baseRoomSpeedPing(_message.peerId).build(),
                    SpeedPing, 0, false).encode({
                    timestamp: _message.timestamp,
                    peerId: this.peerId,
                    peerName: this.peerName
                }));
            this.bubbleUpCallback('speed', ['pinged', _message.peerName]);
        } else {
            // this is a ping from ourself..
            this.bubbleUpCallback('speed', ['ping', 'mqtt-broker', this.peerId, Math.round(new Date().getTime()) - _message.timestamp]);
        }
    };

    /**
     * sent by the max client
     */
    ping = async () => {
        if (this.joined) {
            //console.log(`sending new chat message to room ${this.roomName}: ${_message} pwd: ${this.roomPwd}` );
            await this.communicator.publish(
                new BusMsgPub(
                    this.busTopics.baseRoomSpeed(this.roomName).build(),
                    SpeedPing, 0, false).encode({
                    timestamp: Math.round(new Date().getTime()),
                    peerId: this.peerId,
                    peerName: this.peerName
                }));

        }
    }
}

module.exports = SpeedClient;