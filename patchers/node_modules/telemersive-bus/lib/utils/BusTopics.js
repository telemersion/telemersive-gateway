class BusTopics
{
    prefix = "tBus";
    topic;

    constructor(_prefix) {
        if(_prefix != null)
            this.prefix = _prefix;
    };

    /**
     * base topic to - create / gain access to - rooms
     * iBus/roomCreate
     */
    roomCreate(){
        this.topic = this.prefix;
        return this.appendTopic("roomCreate");
    };

    /**
     * base topic to - create / gain access to - rooms
     * iBus/roomDelete
     */
    roomDelete(){
        this.topic = this.prefix;
        return this.appendTopic("roomDelete");
    };

    /**
     * setup base topic for peer left
     * iBus/peerLeaving
     */
    peerLeaving(){
        this.topic = this.prefix;
        return this.appendTopic("peerLeaving");
    };

    /**
     * setup base topic for receiving room access
     * iBus/peers/'peerID'
     */
    basePeer(_peerId){
        this.topic = this.prefix;
        return this.appendTopic("peers").appendTopic(_peerId);
    };

    /**
     * setup base topic for receiving room access
     * iBus/peers/'peerID'/roomAccess
     */
    basePeerRoomAccess(_peerId){
        return this.basePeer(_peerId).appendTopic("roomAccess");
    };

    /**
     * setup topic for room.
     * iBus/rooms/'roomName'
     */
    baseRoom(_roomName){
        this.topic = this.prefix;
        return this.appendTopic("rooms").appendTopic(_roomName);
    };

    /**
     * setup topic for room.
     * iBus/rooms/'roomName'/#
     */
    baseRoomSubTopics(_roomName){
        this.topic = this.prefix;
        return this.baseRoom(_roomName).appendTopic('#');
    };

    /**
     * info topic for a room
     * iBus/rooms/'roomName'/info
     */
    baseRoomInfo(_roomName){
        return this.baseRoom(_roomName).appendTopic("info");
    };

    /**
     * chat topic for a room
     * iBus/rooms/'roomName'/chat
     */
    baseRoomChat(_roomName){
        return this.baseRoom(_roomName).appendTopic("chat");
    };

    /**
     * chat/msg topic for a room
     * iBus/rooms/'roomName'/chat/msg
     */
    baseRoomChatMsg(_roomName){
        return this.baseRoomChat(_roomName).appendTopic("msg");
    };

    /**
     * mqtt topic for a room
     * iBus/rooms/'roomName'/osc>
     */
    baseRoomOSC(_roomName){
        return this.baseRoom(_roomName).appendTopic("osc");
    };

    /**
     * mqtt topic for a room
     * iBus/rooms/'roomName'/mqtt>
     */
    baseRoomMQTT(_roomName){
        return this.baseRoom(_roomName).appendTopic("mqtt");
    };

    /**
     * mqtt topic for a room
     * iBus/rooms/'roomName'/mqtt/<topic>
     */
    baseRoomMQTT_Topic(_roomName, _topic){
        return this.baseRoomMQTT(_roomName).appendTopic(_topic);
    };

    /**
     * setup topic for room ping
     * iBus/rooms/'roomName'/speed
     */
    baseRoomSpeed(_roomName){
        return this.baseRoom(_roomName).appendTopic("speed");
    };

    /**
     * setup topic for room ping
     * iBus/peer/'peerID'/speed/ping
     */
    baseRoomSpeedPing( _peerId){
        return this.basePeer(_peerId).appendTopic("speed/ping");
    };


    /**
     * setup topic for room ping
     * iBus/rooms/'roomName'/alive
     */
    baseRoomAlive(_roomName){
        return this.baseRoom(_roomName).appendTopic("alive");
    };

    /**
     * setup topic for room ping
     * iBus/rooms/'roomName'/alive/ping
     */
    baseRoomAlivePing(_roomName){
        return this.baseRoomAlive(_roomName).appendTopic("ping");
    };


    /**
     * setup topic for peer.
     * iBus/rooms/'roomName'/peers/'peerId'
     */
    roomPeer(_roomName, _peerId){
        return this.baseRoom(_roomName).appendTopic("peers").appendTopic(_peerId);
    };

    /**
     * setup topic for peer.
     * iBus/rooms/'roomName'/peers/'peerId'/joined
     */
    roomPeerJoin(_roomName, _peerId){
        return this.roomPeer(_roomName, _peerId).appendTopic("joined");
    };

    /**
     * setup topic for peer.
     * iBus/rooms/'roomName'/peers/'peerId'/left
     */
    roomPeerLeft(_roomName, _peerId){
        return this.roomPeer(_roomName, _peerId).appendTopic("left");
    };

    appendTopic(_custom){
        if (this.topic.endsWith("/") || _custom.startsWith("/")) {
            this.topic = `${this.topic}${_custom}`;
        } else {
            this.topic = `${this.topic}/${_custom}`;
        }
        return this;
    };

    appendMultiLevelWildcard()
    {
        return this.appendTopic("#");
    };
    
    appendSingleLevelWildcard()
    {
        return this.appendTopic("+");
    };

    /**
     * should be called once the topic is finished building. it returns the topic string.
     */
    build(){
        return this.topic;
    }
}

module.exports = BusTopics;