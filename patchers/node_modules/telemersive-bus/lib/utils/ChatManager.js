const sha1 = require('sha1');
const BusMsgPub = require("../msg/BusMsgPub");
const BusMsgSub = require("../msg/BusMsgSub");
const BusTopics = require('../utils/BusTopics');
const { ChatMessage , ChatHistory} = require('../protos/BusMessages.js');

class ChatManager {
    bubbleUpCallback; // bubbleUpFuncion to call parent class
    peerId;
    roomName;

    constructor(_communicator, _roomName, _roomPwd){
        //console.log(`create new chat manager for room ${_roomName}` );
        this.busTopics = new BusTopics();
        this.roomName = _roomName;
        this.roomPwd =  _roomPwd;
        this.communicator = _communicator;
        this.chatTable = {};
    };

    connect = async () => {
        // subscribe to my room chat messages
        //console.log(`connect new chat manager for room ${this.roomName}` );
        await this.communicator.subscribe(new BusMsgSub(this.busTopics.baseRoomChatMsg(this.roomName).build(), this.onChatMessage, ChatMessage, 0));
    }

    disconnect = async () => {
        //console.log(`disconnect new chat manager for room ${this.roomName}` );
        this.communicator.unsubscribe(this.busTopics.baseRoomChatMsg(this.roomName).build());
    }

    onChatMessage = async (_topic, _message, _packet) => {
        //console.log(`received chat message from ${_message.peerName}: ${_message.message}` );
        //console.log(`received pwd: ${_message.roomPwd}`);
        let shaPassword = sha1(_message.roomPwd).substr(0, 10)
        if(this.roomPwd === shaPassword){
            //console.log(`... correct pwd...`);
            // if we get a clearchat message, we clear the message table
            let theMessage = _message.message;
            if(_message.message === 'clearchat'){
                this.chatTable = {};
                theMessage = '> cleared the chat'
            }
            // send my room alive message
            await this.sendMessage(_message.peerName, theMessage, _message.localTime);
        }
    };

    sendMessage = async (_peerName, _message, _localTime) => {
        const msg = "[" + _peerName + "]: " + _message
        //console.log(`...add local timestamp [${_localTime}] to new message string:  ${msg}`);
        this.chatTable[_localTime] = msg;
        //console.log(`...stringify:  ${JSON.stringify(this.chatTable)}`);
        await this.communicator.publish(
            new BusMsgPub(
                this.busTopics.baseRoomChat(this.roomName).build(),
                ChatHistory, 2, true).encode({
                timestamp: Math.round(new Date().getTime() / 1000),
                message: JSON.stringify(this.chatTable)}));
    }
}

module.exports = ChatManager;