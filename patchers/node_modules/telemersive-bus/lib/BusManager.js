const short = require('short-uuid');
const sha1 = require("sha1");
const CryptoJS = require("crypto-js");
const Communicator = require('./connect/Communicator.js')
const BusTopics = require('./utils/BusTopics');
const BusMsgPub = require("./msg/BusMsgPub");
const BusMsgSub = require("./msg/BusMsgSub");
const ChatManager = require("./utils/ChatManager");
const Version = require("./utils/version.js");
const superagent = require('superagent');
const {RoomAccess, RoomInfo, PeerCredentials, PeerInfo} = require('./protos/BusMessages.js');

/* time the housekeeping thread waits until it continues with the next step
 */
const houseKeepingTimeOut = 1500;
const houseKeepingTimeOut_onRepeat = 1500;
const houseKeepingTimeOut_onPeerLeft= 1000;
const houseKeepingTimeOut_onPeerJoined = 5000;
const ROOM_ID_MIN = 11;
const ROOM_ID_MAX = 50;

class BusManager {
    rooms;

    constructor(_baseTopic) {
        this.translator = short(); // Defaults to flickrBase58
        this.protocolVersion = new Version().getProtocolVersion();
        this.communicator = new Communicator();
        this.busTopics = new BusTopics();
        this.rooms = {};
        this.peerHousekeep = {};
        this.roomHousekeep = {};
        this.houseKeepingInProgress = false;
        this.chatManagers = {};
        this.switchBoardURI = null;
    }

    /*********************************************************************
     **********************************************************************
     *
     *                     Switchboard CONNECTION
     *
     **********************************************************************
     **********************************************************************/

    /**
     * sets ths switchboard url to a individual url than the broker
     * @param _url switchboard url without the 'http://' prefix
     * @param _port switchboard port
     */
    configureSwitchBoard = (_url, _port) => {
        this.switchBoardURI = 'http://' + _url + ":" + _port + "/proxies/";
    }

    /*********************************************************************
     **********************************************************************
     *
     *                     BROKER CONNECTION
     *
     **********************************************************************
     **********************************************************************/

    /**
     * configure the mqtt broker connection.
     * It also sets the switchboard to the same url and port 3591 as default.
     * @param {*} _host url without the 'mqtt://' prefix
     * @param {*} _brokerPort mqtt broker port
     * @param {*} _switchboardPort switchboard port (0 = off)
     * @param {*} _username broker username
     * @param {*} _password broker password
     */
    configureServer = (_host, _brokerPort, _switchboardPort, _username, _password, _managerName) => {
        this.communicator.configure('mqtt://' + _host, _brokerPort, _username, _password, _managerName);
        if (this.switchBoardURI === null && _switchboardPort !== 0) {
            this.configureSwitchBoard(_host, _switchboardPort);
        }
    }

    /**
     * connect with mqtt broker
     */
    connectServer = async () => {
        console.log(`connecting to broker... `);
        await this.communicator.connect();
        // if connection was successfull, subscribe to all rooms
        await this.communicator.subscribe(new BusMsgSub(this.busTopics.baseRoomInfo('+').build(), this.onRooms, RoomInfo, 0));
        // and subscribe to creatRoom topic
        await this.communicator.subscribe(new BusMsgSub(this.busTopics.roomCreate().build(), this.onRoomAccess, PeerCredentials, 0));
        // subscribe to peer left messages
        await this.communicator.subscribe(new BusMsgSub(this.busTopics.peerLeaving().build(), this.onPeerLeaving, PeerCredentials, 0));


        console.log(`-> clean out the house ... `);
        // we wait a moment to start with houskeeping
        setTimeout(this.startHousekeeping, houseKeepingTimeOut);
    };

    /**
     * disconnect from mqtt broker
     */
    disconnectServer = async () => {
        await this.communicator.disconnect();
        this.communicator.clearSubscriptions();
    };


    /**********************************************************************
     **********************************************************************
     *
     *                              HOUSKEEPING
     *
     **********************************************************************
     **********************************************************************/

    /**
     * start the housekeeping
     *      on startup
     *      when peer joins a room
     *      when peer leaves a room
     */
    startHousekeeping = async () => {
        // we dont want to start another housekeeping process until the previous one has finished
        if(!this.houseKeepingInProgress){
            this.houseKeepingInProgress = true;
            console.log(`  -> starting housekeeping -> gather all peers ...`);
            this.peerHousekeep = {};
            this.roomHousekeep = Object.assign({}, this.rooms); // clone the current room list

            // we start by subscribing to all peer info messages inside all rooms
            await this.communicator.subscribe(new BusMsgSub(this.busTopics.roomPeerJoin('+', '+').build(), this.onAllPeers, PeerInfo, 0));

            // now we have to wait a moment
            setTimeout(this.pingAllPeersAlive, houseKeepingTimeOut);
        } else {
            // if there is already a housekeeping going on,
            // we wait for some time to finish it and try again.
            setTimeout(this.startHousekeeping, houseKeepingTimeOut_onRepeat);
        }
    }

    /**
     * method called by the retained joined messages from all the peers and all the rooms
     */
    onAllPeers = async (_topic, _message, _packet) => {
        console.log(`    -> peer '${_message.peerName}' found in room '${_message.roomName}'`);
        // we simple store them for the next step
        this.peerHousekeep[_message.peerId] = {
            peerId: _message.peerId,
            peerName: _message.peerName,
            roomName: _message.roomName,
        }
    };

    /**
     * ping all peers that are subscribed to each individual rooms
     */
    pingAllPeersAlive = async () => {
        if(this.houseKeepingInProgress) {
            console.log(`      -> housekeeping -> pinging all rooms ...`);
            const keys = Object.keys(this.rooms);

            // subscribe to all room ping alive topic
            await this.communicator.subscribe(new BusMsgSub(this.busTopics.baseRoomAlivePing("+").build(), this.onRoomAlive, PeerCredentials, 0));

            for (const key of keys) {
                // send ping message
                console.log(`        -> room '${key}' with id '${this.rooms[key].roomId}' pings joined peers ...`);
                await this.communicator.publish(new BusMsgPub(this.busTopics.baseRoomAlive(key).build(), RoomInfo, 1, false).encode(
                    {
                        "timestamp": Math.round(new Date().getTime() / 1000),
                        "roomId": this.rooms[key].roomId,
                        "roomName": key,
                    }
                ));
            }
            // now we have to wait a moment
            setTimeout(this.cleanOut, houseKeepingTimeOut);
        } else {
            // this means the housekeeping got interrupted and
            //  needs to finish as fast as possible to cleaning up all subscriptions.
            setTimeout(this.cleanOut, 0);
        }
    }

    /**
     * return messages from peers on room ping requests
     */
    onRoomAlive = async (_topic, _message, _packet) => {
        let accessGrant;
        let reason = "unknown";
        console.log(`        -> room '${_message.roomName}' alive ping from peer '${_message.peerName}'`);

        // if we receive this message, it means this peer is alive and we can remove it
        // from our housekeeping lists
        if (_message.peerId in this.peerHousekeep) {
            // before we send back a room access message, we have to make sure the room alive ping
            // came from a validly logged in peer:

            // we expect the password sent by the peer to be hashed, but the stored password to be
            // double hashed, so we double hash the peers password here
            let shaPassword = sha1(_message.roomPwd).substr(0, 10)
            if (this.rooms[_message.roomName].roomPwd === shaPassword) {
                // now we resend the access message
                // we need to do this in case the manager has crashed and restarted...
                // send access message
                accessGrant = true;
                reason = "confirmation";
                delete this.peerHousekeep[_message.peerId];

                // if even one joined peer replies to the room ping,
                // the room can be removed from this list
                if (this.roomHousekeep[_message.roomName] !== null) {
                    delete this.roomHousekeep[_message.roomName];
                }
            }
        } else {
            // this peer seems to be still alive and thinks it is joined.
            // we need to relieve it from its misery and allow it to leave
            // gracefully..
            accessGrant = false;
            reason = "not joined anymore";
            console.log(`            -> peer '${_message.peerName}' not joined anymore - reject from room`);
        }

        let room_ID = -1;
        let room_UUID = -1;

        // we also check if the room is still existing..
        if (this.rooms[_message.roomName] !== undefined){
            // we only set the id and UUID if the room still exists.
            room_ID = this.rooms[_message.roomName].roomId;
            room_UUID = this.rooms[_message.roomName].roomUUID;
        } else {
            accessGrant = false;
            reason = "room doesn't exist anymore";
            console.log(`            -> peer '${_message.peerName}' reject from non existing room '${_message.roomName}'`);
        }

        await this.publishRoomAccess(
            accessGrant,
            _message.peerId,
            _message.clientId,
            _message.peerName,
            _message.roomName,
            room_ID,
            room_UUID,
            _message.roomPwd,
            reason);

    };

    /**
     * cleanout dead peers and rooms
     */
    cleanOut = async () => {
        if(this.houseKeepingInProgress) {
            console.log(`      -> housekeeping -> cleaning out ...`);
            // flag the room as being in the process to be removed
            const flag4cleanupRooms = (currentRoom) => this.rooms[currentRoom.roomName].flagRoom4cleanup = true;
            Object.values(this.roomHousekeep).forEach(flag4cleanupRooms);

            // kick out the non-responding peers
            const kickOutPeer = async (currentPeer) => {
                console.log(`       <- remove peer '${currentPeer.peerName}' from room '${currentPeer.roomName}' `);
                // first we send clear retain message to peer joined addresses that have not replied:
                await this.communicator.clearRetain(this.busTopics.roomPeerJoin(currentPeer.roomName, currentPeer.peerId).build());

                // create the payload for the leave message
                const infoPayload = {
                    timestamp: Math.round(new Date().getTime() / 1000),
                    peerId: currentPeer.peerId,
                    peerName: currentPeer.peerName,
                    roomName: currentPeer.roomName
                };

                // sends the left message to all peers joined in the same room
                await this.communicator.publish(
                    new BusMsgPub(
                        this.busTopics.roomPeerLeft(currentPeer.roomName, currentPeer.peerId).build(),
                        PeerInfo, 2, true).encode(infoPayload));
            }
            const peerCleanup = async () => {
                for (const peer of Object.values(this.peerHousekeep)) {
                    await kickOutPeer(peer);
                }
            };
            await peerCleanup();
            
            // And now remove the rooms
            const cleanupRooms = async (currentRoom) => await this.deleteRoom(currentRoom.roomName);
            const housekeeping = async () => {
                for (const room of Object.values(this.roomHousekeep)) {
                    await cleanupRooms(room);
                }
            };
            await housekeeping();
            
            console.log(`      -> housekeeping DONE`);
        } else {
            console.log(`      -> housekeeping was interrupted`);
        }

        // and we stop by unsubscribing to all peer info messages inside all rooms
        await this.communicator.unsubscribe(this.busTopics.roomPeerJoin('+', '+').build());
        // unsubscribing to all room ping alive topic
        await this.communicator.unsubscribe(this.busTopics.baseRoomAlivePing("+").build());
        // cleanup the communicator
        this.communicator.clearAutoGeneratedSubscriptions();
        // set this flag to false at the end to make sure a new houskeeping cycle can only be started once
        // all topics are unsubscribed - otherwise it won't gather the joined peers inside the room.
        this.houseKeepingInProgress = false;
    }

    /**
     * called when a peer leaves a room or disconnects in a unmanaged way.
     */
    onPeerLeaving = async (_topic, _message, _packet) => {
        console.log(`  <- peer '${_message.peerName}' leaving`);
        let shaPassword = sha1(_message.roomPwd).substr(0, 10)
        if(this.rooms[_message.roomName] !== undefined){
            // make sure the leaving peer leaves a still existing room
            if (this.rooms[_message.roomName].roomPwd === shaPassword){
                // the actual message of this peer leaving the room is generated by the
                // housekeeping routine 'cleanOut':
                // we wait a moment to start with housekeeping, though.
                // it could be, that this message was called due to a short disconnect by the
                // peer to the broker - issuing a lastWill message by the broker.
                // by giving it some time the housekeeping process will verify if the peer
                // is still online or if it is really gone..
                setTimeout(this.startHousekeeping, houseKeepingTimeOut_onPeerLeft);
            } else {
                console.log(`!!! >BAD PLAYER<: somebody tried to remove peer without proper credentials!!!`);
            }
        }
    };

    /*********************************************************************
     **********************************************************************
     *
     *                        ACCESS MANAGEMENT
     *
     **********************************************************************
     **********************************************************************/

    /**
     * request from peer to access room
     *
     * >>> SECURITY consideration:
     *          In theory a bad actor could swamp this topic with new room creation
     *          requests. Very quickly all the room ids are taken.
     *          At the moment I have no idea how to avoid this.
     */
    onRoomAccess = async (_topic, _message, _packet) => {
        let accessGrant;
        let reason = "unknown";
        // check first the peer talks the same immersive Bus version as the manager.
        if(_message.protocolVersion === this.protocolVersion){
            // we expect the password sent by the peer to be hashed, but the stored password to be
            // double hashed, so we double hash the peers password here
            let clientId = _message.peerId;
            let shaPassword = sha1(_message.roomPwd).substr(0, 10)
            if (!this.rooms.hasOwnProperty(_message.roomName)){
                // room doesn't exist yet
                accessGrant = true;
                console.log(`  -> peer '${_message.peerName}' creating new room '${_message.roomName}' for app version: '${_message.appVersion}'`);
                reason = "no room of this name exists";
                await this.publishNewRoom(_message.roomName, shaPassword, _message.appVersion);
                // and we wait a moment to start with housekeeping again
                setTimeout(this.startHousekeeping, houseKeepingTimeOut_onPeerJoined);
            } else {
                //room exists: checked if the doubled hashed roomPwd is equal
                if (this.rooms[_message.roomName].roomPwd !== shaPassword) {
                    console.log(`  -> peer '${_message.peerName}' declined access to room: ${_message.roomName} | invalid password`);
                    accessGrant = false;
                    reason = "password invalid";
                } else if (this.rooms[_message.roomName].appVersion !== _message.appVersion) {
                    console.log(`  -> peer '${_message.peerName}' declined access to room: ${_message.roomName} | incompatible app version`);
                    accessGrant = false;
                    reason = `app version incompatible: required version is '${this.rooms[_message.roomName].appVersion}', yours is '${_message.appVersion}'`;
                } else if (this.rooms[_message.roomName].flagRoom4cleanup) {
                    console.log(`  -> peer '${_message.peerName}' declined access to room: ${_message.roomName} | room is in process of being removed`);
                    accessGrant = false;
                    reason = `room is in process of being removed. try again in a few seconds.`;
                } else {
                    accessGrant = true;
                    console.log(`  -> peer '${_message.peerName}' joining room '${_message.roomName}'`);
                    // if there is a housekeeping process in progress,
                    // we need it to stop it right here, otherwise the newly joined peer could be
                    // kicked out right away.
                    if (this.houseKeepingInProgress) {
                        console.log(`    -> peer '${_message.peerName}' joining interrupts housekeeping.. `);
                        this.houseKeepingInProgress = false;
                    }
                    // and we wait a moment to start with housekeeping again
                    setTimeout(this.startHousekeeping, houseKeepingTimeOut_onPeerJoined);
                }
            }
        } else {
            //console.log(`incompatible protocol version '${_message.protocolVersion}': room manager is running on tBus version '${this.protocolVersion}'`);
            accessGrant = false;
            reason = `incompatible protocol version '${_message.protocolVersion}': room manager is running on tBus version '${this.protocolVersion}'` ;
        }

        // send access message to peer only
        await this.publishRoomAccess(
            accessGrant,
            _message.peerId,
            _message.clientId,
            _message.peerName,
            _message.roomName,
            (accessGrant)?this.rooms[_message.roomName].roomId:0,
            (accessGrant)?this.rooms[_message.roomName].roomUUID:"0",
            _message.roomPwd,
            reason)

        if(accessGrant){
            // This sends a message to all peers joined to the room
            // first clear potentially retained leave message
            await this.communicator.clearRetain(this.busTopics.roomPeerLeft(_message.roomName, _message.peerId).build());
            // send peer joined message to all the peers in the room
            await this.communicator.publish(
                new BusMsgPub(
                    this.busTopics.roomPeerJoin(_message.roomName, _message.peerId).build(),
                    PeerInfo, 2, true).encode({
                        timestamp: Math.round(new Date().getTime() / 1000),
                        peerId: _message.peerId,
                        peerName: _message.peerName,
                        roomName: _message.roomName,
                        localIpV4: _message.localIpV4,
                        publicIpV4: _message.publicIpV4,
                    }));
        }
    };

    // This generates a message to the requesting peer only
    publishRoomAccess = async (_accessGranted, _peerId, _clientId, _peerName, _roomName, _roomId, _roomUuid, _roomPwd, _reason) => {
        await this.communicator.publish(
            new BusMsgPub(this.busTopics.basePeerRoomAccess(_clientId).build(),
                RoomAccess, 2, false).encode({
                    timestamp: Math.round(new Date().getTime() / 1000),
                    access: _accessGranted,
                    peerId: _peerId,
                    peerName: _peerName,
                    roomId: _roomId,
                    roomName: _roomName,
                    roomUuid: CryptoJS.AES.encrypt(_roomUuid, _roomPwd).toString(),
                    reason: _reason,
                }));
    }


    /*********************************************************************
     **********************************************************************
     *
     *                          ROOM MANAGEMENT
     *
     **********************************************************************
     **********************************************************************/
    /*   There are three ways a room can be created:
     *      - on connection of this script to the broker, this script gets retained messages:
     *         -> onRooms() -> createNewRoom()
     *      - on access request from a peer:
     *         -> onRoomAccess() -> publishNewRoom() -> createNewRoom()
     *      - for testing purposes
     *         max -> publishNewRoom() -> createNewRoom()
     */

    /**
     * publish a new room into the network
     * called when a peer request access to a non existing room.
     * @param {*} _roomName
     * @param {*} _roomPwd
     */
    publishNewRoom = async (_roomName, _roomPwd, _appVersion) => {
        // make sure the room really doesn't exists.
        if (!this.rooms.hasOwnProperty(_roomName)) {
            await this.createNewRoom(_roomName, _roomPwd, null, _appVersion);
            // send retained info message
            await this.communicator.publish(new BusMsgPub(this.busTopics.baseRoomInfo(_roomName).build(), RoomInfo, 2, true).encode(
                {
                    timestamp: Math.round(new Date().getTime() / 1000),
                    roomId: this.rooms[_roomName].roomId,
                    roomName: _roomName,
                    roomPwd: this.rooms[_roomName].roomPwd,
                    appVersion : _appVersion
                }
            ));
        }
    }

    /**
     * received when new room is created.
     * is called indirectly by publishNewRoom() or on startup by retained messages.
     */
    onRooms = async (_topic, _message, _packet) => {
        // since only the tBusManager creates new rooms, most likely the messages was received because
        // the tBusManager has restarted and gets now all the retained room infos.
        // this allows the tBusManager to get into the same state as before.
        if (!this.rooms.hasOwnProperty(_message.roomName)) {
            await this.createNewRoom(_message.roomName, _message.roomPwd, _message.roomId, _message.appVersion);
        }
    };

    /**
     * create a new room - either when a user tries to access a non existing room
     * or when a retained room message arrives on startup
     * @returns {Promise<void>}
     */
    createNewRoom = async (_roomName, _roomPwd, _roomId, _appVersion) => {
        let roomID = _roomId;
        // Generate short UUID as peerId
        let roomUUID = this.translator.new(); // mhvXdrZT4jP5T8vBxuvm75

        if(roomID === null)
            roomID = this.findUnusedRoomId();
        this.rooms[_roomName] = {
            roomName: _roomName,
            roomId: roomID,
            roomUUID: roomUUID,
            roomPwd: _roomPwd,
            appVersion: _appVersion,
            flagRoom4cleanup: false
        }
        console.log(`-> generate room: '${_roomName}' with id '${roomID}' and uuid: '${roomID}'`);
        console.log(`     with uuid: '${roomUUID}'`);
        // create a chatmanager for this room
        this.chatManagers[_roomName] = new ChatManager(this.communicator, _roomName, _roomPwd);
        // and connect it
        await this.chatManagers[_roomName].connect();
        await this.startServerSidePortScripts(_roomName, roomID);
    }

    /**
     * find the lowest ID to use as roomId
     */
    findUnusedRoomId = () => {
        //console.log(`all id values :${JSON.stringify(Object.values(this.rooms))}`);
        for (let i = ROOM_ID_MIN; i < ROOM_ID_MAX; i++) {
            const isEqual = (currentValue) => currentValue.roomId !== i;
            if (Object.values(this.rooms).every(isEqual)) {
                //console.log(`foundUnusedRoomId :${i}`);
                return i;
            }
        }
    }

    /**
     * deletes room, called by the housekeeping routine
     * @param {*} _roomName
     */
    deleteRoom = async (_roomName) => {
        // make sure the room really exists.
        if (this.rooms.hasOwnProperty(_roomName)) {
            console.log(`       <- remove room '${_roomName}' with id '${this.rooms[_roomName].roomId}' `);
            try {
                // stop the and cleanup the room chat
                if (this.chatManagers.hasOwnProperty(_roomName)) {
                    // stop the chatManager and delete it for this rom
                    await this.chatManagers[_roomName].disconnect();
                    delete this.chatManagers[_roomName];
                }

                // then we subscribe to all retained messages of this room
                await this.communicator.subscribe(new BusMsgSub(this.busTopics.baseRoomSubTopics(_roomName).build(), this.onAllRoomTopics, null, 0));

                // send delete room message to all listening peers
                await this.communicator.publish(new BusMsgPub(this.busTopics.roomDelete(_roomName).build(), RoomInfo, 2, false).encode(
                    {
                        timestamp: Math.round(new Date().getTime() / 1000),
                        roomId: this.rooms[_roomName].roomId,
                        roomName: _roomName
                    }
                ));

                // clear retained info message
                await this.communicator.clearRetain(this.busTopics.baseRoomInfo(_roomName).build());

                // and by now all retained messages in this room have been cleaned up
                await this.communicator.unsubscribe(this.busTopics.baseRoomSubTopics(_roomName).build());

                // stop the ports and delete room for good
                await this.stopServerSidePortScripts(_roomName, this.rooms[_roomName].roomId);
            } catch (e) {
                console.log(`      <! exception while removing room '${_roomName}': '${e.message}' `);
            }
        }
    }

    /**
     * received when room is deleted.
     * is called by subscriptionions created by deleteRoom() and has the purpose of cleaning up all retained messages inside this room
     */
    onAllRoomTopics = async (_topic, _message, _packet) => {
        // clear retained message
        await this.communicator.clearRetain(_topic);
        await this.communicator.unsubscribe(_topic);
        // console.log(`         <- removed retained topic '${_topic}' `);
    };

    /*********************************************************************
     **********************************************************************
     *
     *                     SERVER SIDE PORT SCRIPT
     *
     **********************************************************************
     **********************************************************************/

    /**
     * Start server side port scripts
     */
    startServerSidePortScripts = async (_roomName, _roomId) => {
        if(this.switchBoardURI !== null){
            console.log(`        -> starting ports for room '${_roomName}' on range '${_roomId}000 - ${_roomId}999`);
            /** the ultragrid needs two hundert range */
            for (let i = 0; i < 20; i++) {
                // OSC proxies
                try{
                    await this.addSwitchBoardProxy(_roomName,_roomId * 1000 + i * 10 + 9, _roomId * 1000 + i * 10 + 9, 'many2manyBi', "UDP proxy for OSC, channel:" + i);
                } catch(err){
                    console.error(`      ...: ${err}. Interrupting process of starting up many2manyBi script on port ${_roomId * 1000 + i * 10 + 9}.`);
                }
                // Ultragrid video and audio proxies
                try{
                    await this.addSwitchBoardProxy(_roomName, _roomId * 1000 + i * 10 + 2, _roomId * 1000 + i * 10 + 6,'one2manyMo', "Ultragrid-video proxy, channel:" + i);
                } catch(err){
                    console.error(`      ...: ${err}. Interrupting process of starting up one2manyMo script on port ${_roomId * 1000 + i * 10 + 2}.`);
                }
                try{
                    await this.addSwitchBoardProxy(_roomName, _roomId * 1000 + i * 10 + 4, _roomId * 1000 + i * 10 + 8, 'one2manyMo', "Ultragrid-audio / NatNet-data proxy, channel:" + i);
                } catch(err){
                    console.error(`      ...: ${err}. Interrupting process of starting up one2manyMo script on port ${_roomId * 1000 + i * 10 + 4}.`);
                }
                // NatNet2OSC and NatNetBridge proxies
                try{
                    await this.addSwitchBoardProxy(_roomName, _roomId * 1000 + i * 10 + 0, _roomId * 1000 + i * 10 + 1, 'one2manyBi', "MoCap/NatNet-Ctrl proxy, channel:" + i);
                } catch(err){
                    console.error(`      ...: ${err}. Interrupting process of starting up one2manyBi script on port ${_roomId * 1000 + i * 10 + 0}.`);
                }
            }
            // Stage Control Many to many proxy
            try{
                await this.addSwitchBoardProxy(_roomName,_roomId * 1000 + 902, _roomId * 1000 + 902, 'many2manyBi', "UDP proxy for Open Stage Control");
            } catch(err){
                console.error(`      ...: ${err}. Interrupting process of starting up many2manyBi script on port ${_roomId * 1000 + 902}.`);
            }
            try{
                await this.addSwitchBoardProxy(_roomName,_roomId * 1000 + 900, _roomId * 1000 + 902, 'OpenStageControl', "Open Stage Control instance");
            } catch(err){
                console.error(`      ...: ${err}. Interrupting process of starting up many2manyBi script on port ${_roomId * 1000 + 902}.`);
            }
            console.log(`        <- started all ports for room ${_roomName}`);
        } else {
            console.log(`        ...started no ports for room ${_roomName}: no switchboard url/port defined`);
        }
    }

    /**
     * Stop server side port scripts
     */
    stopServerSidePortScripts = async (_roomName, _roomId) => {
        if(this.switchBoardURI !== null) {
            console.log(`        -> stopping ports for room '${_roomName}' on range '${_roomId}000 - ${_roomId}999`);
            for (let i = 0; i < 20; i++) {
                try{
                    await this.deleteSwitchBoardProxy(_roomId * 1000 + i * 10 + 9);
                } catch(err){
                    console.error(`      ...: ${err}. Interrupting process of stopping many2manyBi script on port ${_roomId * 1000 + i * 10 + 9}.`);
                }
                try{
                    await this.deleteSwitchBoardProxy(_roomId * 1000 + i * 10 + 2);
                } catch(err){
                    console.error(`      ...: ${err}. Interrupting process of stopping one2manyMo script on port ${_roomId * 1000 + i * 10 + 2}.`);
                }
                try{
                    await this.deleteSwitchBoardProxy(_roomId * 1000 + i * 10 + 4);
                } catch(err){
                    console.error(`      ...: ${err}. Interrupting process of stopping one2manyMo script on port ${_roomId * 1000 + i * 10 + 4}.`);
                }
                try{
                    await this.deleteSwitchBoardProxy(_roomId * 1000 + i * 10 + 0);
                } catch(err){
                    console.error(`      ...: ${err}. Interrupting process of stopping one2manyBi script on port ${_roomId * 1000 + i * 10 + 0}.`);
                }
            }
            try{
                await this.deleteSwitchBoardProxy(_roomId * 1000 + 902);
            } catch(err){
                console.error(`      ...: ${err}. Interrupting process of stopping many2manyBi script on port ${_roomId * 1000 + 902}.`);
            }
            try{
                await this.deleteSwitchBoardProxy(_roomId * 1000 + 900);
            } catch(err){
                console.error(`      ...: ${err}. Interrupting process of stopping open stage control instance on port ${_roomId * 1000 + 900}.`);
            }
            console.log(`        <- stopped all ports for room ${_roomName}`);
            delete this.rooms[_roomName];
            console.log(`        <- removed room ${_roomName}`);
        }else {
            console.log(`        ...stopped no ports for room ${_roomName}: no switchboard url/port defined`);
        }
    }

    /**
     * start individual server side port proxy
     */
    addSwitchBoardProxy = async (_room, _port, _many_port, _type, _description) => {
        try {
            let payload = { room: _room, port: _port, many_port: _many_port, type: _type, description: _description };
            await superagent.post(this.switchBoardURI).send(payload).then(res => {

            });
            //let reply = JSON.parse(res["text"]);
        } catch (err) {
            //console.error(err);
            let reply = JSON.parse(err.response["text"]);
            throw new Error(reply["msg"]);
        }
    }

    /**
     * stop individual server side port proxy
     */
    deleteSwitchBoardProxy = async (_port) => {
        try {
            const res = await superagent.delete(this.switchBoardURI + _port).then(res => {
            });
            //let reply = JSON.parse(res["text"]);
        } catch (err) {
            let reply = JSON.parse(err.response["text"]);
            throw new Error(reply["msg"]);
        }
    }

}

module.exports = BusManager;
