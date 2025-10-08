const BusMsgPub = require("../msg/BusMsgPub");
const BusMsgSub = require("../msg/BusMsgSub");
const BusTopics = require('../utils/BusTopics');

class MqttClient {
    constructor(_communicator, _peerId){
        this.communicator = _communicator;
        this.busTopics = new BusTopics();
        this.peerId = _peerId;
        this.peerName = null;
        this.roomName = null;
        this.roomId = 0;
        this.joined = false;
        this.bubbleUpCallback = false;
        this.mqttBaseTopic = null
        this.subscribeTopics = {};
        this.retainedTopics = {};
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
        this.mqttBaseTopic = this.busTopics.baseRoomMQTT(this.roomName).build()
        this.subscribeTopics = {};
        this.retainedTopics = {};
    };

    join = async (_roomId) => {
        this.roomId = _roomId;
        this.joined = true;
        //await this.communicator.subscribe(new BusMsgSub(this.busTopics.baseRoom(this.roomName).appendTopic('mqtt').appendTopic('topic').appendTopic('symbol').build(), this.onMQTTMessage, 'string', 0));
        //await this.communicator.publish(new BusMsgPub(this.busTopics.baseRoom(this.roomName).appendTopic('mqtt').appendTopic('topic').appendTopic('symbol').build(), 'string', 1, false).encode('test string'));
    };

    leave = async () => {
        // clean up all the subscriptions that are left over
        const cleanUnsubscribe = async (currentTopic) => {
            await this.communicator.unsubscribe(currentTopic);
        };
        await Object.values(this.subscribeTopics).every(cleanUnsubscribe);
        this.subscribeTopics = {};
        this.joined = false;
    };

    /**
     * subscribes to topic relative to room topic
     * @param _topic
     */
    subscribe = async (_topic) => {
        if(this.joined){
            this.subscribeTopics[_topic] = this.busTopics.baseRoomMQTT_Topic(this.roomName, _topic).build();
            await this.communicator.subscribe(
                new BusMsgSub(this.busTopics.baseRoomMQTT_Topic(this.roomName, _topic).build(),
                    this.onMQTTMessage, 'string', 0));
        }
    };

    /**
     * unsubscribes from topic relative to room topic
     * @param _topic
     */
    unsubscribe = async (_topic) => {
        if(this.joined){
            if(this.subscribeTopics.hasOwnProperty(_topic)){
                await this.communicator.unsubscribe(this.subscribeTopics[_topic]);
                delete this.subscribeTopics[_topic];
            }
        }
    };

    /**
     * publishes mqtt topic relative to room topic
     * @param _topic
     * @param _message
     */
    publish = async (_retained, _topic, _message) => {
        if(this.joined) {
            //console.log(`publish called to topic '${_topic}' typeof('${typeof(_message)}') msg length: '${_message.length}', retained: '${(_retained === 1)?true:false}'`);
            if(_message.length === 0 && _retained === 1){
                await this.communicator.networkBus.publish(this.mqttBaseTopic + _topic, '', 0, true);
            } else {
                await this.communicator.networkBus.publish(this.mqttBaseTopic + _topic, JSON.stringify(_message), 0, (_retained === 1)?true:false);
            }
        }
    };

    /**
     * sent by the manager
     */
    onMQTTMessage = (_topic, _message, _packet) => {
        //console.log(`onMQTTMessage called to topic '${_topic}' ('${typeof(_message)}')`);
        let _msgArray = [_topic.substring(this.mqttBaseTopic.length)];
        this.bubbleUpCallback('mqtt', _msgArray.concat(JSON.parse(_message)))
    };
}

module.exports = MqttClient;