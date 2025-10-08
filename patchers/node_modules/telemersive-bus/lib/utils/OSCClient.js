const BusMsgPub = require("../msg/BusMsgPub");
const BusMsgSub = require("../msg/BusMsgSub");
const BusTopics = require('../utils/BusTopics');

class OSCClient {
    constructor(_communicator, _peerId){
        this.communicator = _communicator;
        this.busTopics = new BusTopics();
        this.peerId = _peerId;
        this.peerName = null;
        this.roomName = null;
        this.roomId = 0;
        this.joined = false;
        this.bubbleUpCallback = false;
        this.OSCBaseTopic = null
    };

    /**
     * Set the call back function to return messages to max
     */
    setCallBackFunction(_callBackFunc){
        this.bubbleUpCallback = _callBackFunc;
    }

    init = (_peerName, _roomName, _roomPwd) => {
        this.peerName = _peerName;
        this.roomName = _roomName;
        this.OSCBaseTopic = this.busTopics.baseRoomOSC(this.roomName).build()
    };

    join = async (_roomId) => {
        this.roomId = _roomId;
        this.joined = true;
        await this.communicator.subscribe(
            new BusMsgSub(this.OSCBaseTopic, this.onOSCMessage, 'string', 0));
        //await this.communicator.publish(new BusMsgPub(this.busTopics.baseRoom(this.roomName).appendTopic('mqtt').appendTopic('topic').appendTopic('symbol').build(), 'string', 1, false).encode('test string'));
    };

    leave = async () => {
        // clean up all the subscriptions that are left over
        await this.communicator.unsubscribe(this.OSCBaseTopic);
        this.joined = false;
    };

    /**
     * sends osc topic to all joined peers
     * @param _topic
     * @param _message
     */
    send = async (...mesageList) => {
        if(this.joined) {
            //console.log(`publish called to topic '${_topic}' typeof('${typeof(_message)}') msg length: '${_message.length}', retained: '${(_retained === 1)?true:false}'`);
            await this.communicator.networkBus.publish(this.OSCBaseTopic, JSON.stringify(mesageList), 0, false);
        }
    };

    /**
     * sent by a peer
     */
    onOSCMessage = (_topic, _message, _packet) => {
        //console.log(`onOSCMessage called to topic '${_topic}' ('${typeof(JSON.parse(_message))}') ${JSON.parse(_message)}`);
        //let arr = ...JSON.parse(_message);
        this.bubbleUpCallback('osc', ...JSON.parse(_message));
    };
}

module.exports = OSCClient;