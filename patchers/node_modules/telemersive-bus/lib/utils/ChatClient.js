const BusMsgPub = require("../msg/BusMsgPub");
const BusMsgSub = require("../msg/BusMsgSub");
const BusTopics = require('../utils/BusTopics');
const { ChatMessage, ChatHistory } = require('../protos/BusMessages.js');

class ChatClient {
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
    }

    init = (_peerName, _roomName, _roomPwd) => {
        this.peerName = _peerName;
        this.roomName = _roomName;
        this.roomPwd =  _roomPwd;
    };

    join = async (_roomId) => {
        this.joined = true;
        this.roomId = _roomId;
        // subscribe to my room chat messages
        await this.communicator.subscribe(new BusMsgSub(this.busTopics.baseRoomChat(this.roomName).build(), this.onChatMessage, ChatHistory, 0));
        await this.chat("> has joined room")
    };

    leave = async () => {
        await this.chat("< has left room")
        await this.communicator.unsubscribe(this.busTopics.baseRoomChat(this.roomName).build());
        this.joined = false;
    };

    /**
     * sent by the manager
     */
    onChatMessage = (_topic, _message, _packet) => {
        this.bubbleUpCallback('chat', [_message.message])
    };

    /**
     * sent by the max client
     */
    chat = async (_message) => {
        if(this.joined){
            //console.log(`sending new chat message to room ${this.roomName}: ${_message} pwd: ${this.roomPwd}` );
            await this.communicator.publish(
                new BusMsgPub(
                    this.busTopics.baseRoomChatMsg(this.roomName).build(),
                    ChatMessage, 0, false).encode({
                    timestamp: Math.round(new Date().getTime() / 1000),
                    peerId: this.peerId,
                    peerName: this.peerName,
                    roomPwd: this.roomPwd,
                    message: _message,
                    localTime: new Date().toTimeString().substr(0, 17)
                }));
        }
    }
}

module.exports = ChatClient;