/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.PeerCredentials = (function() {

    /**
     * Properties of a PeerCredentials.
     * @exports IPeerCredentials
     * @interface IPeerCredentials
     * @property {number|Long|null} [timestamp] PeerCredentials timestamp
     * @property {string|null} [protocolVersion] PeerCredentials protocolVersion
     * @property {string|null} [peerId] PeerCredentials peerId
     * @property {string|null} [peerName] PeerCredentials peerName
     * @property {string|null} [roomName] PeerCredentials roomName
     * @property {string|null} [roomPwd] PeerCredentials roomPwd
     * @property {string|null} [localIpV4] PeerCredentials localIpV4
     * @property {string|null} [publicIpV4] PeerCredentials publicIpV4
     * @property {string|null} [clientId] PeerCredentials clientId
     * @property {string|null} [appVersion] PeerCredentials appVersion
     * @property {Uint8Array|null} [userData] PeerCredentials userData
     */

    /**
     * Constructs a new PeerCredentials.
     * @exports PeerCredentials
     * @classdesc Represents a PeerCredentials.
     * @implements IPeerCredentials
     * @constructor
     * @param {IPeerCredentials=} [properties] Properties to set
     */
    function PeerCredentials(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PeerCredentials timestamp.
     * @member {number|Long} timestamp
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * PeerCredentials protocolVersion.
     * @member {string} protocolVersion
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.protocolVersion = "";

    /**
     * PeerCredentials peerId.
     * @member {string} peerId
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.peerId = "";

    /**
     * PeerCredentials peerName.
     * @member {string} peerName
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.peerName = "";

    /**
     * PeerCredentials roomName.
     * @member {string} roomName
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.roomName = "";

    /**
     * PeerCredentials roomPwd.
     * @member {string} roomPwd
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.roomPwd = "";

    /**
     * PeerCredentials localIpV4.
     * @member {string} localIpV4
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.localIpV4 = "";

    /**
     * PeerCredentials publicIpV4.
     * @member {string} publicIpV4
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.publicIpV4 = "";

    /**
     * PeerCredentials clientId.
     * @member {string} clientId
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.clientId = "";

    /**
     * PeerCredentials appVersion.
     * @member {string} appVersion
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.appVersion = "";

    /**
     * PeerCredentials userData.
     * @member {Uint8Array} userData
     * @memberof PeerCredentials
     * @instance
     */
    PeerCredentials.prototype.userData = $util.newBuffer([]);

    /**
     * Creates a new PeerCredentials instance using the specified properties.
     * @function create
     * @memberof PeerCredentials
     * @static
     * @param {IPeerCredentials=} [properties] Properties to set
     * @returns {PeerCredentials} PeerCredentials instance
     */
    PeerCredentials.create = function create(properties) {
        return new PeerCredentials(properties);
    };

    /**
     * Encodes the specified PeerCredentials message. Does not implicitly {@link PeerCredentials.verify|verify} messages.
     * @function encode
     * @memberof PeerCredentials
     * @static
     * @param {IPeerCredentials} message PeerCredentials message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PeerCredentials.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
        if (message.protocolVersion != null && Object.hasOwnProperty.call(message, "protocolVersion"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.protocolVersion);
        if (message.peerId != null && Object.hasOwnProperty.call(message, "peerId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.peerId);
        if (message.peerName != null && Object.hasOwnProperty.call(message, "peerName"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.peerName);
        if (message.roomName != null && Object.hasOwnProperty.call(message, "roomName"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.roomName);
        if (message.roomPwd != null && Object.hasOwnProperty.call(message, "roomPwd"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.roomPwd);
        if (message.localIpV4 != null && Object.hasOwnProperty.call(message, "localIpV4"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.localIpV4);
        if (message.publicIpV4 != null && Object.hasOwnProperty.call(message, "publicIpV4"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.publicIpV4);
        if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.clientId);
        if (message.appVersion != null && Object.hasOwnProperty.call(message, "appVersion"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.appVersion);
        if (message.userData != null && Object.hasOwnProperty.call(message, "userData"))
            writer.uint32(/* id 11, wireType 2 =*/90).bytes(message.userData);
        return writer;
    };

    /**
     * Encodes the specified PeerCredentials message, length delimited. Does not implicitly {@link PeerCredentials.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PeerCredentials
     * @static
     * @param {IPeerCredentials} message PeerCredentials message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PeerCredentials.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PeerCredentials message from the specified reader or buffer.
     * @function decode
     * @memberof PeerCredentials
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PeerCredentials} PeerCredentials
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PeerCredentials.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PeerCredentials();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.timestamp = reader.int64();
                break;
            case 2:
                message.protocolVersion = reader.string();
                break;
            case 3:
                message.peerId = reader.string();
                break;
            case 4:
                message.peerName = reader.string();
                break;
            case 5:
                message.roomName = reader.string();
                break;
            case 6:
                message.roomPwd = reader.string();
                break;
            case 7:
                message.localIpV4 = reader.string();
                break;
            case 8:
                message.publicIpV4 = reader.string();
                break;
            case 9:
                message.clientId = reader.string();
                break;
            case 10:
                message.appVersion = reader.string();
                break;
            case 11:
                message.userData = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PeerCredentials message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PeerCredentials
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PeerCredentials} PeerCredentials
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PeerCredentials.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PeerCredentials message.
     * @function verify
     * @memberof PeerCredentials
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PeerCredentials.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
            if (!$util.isString(message.protocolVersion))
                return "protocolVersion: string expected";
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            if (!$util.isString(message.peerId))
                return "peerId: string expected";
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            if (!$util.isString(message.peerName))
                return "peerName: string expected";
        if (message.roomName != null && message.hasOwnProperty("roomName"))
            if (!$util.isString(message.roomName))
                return "roomName: string expected";
        if (message.roomPwd != null && message.hasOwnProperty("roomPwd"))
            if (!$util.isString(message.roomPwd))
                return "roomPwd: string expected";
        if (message.localIpV4 != null && message.hasOwnProperty("localIpV4"))
            if (!$util.isString(message.localIpV4))
                return "localIpV4: string expected";
        if (message.publicIpV4 != null && message.hasOwnProperty("publicIpV4"))
            if (!$util.isString(message.publicIpV4))
                return "publicIpV4: string expected";
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (!$util.isString(message.clientId))
                return "clientId: string expected";
        if (message.appVersion != null && message.hasOwnProperty("appVersion"))
            if (!$util.isString(message.appVersion))
                return "appVersion: string expected";
        if (message.userData != null && message.hasOwnProperty("userData"))
            if (!(message.userData && typeof message.userData.length === "number" || $util.isString(message.userData)))
                return "userData: buffer expected";
        return null;
    };

    /**
     * Creates a PeerCredentials message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PeerCredentials
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PeerCredentials} PeerCredentials
     */
    PeerCredentials.fromObject = function fromObject(object) {
        if (object instanceof $root.PeerCredentials)
            return object;
        var message = new $root.PeerCredentials();
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.protocolVersion != null)
            message.protocolVersion = String(object.protocolVersion);
        if (object.peerId != null)
            message.peerId = String(object.peerId);
        if (object.peerName != null)
            message.peerName = String(object.peerName);
        if (object.roomName != null)
            message.roomName = String(object.roomName);
        if (object.roomPwd != null)
            message.roomPwd = String(object.roomPwd);
        if (object.localIpV4 != null)
            message.localIpV4 = String(object.localIpV4);
        if (object.publicIpV4 != null)
            message.publicIpV4 = String(object.publicIpV4);
        if (object.clientId != null)
            message.clientId = String(object.clientId);
        if (object.appVersion != null)
            message.appVersion = String(object.appVersion);
        if (object.userData != null)
            if (typeof object.userData === "string")
                $util.base64.decode(object.userData, message.userData = $util.newBuffer($util.base64.length(object.userData)), 0);
            else if (object.userData.length)
                message.userData = object.userData;
        return message;
    };

    /**
     * Creates a plain object from a PeerCredentials message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PeerCredentials
     * @static
     * @param {PeerCredentials} message PeerCredentials
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PeerCredentials.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
            object.protocolVersion = "";
            object.peerId = "";
            object.peerName = "";
            object.roomName = "";
            object.roomPwd = "";
            object.localIpV4 = "";
            object.publicIpV4 = "";
            object.clientId = "";
            object.appVersion = "";
            if (options.bytes === String)
                object.userData = "";
            else {
                object.userData = [];
                if (options.bytes !== Array)
                    object.userData = $util.newBuffer(object.userData);
            }
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
            object.protocolVersion = message.protocolVersion;
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            object.peerId = message.peerId;
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            object.peerName = message.peerName;
        if (message.roomName != null && message.hasOwnProperty("roomName"))
            object.roomName = message.roomName;
        if (message.roomPwd != null && message.hasOwnProperty("roomPwd"))
            object.roomPwd = message.roomPwd;
        if (message.localIpV4 != null && message.hasOwnProperty("localIpV4"))
            object.localIpV4 = message.localIpV4;
        if (message.publicIpV4 != null && message.hasOwnProperty("publicIpV4"))
            object.publicIpV4 = message.publicIpV4;
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            object.clientId = message.clientId;
        if (message.appVersion != null && message.hasOwnProperty("appVersion"))
            object.appVersion = message.appVersion;
        if (message.userData != null && message.hasOwnProperty("userData"))
            object.userData = options.bytes === String ? $util.base64.encode(message.userData, 0, message.userData.length) : options.bytes === Array ? Array.prototype.slice.call(message.userData) : message.userData;
        return object;
    };

    /**
     * Converts this PeerCredentials to JSON.
     * @function toJSON
     * @memberof PeerCredentials
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PeerCredentials.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PeerCredentials;
})();

$root.PeerInfo = (function() {

    /**
     * Properties of a PeerInfo.
     * @exports IPeerInfo
     * @interface IPeerInfo
     * @property {number|Long|null} [timestamp] PeerInfo timestamp
     * @property {string|null} [peerId] PeerInfo peerId
     * @property {string|null} [peerName] PeerInfo peerName
     * @property {string|null} [roomName] PeerInfo roomName
     * @property {string|null} [localIpV4] PeerInfo localIpV4
     * @property {string|null} [publicIpV4] PeerInfo publicIpV4
     * @property {Uint8Array|null} [userData] PeerInfo userData
     */

    /**
     * Constructs a new PeerInfo.
     * @exports PeerInfo
     * @classdesc Represents a PeerInfo.
     * @implements IPeerInfo
     * @constructor
     * @param {IPeerInfo=} [properties] Properties to set
     */
    function PeerInfo(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PeerInfo timestamp.
     * @member {number|Long} timestamp
     * @memberof PeerInfo
     * @instance
     */
    PeerInfo.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * PeerInfo peerId.
     * @member {string} peerId
     * @memberof PeerInfo
     * @instance
     */
    PeerInfo.prototype.peerId = "";

    /**
     * PeerInfo peerName.
     * @member {string} peerName
     * @memberof PeerInfo
     * @instance
     */
    PeerInfo.prototype.peerName = "";

    /**
     * PeerInfo roomName.
     * @member {string} roomName
     * @memberof PeerInfo
     * @instance
     */
    PeerInfo.prototype.roomName = "";

    /**
     * PeerInfo localIpV4.
     * @member {string} localIpV4
     * @memberof PeerInfo
     * @instance
     */
    PeerInfo.prototype.localIpV4 = "";

    /**
     * PeerInfo publicIpV4.
     * @member {string} publicIpV4
     * @memberof PeerInfo
     * @instance
     */
    PeerInfo.prototype.publicIpV4 = "";

    /**
     * PeerInfo userData.
     * @member {Uint8Array} userData
     * @memberof PeerInfo
     * @instance
     */
    PeerInfo.prototype.userData = $util.newBuffer([]);

    /**
     * Creates a new PeerInfo instance using the specified properties.
     * @function create
     * @memberof PeerInfo
     * @static
     * @param {IPeerInfo=} [properties] Properties to set
     * @returns {PeerInfo} PeerInfo instance
     */
    PeerInfo.create = function create(properties) {
        return new PeerInfo(properties);
    };

    /**
     * Encodes the specified PeerInfo message. Does not implicitly {@link PeerInfo.verify|verify} messages.
     * @function encode
     * @memberof PeerInfo
     * @static
     * @param {IPeerInfo} message PeerInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PeerInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
        if (message.peerId != null && Object.hasOwnProperty.call(message, "peerId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.peerId);
        if (message.peerName != null && Object.hasOwnProperty.call(message, "peerName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.peerName);
        if (message.roomName != null && Object.hasOwnProperty.call(message, "roomName"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.roomName);
        if (message.localIpV4 != null && Object.hasOwnProperty.call(message, "localIpV4"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.localIpV4);
        if (message.publicIpV4 != null && Object.hasOwnProperty.call(message, "publicIpV4"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.publicIpV4);
        if (message.userData != null && Object.hasOwnProperty.call(message, "userData"))
            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.userData);
        return writer;
    };

    /**
     * Encodes the specified PeerInfo message, length delimited. Does not implicitly {@link PeerInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PeerInfo
     * @static
     * @param {IPeerInfo} message PeerInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PeerInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PeerInfo message from the specified reader or buffer.
     * @function decode
     * @memberof PeerInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PeerInfo} PeerInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PeerInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PeerInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.timestamp = reader.int64();
                break;
            case 2:
                message.peerId = reader.string();
                break;
            case 3:
                message.peerName = reader.string();
                break;
            case 4:
                message.roomName = reader.string();
                break;
            case 5:
                message.localIpV4 = reader.string();
                break;
            case 6:
                message.publicIpV4 = reader.string();
                break;
            case 7:
                message.userData = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PeerInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PeerInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PeerInfo} PeerInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PeerInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PeerInfo message.
     * @function verify
     * @memberof PeerInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PeerInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            if (!$util.isString(message.peerId))
                return "peerId: string expected";
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            if (!$util.isString(message.peerName))
                return "peerName: string expected";
        if (message.roomName != null && message.hasOwnProperty("roomName"))
            if (!$util.isString(message.roomName))
                return "roomName: string expected";
        if (message.localIpV4 != null && message.hasOwnProperty("localIpV4"))
            if (!$util.isString(message.localIpV4))
                return "localIpV4: string expected";
        if (message.publicIpV4 != null && message.hasOwnProperty("publicIpV4"))
            if (!$util.isString(message.publicIpV4))
                return "publicIpV4: string expected";
        if (message.userData != null && message.hasOwnProperty("userData"))
            if (!(message.userData && typeof message.userData.length === "number" || $util.isString(message.userData)))
                return "userData: buffer expected";
        return null;
    };

    /**
     * Creates a PeerInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PeerInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PeerInfo} PeerInfo
     */
    PeerInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.PeerInfo)
            return object;
        var message = new $root.PeerInfo();
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.peerId != null)
            message.peerId = String(object.peerId);
        if (object.peerName != null)
            message.peerName = String(object.peerName);
        if (object.roomName != null)
            message.roomName = String(object.roomName);
        if (object.localIpV4 != null)
            message.localIpV4 = String(object.localIpV4);
        if (object.publicIpV4 != null)
            message.publicIpV4 = String(object.publicIpV4);
        if (object.userData != null)
            if (typeof object.userData === "string")
                $util.base64.decode(object.userData, message.userData = $util.newBuffer($util.base64.length(object.userData)), 0);
            else if (object.userData.length)
                message.userData = object.userData;
        return message;
    };

    /**
     * Creates a plain object from a PeerInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PeerInfo
     * @static
     * @param {PeerInfo} message PeerInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PeerInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
            object.peerId = "";
            object.peerName = "";
            object.roomName = "";
            object.localIpV4 = "";
            object.publicIpV4 = "";
            if (options.bytes === String)
                object.userData = "";
            else {
                object.userData = [];
                if (options.bytes !== Array)
                    object.userData = $util.newBuffer(object.userData);
            }
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            object.peerId = message.peerId;
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            object.peerName = message.peerName;
        if (message.roomName != null && message.hasOwnProperty("roomName"))
            object.roomName = message.roomName;
        if (message.localIpV4 != null && message.hasOwnProperty("localIpV4"))
            object.localIpV4 = message.localIpV4;
        if (message.publicIpV4 != null && message.hasOwnProperty("publicIpV4"))
            object.publicIpV4 = message.publicIpV4;
        if (message.userData != null && message.hasOwnProperty("userData"))
            object.userData = options.bytes === String ? $util.base64.encode(message.userData, 0, message.userData.length) : options.bytes === Array ? Array.prototype.slice.call(message.userData) : message.userData;
        return object;
    };

    /**
     * Converts this PeerInfo to JSON.
     * @function toJSON
     * @memberof PeerInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PeerInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PeerInfo;
})();

$root.RoomInfo = (function() {

    /**
     * Properties of a RoomInfo.
     * @exports IRoomInfo
     * @interface IRoomInfo
     * @property {number|Long|null} [timestamp] RoomInfo timestamp
     * @property {number|null} [roomId] RoomInfo roomId
     * @property {string|null} [roomName] RoomInfo roomName
     * @property {string|null} [roomPwd] RoomInfo roomPwd
     * @property {string|null} [appVersion] RoomInfo appVersion
     * @property {Uint8Array|null} [userData] RoomInfo userData
     */

    /**
     * Constructs a new RoomInfo.
     * @exports RoomInfo
     * @classdesc Represents a RoomInfo.
     * @implements IRoomInfo
     * @constructor
     * @param {IRoomInfo=} [properties] Properties to set
     */
    function RoomInfo(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RoomInfo timestamp.
     * @member {number|Long} timestamp
     * @memberof RoomInfo
     * @instance
     */
    RoomInfo.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * RoomInfo roomId.
     * @member {number} roomId
     * @memberof RoomInfo
     * @instance
     */
    RoomInfo.prototype.roomId = 0;

    /**
     * RoomInfo roomName.
     * @member {string} roomName
     * @memberof RoomInfo
     * @instance
     */
    RoomInfo.prototype.roomName = "";

    /**
     * RoomInfo roomPwd.
     * @member {string} roomPwd
     * @memberof RoomInfo
     * @instance
     */
    RoomInfo.prototype.roomPwd = "";

    /**
     * RoomInfo appVersion.
     * @member {string} appVersion
     * @memberof RoomInfo
     * @instance
     */
    RoomInfo.prototype.appVersion = "";

    /**
     * RoomInfo userData.
     * @member {Uint8Array} userData
     * @memberof RoomInfo
     * @instance
     */
    RoomInfo.prototype.userData = $util.newBuffer([]);

    /**
     * Creates a new RoomInfo instance using the specified properties.
     * @function create
     * @memberof RoomInfo
     * @static
     * @param {IRoomInfo=} [properties] Properties to set
     * @returns {RoomInfo} RoomInfo instance
     */
    RoomInfo.create = function create(properties) {
        return new RoomInfo(properties);
    };

    /**
     * Encodes the specified RoomInfo message. Does not implicitly {@link RoomInfo.verify|verify} messages.
     * @function encode
     * @memberof RoomInfo
     * @static
     * @param {IRoomInfo} message RoomInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RoomInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
        if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roomId);
        if (message.roomName != null && Object.hasOwnProperty.call(message, "roomName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.roomName);
        if (message.roomPwd != null && Object.hasOwnProperty.call(message, "roomPwd"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.roomPwd);
        if (message.appVersion != null && Object.hasOwnProperty.call(message, "appVersion"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.appVersion);
        if (message.userData != null && Object.hasOwnProperty.call(message, "userData"))
            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.userData);
        return writer;
    };

    /**
     * Encodes the specified RoomInfo message, length delimited. Does not implicitly {@link RoomInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RoomInfo
     * @static
     * @param {IRoomInfo} message RoomInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RoomInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RoomInfo message from the specified reader or buffer.
     * @function decode
     * @memberof RoomInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RoomInfo} RoomInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RoomInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoomInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.timestamp = reader.int64();
                break;
            case 2:
                message.roomId = reader.int32();
                break;
            case 3:
                message.roomName = reader.string();
                break;
            case 4:
                message.roomPwd = reader.string();
                break;
            case 5:
                message.appVersion = reader.string();
                break;
            case 6:
                message.userData = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RoomInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RoomInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RoomInfo} RoomInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RoomInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RoomInfo message.
     * @function verify
     * @memberof RoomInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RoomInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        if (message.roomId != null && message.hasOwnProperty("roomId"))
            if (!$util.isInteger(message.roomId))
                return "roomId: integer expected";
        if (message.roomName != null && message.hasOwnProperty("roomName"))
            if (!$util.isString(message.roomName))
                return "roomName: string expected";
        if (message.roomPwd != null && message.hasOwnProperty("roomPwd"))
            if (!$util.isString(message.roomPwd))
                return "roomPwd: string expected";
        if (message.appVersion != null && message.hasOwnProperty("appVersion"))
            if (!$util.isString(message.appVersion))
                return "appVersion: string expected";
        if (message.userData != null && message.hasOwnProperty("userData"))
            if (!(message.userData && typeof message.userData.length === "number" || $util.isString(message.userData)))
                return "userData: buffer expected";
        return null;
    };

    /**
     * Creates a RoomInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RoomInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RoomInfo} RoomInfo
     */
    RoomInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.RoomInfo)
            return object;
        var message = new $root.RoomInfo();
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.roomId != null)
            message.roomId = object.roomId | 0;
        if (object.roomName != null)
            message.roomName = String(object.roomName);
        if (object.roomPwd != null)
            message.roomPwd = String(object.roomPwd);
        if (object.appVersion != null)
            message.appVersion = String(object.appVersion);
        if (object.userData != null)
            if (typeof object.userData === "string")
                $util.base64.decode(object.userData, message.userData = $util.newBuffer($util.base64.length(object.userData)), 0);
            else if (object.userData.length)
                message.userData = object.userData;
        return message;
    };

    /**
     * Creates a plain object from a RoomInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RoomInfo
     * @static
     * @param {RoomInfo} message RoomInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RoomInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
            object.roomId = 0;
            object.roomName = "";
            object.roomPwd = "";
            object.appVersion = "";
            if (options.bytes === String)
                object.userData = "";
            else {
                object.userData = [];
                if (options.bytes !== Array)
                    object.userData = $util.newBuffer(object.userData);
            }
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.roomId != null && message.hasOwnProperty("roomId"))
            object.roomId = message.roomId;
        if (message.roomName != null && message.hasOwnProperty("roomName"))
            object.roomName = message.roomName;
        if (message.roomPwd != null && message.hasOwnProperty("roomPwd"))
            object.roomPwd = message.roomPwd;
        if (message.appVersion != null && message.hasOwnProperty("appVersion"))
            object.appVersion = message.appVersion;
        if (message.userData != null && message.hasOwnProperty("userData"))
            object.userData = options.bytes === String ? $util.base64.encode(message.userData, 0, message.userData.length) : options.bytes === Array ? Array.prototype.slice.call(message.userData) : message.userData;
        return object;
    };

    /**
     * Converts this RoomInfo to JSON.
     * @function toJSON
     * @memberof RoomInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RoomInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RoomInfo;
})();

$root.RoomAccess = (function() {

    /**
     * Properties of a RoomAccess.
     * @exports IRoomAccess
     * @interface IRoomAccess
     * @property {number|Long|null} [timestamp] RoomAccess timestamp
     * @property {boolean|null} [access] RoomAccess access
     * @property {string|null} [peerId] RoomAccess peerId
     * @property {string|null} [peerName] RoomAccess peerName
     * @property {number|null} [roomId] RoomAccess roomId
     * @property {string|null} [roomName] RoomAccess roomName
     * @property {string|null} [reason] RoomAccess reason
     * @property {string|null} [roomUuid] RoomAccess roomUuid
     * @property {string|null} [appVersion] RoomAccess appVersion
     * @property {Uint8Array|null} [userData] RoomAccess userData
     */

    /**
     * Constructs a new RoomAccess.
     * @exports RoomAccess
     * @classdesc Represents a RoomAccess.
     * @implements IRoomAccess
     * @constructor
     * @param {IRoomAccess=} [properties] Properties to set
     */
    function RoomAccess(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RoomAccess timestamp.
     * @member {number|Long} timestamp
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * RoomAccess access.
     * @member {boolean} access
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.access = false;

    /**
     * RoomAccess peerId.
     * @member {string} peerId
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.peerId = "";

    /**
     * RoomAccess peerName.
     * @member {string} peerName
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.peerName = "";

    /**
     * RoomAccess roomId.
     * @member {number} roomId
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.roomId = 0;

    /**
     * RoomAccess roomName.
     * @member {string} roomName
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.roomName = "";

    /**
     * RoomAccess reason.
     * @member {string} reason
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.reason = "";

    /**
     * RoomAccess roomUuid.
     * @member {string} roomUuid
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.roomUuid = "";

    /**
     * RoomAccess appVersion.
     * @member {string} appVersion
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.appVersion = "";

    /**
     * RoomAccess userData.
     * @member {Uint8Array} userData
     * @memberof RoomAccess
     * @instance
     */
    RoomAccess.prototype.userData = $util.newBuffer([]);

    /**
     * Creates a new RoomAccess instance using the specified properties.
     * @function create
     * @memberof RoomAccess
     * @static
     * @param {IRoomAccess=} [properties] Properties to set
     * @returns {RoomAccess} RoomAccess instance
     */
    RoomAccess.create = function create(properties) {
        return new RoomAccess(properties);
    };

    /**
     * Encodes the specified RoomAccess message. Does not implicitly {@link RoomAccess.verify|verify} messages.
     * @function encode
     * @memberof RoomAccess
     * @static
     * @param {IRoomAccess} message RoomAccess message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RoomAccess.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
        if (message.access != null && Object.hasOwnProperty.call(message, "access"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.access);
        if (message.peerId != null && Object.hasOwnProperty.call(message, "peerId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.peerId);
        if (message.peerName != null && Object.hasOwnProperty.call(message, "peerName"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.peerName);
        if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.roomId);
        if (message.roomName != null && Object.hasOwnProperty.call(message, "roomName"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.roomName);
        if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.reason);
        if (message.roomUuid != null && Object.hasOwnProperty.call(message, "roomUuid"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.roomUuid);
        if (message.appVersion != null && Object.hasOwnProperty.call(message, "appVersion"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.appVersion);
        if (message.userData != null && Object.hasOwnProperty.call(message, "userData"))
            writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.userData);
        return writer;
    };

    /**
     * Encodes the specified RoomAccess message, length delimited. Does not implicitly {@link RoomAccess.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RoomAccess
     * @static
     * @param {IRoomAccess} message RoomAccess message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RoomAccess.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RoomAccess message from the specified reader or buffer.
     * @function decode
     * @memberof RoomAccess
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RoomAccess} RoomAccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RoomAccess.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoomAccess();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.timestamp = reader.int64();
                break;
            case 2:
                message.access = reader.bool();
                break;
            case 3:
                message.peerId = reader.string();
                break;
            case 4:
                message.peerName = reader.string();
                break;
            case 5:
                message.roomId = reader.int32();
                break;
            case 6:
                message.roomName = reader.string();
                break;
            case 7:
                message.reason = reader.string();
                break;
            case 8:
                message.roomUuid = reader.string();
                break;
            case 9:
                message.appVersion = reader.string();
                break;
            case 10:
                message.userData = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RoomAccess message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RoomAccess
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RoomAccess} RoomAccess
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RoomAccess.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RoomAccess message.
     * @function verify
     * @memberof RoomAccess
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RoomAccess.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        if (message.access != null && message.hasOwnProperty("access"))
            if (typeof message.access !== "boolean")
                return "access: boolean expected";
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            if (!$util.isString(message.peerId))
                return "peerId: string expected";
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            if (!$util.isString(message.peerName))
                return "peerName: string expected";
        if (message.roomId != null && message.hasOwnProperty("roomId"))
            if (!$util.isInteger(message.roomId))
                return "roomId: integer expected";
        if (message.roomName != null && message.hasOwnProperty("roomName"))
            if (!$util.isString(message.roomName))
                return "roomName: string expected";
        if (message.reason != null && message.hasOwnProperty("reason"))
            if (!$util.isString(message.reason))
                return "reason: string expected";
        if (message.roomUuid != null && message.hasOwnProperty("roomUuid"))
            if (!$util.isString(message.roomUuid))
                return "roomUuid: string expected";
        if (message.appVersion != null && message.hasOwnProperty("appVersion"))
            if (!$util.isString(message.appVersion))
                return "appVersion: string expected";
        if (message.userData != null && message.hasOwnProperty("userData"))
            if (!(message.userData && typeof message.userData.length === "number" || $util.isString(message.userData)))
                return "userData: buffer expected";
        return null;
    };

    /**
     * Creates a RoomAccess message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RoomAccess
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RoomAccess} RoomAccess
     */
    RoomAccess.fromObject = function fromObject(object) {
        if (object instanceof $root.RoomAccess)
            return object;
        var message = new $root.RoomAccess();
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.access != null)
            message.access = Boolean(object.access);
        if (object.peerId != null)
            message.peerId = String(object.peerId);
        if (object.peerName != null)
            message.peerName = String(object.peerName);
        if (object.roomId != null)
            message.roomId = object.roomId | 0;
        if (object.roomName != null)
            message.roomName = String(object.roomName);
        if (object.reason != null)
            message.reason = String(object.reason);
        if (object.roomUuid != null)
            message.roomUuid = String(object.roomUuid);
        if (object.appVersion != null)
            message.appVersion = String(object.appVersion);
        if (object.userData != null)
            if (typeof object.userData === "string")
                $util.base64.decode(object.userData, message.userData = $util.newBuffer($util.base64.length(object.userData)), 0);
            else if (object.userData.length)
                message.userData = object.userData;
        return message;
    };

    /**
     * Creates a plain object from a RoomAccess message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RoomAccess
     * @static
     * @param {RoomAccess} message RoomAccess
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RoomAccess.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
            object.access = false;
            object.peerId = "";
            object.peerName = "";
            object.roomId = 0;
            object.roomName = "";
            object.reason = "";
            object.roomUuid = "";
            object.appVersion = "";
            if (options.bytes === String)
                object.userData = "";
            else {
                object.userData = [];
                if (options.bytes !== Array)
                    object.userData = $util.newBuffer(object.userData);
            }
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.access != null && message.hasOwnProperty("access"))
            object.access = message.access;
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            object.peerId = message.peerId;
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            object.peerName = message.peerName;
        if (message.roomId != null && message.hasOwnProperty("roomId"))
            object.roomId = message.roomId;
        if (message.roomName != null && message.hasOwnProperty("roomName"))
            object.roomName = message.roomName;
        if (message.reason != null && message.hasOwnProperty("reason"))
            object.reason = message.reason;
        if (message.roomUuid != null && message.hasOwnProperty("roomUuid"))
            object.roomUuid = message.roomUuid;
        if (message.appVersion != null && message.hasOwnProperty("appVersion"))
            object.appVersion = message.appVersion;
        if (message.userData != null && message.hasOwnProperty("userData"))
            object.userData = options.bytes === String ? $util.base64.encode(message.userData, 0, message.userData.length) : options.bytes === Array ? Array.prototype.slice.call(message.userData) : message.userData;
        return object;
    };

    /**
     * Converts this RoomAccess to JSON.
     * @function toJSON
     * @memberof RoomAccess
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RoomAccess.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RoomAccess;
})();

$root.ChatMessage = (function() {

    /**
     * Properties of a ChatMessage.
     * @exports IChatMessage
     * @interface IChatMessage
     * @property {number|Long|null} [timestamp] ChatMessage timestamp
     * @property {string|null} [peerId] ChatMessage peerId
     * @property {string|null} [peerName] ChatMessage peerName
     * @property {string|null} [roomPwd] ChatMessage roomPwd
     * @property {string|null} [message] ChatMessage message
     * @property {string|null} [localTime] ChatMessage localTime
     * @property {Uint8Array|null} [userData] ChatMessage userData
     */

    /**
     * Constructs a new ChatMessage.
     * @exports ChatMessage
     * @classdesc Represents a ChatMessage.
     * @implements IChatMessage
     * @constructor
     * @param {IChatMessage=} [properties] Properties to set
     */
    function ChatMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatMessage timestamp.
     * @member {number|Long} timestamp
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatMessage peerId.
     * @member {string} peerId
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.peerId = "";

    /**
     * ChatMessage peerName.
     * @member {string} peerName
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.peerName = "";

    /**
     * ChatMessage roomPwd.
     * @member {string} roomPwd
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.roomPwd = "";

    /**
     * ChatMessage message.
     * @member {string} message
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.message = "";

    /**
     * ChatMessage localTime.
     * @member {string} localTime
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.localTime = "";

    /**
     * ChatMessage userData.
     * @member {Uint8Array} userData
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.userData = $util.newBuffer([]);

    /**
     * Creates a new ChatMessage instance using the specified properties.
     * @function create
     * @memberof ChatMessage
     * @static
     * @param {IChatMessage=} [properties] Properties to set
     * @returns {ChatMessage} ChatMessage instance
     */
    ChatMessage.create = function create(properties) {
        return new ChatMessage(properties);
    };

    /**
     * Encodes the specified ChatMessage message. Does not implicitly {@link ChatMessage.verify|verify} messages.
     * @function encode
     * @memberof ChatMessage
     * @static
     * @param {IChatMessage} message ChatMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
        if (message.peerId != null && Object.hasOwnProperty.call(message, "peerId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.peerId);
        if (message.peerName != null && Object.hasOwnProperty.call(message, "peerName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.peerName);
        if (message.roomPwd != null && Object.hasOwnProperty.call(message, "roomPwd"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.roomPwd);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.message);
        if (message.localTime != null && Object.hasOwnProperty.call(message, "localTime"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.localTime);
        if (message.userData != null && Object.hasOwnProperty.call(message, "userData"))
            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.userData);
        return writer;
    };

    /**
     * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link ChatMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatMessage
     * @static
     * @param {IChatMessage} message ChatMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ChatMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatMessage} ChatMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.timestamp = reader.int64();
                break;
            case 2:
                message.peerId = reader.string();
                break;
            case 3:
                message.peerName = reader.string();
                break;
            case 4:
                message.roomPwd = reader.string();
                break;
            case 5:
                message.message = reader.string();
                break;
            case 6:
                message.localTime = reader.string();
                break;
            case 7:
                message.userData = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatMessage} ChatMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatMessage message.
     * @function verify
     * @memberof ChatMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            if (!$util.isString(message.peerId))
                return "peerId: string expected";
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            if (!$util.isString(message.peerName))
                return "peerName: string expected";
        if (message.roomPwd != null && message.hasOwnProperty("roomPwd"))
            if (!$util.isString(message.roomPwd))
                return "roomPwd: string expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.localTime != null && message.hasOwnProperty("localTime"))
            if (!$util.isString(message.localTime))
                return "localTime: string expected";
        if (message.userData != null && message.hasOwnProperty("userData"))
            if (!(message.userData && typeof message.userData.length === "number" || $util.isString(message.userData)))
                return "userData: buffer expected";
        return null;
    };

    /**
     * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatMessage} ChatMessage
     */
    ChatMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatMessage)
            return object;
        var message = new $root.ChatMessage();
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.peerId != null)
            message.peerId = String(object.peerId);
        if (object.peerName != null)
            message.peerName = String(object.peerName);
        if (object.roomPwd != null)
            message.roomPwd = String(object.roomPwd);
        if (object.message != null)
            message.message = String(object.message);
        if (object.localTime != null)
            message.localTime = String(object.localTime);
        if (object.userData != null)
            if (typeof object.userData === "string")
                $util.base64.decode(object.userData, message.userData = $util.newBuffer($util.base64.length(object.userData)), 0);
            else if (object.userData.length)
                message.userData = object.userData;
        return message;
    };

    /**
     * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatMessage
     * @static
     * @param {ChatMessage} message ChatMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChatMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
            object.peerId = "";
            object.peerName = "";
            object.roomPwd = "";
            object.message = "";
            object.localTime = "";
            if (options.bytes === String)
                object.userData = "";
            else {
                object.userData = [];
                if (options.bytes !== Array)
                    object.userData = $util.newBuffer(object.userData);
            }
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            object.peerId = message.peerId;
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            object.peerName = message.peerName;
        if (message.roomPwd != null && message.hasOwnProperty("roomPwd"))
            object.roomPwd = message.roomPwd;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.localTime != null && message.hasOwnProperty("localTime"))
            object.localTime = message.localTime;
        if (message.userData != null && message.hasOwnProperty("userData"))
            object.userData = options.bytes === String ? $util.base64.encode(message.userData, 0, message.userData.length) : options.bytes === Array ? Array.prototype.slice.call(message.userData) : message.userData;
        return object;
    };

    /**
     * Converts this ChatMessage to JSON.
     * @function toJSON
     * @memberof ChatMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatMessage;
})();

$root.ChatHistory = (function() {

    /**
     * Properties of a ChatHistory.
     * @exports IChatHistory
     * @interface IChatHistory
     * @property {number|Long|null} [timestamp] ChatHistory timestamp
     * @property {string|null} [message] ChatHistory message
     * @property {Uint8Array|null} [userData] ChatHistory userData
     */

    /**
     * Constructs a new ChatHistory.
     * @exports ChatHistory
     * @classdesc Represents a ChatHistory.
     * @implements IChatHistory
     * @constructor
     * @param {IChatHistory=} [properties] Properties to set
     */
    function ChatHistory(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatHistory timestamp.
     * @member {number|Long} timestamp
     * @memberof ChatHistory
     * @instance
     */
    ChatHistory.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatHistory message.
     * @member {string} message
     * @memberof ChatHistory
     * @instance
     */
    ChatHistory.prototype.message = "";

    /**
     * ChatHistory userData.
     * @member {Uint8Array} userData
     * @memberof ChatHistory
     * @instance
     */
    ChatHistory.prototype.userData = $util.newBuffer([]);

    /**
     * Creates a new ChatHistory instance using the specified properties.
     * @function create
     * @memberof ChatHistory
     * @static
     * @param {IChatHistory=} [properties] Properties to set
     * @returns {ChatHistory} ChatHistory instance
     */
    ChatHistory.create = function create(properties) {
        return new ChatHistory(properties);
    };

    /**
     * Encodes the specified ChatHistory message. Does not implicitly {@link ChatHistory.verify|verify} messages.
     * @function encode
     * @memberof ChatHistory
     * @static
     * @param {IChatHistory} message ChatHistory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatHistory.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.userData != null && Object.hasOwnProperty.call(message, "userData"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.userData);
        return writer;
    };

    /**
     * Encodes the specified ChatHistory message, length delimited. Does not implicitly {@link ChatHistory.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatHistory
     * @static
     * @param {IChatHistory} message ChatHistory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatHistory.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatHistory message from the specified reader or buffer.
     * @function decode
     * @memberof ChatHistory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatHistory} ChatHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatHistory.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatHistory();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.timestamp = reader.int64();
                break;
            case 2:
                message.message = reader.string();
                break;
            case 3:
                message.userData = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChatHistory message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatHistory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatHistory} ChatHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatHistory.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatHistory message.
     * @function verify
     * @memberof ChatHistory
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatHistory.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.userData != null && message.hasOwnProperty("userData"))
            if (!(message.userData && typeof message.userData.length === "number" || $util.isString(message.userData)))
                return "userData: buffer expected";
        return null;
    };

    /**
     * Creates a ChatHistory message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatHistory
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatHistory} ChatHistory
     */
    ChatHistory.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatHistory)
            return object;
        var message = new $root.ChatHistory();
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.message != null)
            message.message = String(object.message);
        if (object.userData != null)
            if (typeof object.userData === "string")
                $util.base64.decode(object.userData, message.userData = $util.newBuffer($util.base64.length(object.userData)), 0);
            else if (object.userData.length)
                message.userData = object.userData;
        return message;
    };

    /**
     * Creates a plain object from a ChatHistory message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatHistory
     * @static
     * @param {ChatHistory} message ChatHistory
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChatHistory.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
            object.message = "";
            if (options.bytes === String)
                object.userData = "";
            else {
                object.userData = [];
                if (options.bytes !== Array)
                    object.userData = $util.newBuffer(object.userData);
            }
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.userData != null && message.hasOwnProperty("userData"))
            object.userData = options.bytes === String ? $util.base64.encode(message.userData, 0, message.userData.length) : options.bytes === Array ? Array.prototype.slice.call(message.userData) : message.userData;
        return object;
    };

    /**
     * Converts this ChatHistory to JSON.
     * @function toJSON
     * @memberof ChatHistory
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatHistory.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatHistory;
})();

$root.SpeedPing = (function() {

    /**
     * Properties of a SpeedPing.
     * @exports ISpeedPing
     * @interface ISpeedPing
     * @property {number|Long|null} [timestamp] SpeedPing timestamp
     * @property {string|null} [peerId] SpeedPing peerId
     * @property {string|null} [peerName] SpeedPing peerName
     * @property {Uint8Array|null} [userData] SpeedPing userData
     */

    /**
     * Constructs a new SpeedPing.
     * @exports SpeedPing
     * @classdesc Represents a SpeedPing.
     * @implements ISpeedPing
     * @constructor
     * @param {ISpeedPing=} [properties] Properties to set
     */
    function SpeedPing(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SpeedPing timestamp.
     * @member {number|Long} timestamp
     * @memberof SpeedPing
     * @instance
     */
    SpeedPing.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * SpeedPing peerId.
     * @member {string} peerId
     * @memberof SpeedPing
     * @instance
     */
    SpeedPing.prototype.peerId = "";

    /**
     * SpeedPing peerName.
     * @member {string} peerName
     * @memberof SpeedPing
     * @instance
     */
    SpeedPing.prototype.peerName = "";

    /**
     * SpeedPing userData.
     * @member {Uint8Array} userData
     * @memberof SpeedPing
     * @instance
     */
    SpeedPing.prototype.userData = $util.newBuffer([]);

    /**
     * Creates a new SpeedPing instance using the specified properties.
     * @function create
     * @memberof SpeedPing
     * @static
     * @param {ISpeedPing=} [properties] Properties to set
     * @returns {SpeedPing} SpeedPing instance
     */
    SpeedPing.create = function create(properties) {
        return new SpeedPing(properties);
    };

    /**
     * Encodes the specified SpeedPing message. Does not implicitly {@link SpeedPing.verify|verify} messages.
     * @function encode
     * @memberof SpeedPing
     * @static
     * @param {ISpeedPing} message SpeedPing message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedPing.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
        if (message.peerId != null && Object.hasOwnProperty.call(message, "peerId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.peerId);
        if (message.peerName != null && Object.hasOwnProperty.call(message, "peerName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.peerName);
        if (message.userData != null && Object.hasOwnProperty.call(message, "userData"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.userData);
        return writer;
    };

    /**
     * Encodes the specified SpeedPing message, length delimited. Does not implicitly {@link SpeedPing.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SpeedPing
     * @static
     * @param {ISpeedPing} message SpeedPing message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeedPing.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SpeedPing message from the specified reader or buffer.
     * @function decode
     * @memberof SpeedPing
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SpeedPing} SpeedPing
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedPing.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpeedPing();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.timestamp = reader.int64();
                break;
            case 2:
                message.peerId = reader.string();
                break;
            case 3:
                message.peerName = reader.string();
                break;
            case 4:
                message.userData = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SpeedPing message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SpeedPing
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SpeedPing} SpeedPing
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeedPing.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SpeedPing message.
     * @function verify
     * @memberof SpeedPing
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SpeedPing.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            if (!$util.isString(message.peerId))
                return "peerId: string expected";
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            if (!$util.isString(message.peerName))
                return "peerName: string expected";
        if (message.userData != null && message.hasOwnProperty("userData"))
            if (!(message.userData && typeof message.userData.length === "number" || $util.isString(message.userData)))
                return "userData: buffer expected";
        return null;
    };

    /**
     * Creates a SpeedPing message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SpeedPing
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SpeedPing} SpeedPing
     */
    SpeedPing.fromObject = function fromObject(object) {
        if (object instanceof $root.SpeedPing)
            return object;
        var message = new $root.SpeedPing();
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
        if (object.peerId != null)
            message.peerId = String(object.peerId);
        if (object.peerName != null)
            message.peerName = String(object.peerName);
        if (object.userData != null)
            if (typeof object.userData === "string")
                $util.base64.decode(object.userData, message.userData = $util.newBuffer($util.base64.length(object.userData)), 0);
            else if (object.userData.length)
                message.userData = object.userData;
        return message;
    };

    /**
     * Creates a plain object from a SpeedPing message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SpeedPing
     * @static
     * @param {SpeedPing} message SpeedPing
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SpeedPing.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
            object.peerId = "";
            object.peerName = "";
            if (options.bytes === String)
                object.userData = "";
            else {
                object.userData = [];
                if (options.bytes !== Array)
                    object.userData = $util.newBuffer(object.userData);
            }
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
        if (message.peerId != null && message.hasOwnProperty("peerId"))
            object.peerId = message.peerId;
        if (message.peerName != null && message.hasOwnProperty("peerName"))
            object.peerName = message.peerName;
        if (message.userData != null && message.hasOwnProperty("userData"))
            object.userData = options.bytes === String ? $util.base64.encode(message.userData, 0, message.userData.length) : options.bytes === Array ? Array.prototype.slice.call(message.userData) : message.userData;
        return object;
    };

    /**
     * Converts this SpeedPing to JSON.
     * @function toJSON
     * @memberof SpeedPing
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SpeedPing.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SpeedPing;
})();

module.exports = $root;
