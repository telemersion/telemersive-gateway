let APPVERSION = "TeGateway_v1"; // use simple numbering
// only apps with the same version as the first peer that opens the room
// will be accepted -  all other will be declined by the manager

let maxApi = require("max-api");
let telemersion, BusClient, Client;

let fs = require('fs');
let util = require('util');
let log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});
let log_stdout = process.stdout;

const zeroPad = (num, places) => String(num).padStart(places, '0');

let verbose_out = false;
let verbose_in = false;

// overwrite console.log function, if second value is provided,
// the log will not be print out on the console, but only stored to the file
console.log = function(d, v) { //
    // current date
    let date = new Date();

    let timestamp = zeroPad(date.getHours(),2) + ":"+ zeroPad(date.getMinutes(),2) + ":"+ zeroPad(date.getSeconds(),2) + "."+ zeroPad(date.getMilliseconds(),3) + "> ";

    log_file.write(timestamp + util.format(d) + '\n');
    if(v == null){
        log_stdout.write(timestamp + util.format(d) + '\n');
    }
};

try {
	telemersion = require("telemersive-bus");
	BusClient = telemersion.BusClient;
	Client = new BusClient(APPVERSION);
    console.log("==================")
    console.log("BusClient started.")
} catch (err) {
	bubbledUp("bus", [ 'error', 'script', "Required libraries not installed. Please check [config] > debug and install libraries."])
}

/**
 * list of messages sent to max
 */
function bubbledUp(_message, _content){
    if(verbose_out){
        console.log("BUBBLE      > " + _message + ":" + _content, 1);
    }
    maxApi.outlet(_message, ..._content);
}


const handlers = {
  connect: async () => {
    await Client.connectServer();
  },
  disconnect: async () => {
    await Client.disconnectServer();
  },
  configure: (_serverHost, _serverPort, _serverUser, _serverPwd, _localIP) => {
    Client.configureServer(_serverHost, _serverPort, _serverUser, _serverPwd, _localIP);
  },
  join: async (_peerName, _roomName, _roomPwd) => {
    await Client.join(_peerName, _roomName, _roomPwd);
  },
  leave: async () => {
    await Client.leave();
  },
  chat: async (_message) => {
    await Client.peer.chat(_message);
  },
  osc: async (..._messages) => {
    await Client.peer.oscClient.send(_messages);
  },
  speed: async () => {
    await Client.peer.speedClient.ping();
  },
  publish: async (_retained, _topic, ..._messages) => {
    if(verbose_in){
        console.log("PUBLISH     > " + _topic + ":" + _messages, 1);
    }
    await Client.peer.mqttClient.publish(_retained, _topic, _messages);
  },
  subscribe: async (_topic, _message) => {
    if(verbose_in){
        console.log("SUBSCRIBE   > " + _topic + ":" + _message, 1);
    }
    await Client.peer.mqttClient.subscribe(_topic);
  },
  unsubscribe: async (_topic) => {
    if(verbose_in){
        console.log("UNSUBSCRIBE > " + _topic , 1);
    }
    await Client.peer.mqttClient.unsubscribe(_topic);
  },
  logmax: async (..._messages) => {
      console.log("MAX CONSOLE > " + _messages , 1);
  },
  setverbose_out: async (_verbose) => {
    verbose_out = _verbose;
  },
  setverbose_in: async (_verbose) => {
    verbose_in = _verbose;
  },
  clearlog: async () => {
    log_file.close();
    log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
  },
  error: async () => {
      let obj =  [{name: "Frank"}];
      console.log(obj[1].name);
  }
};

maxApi.addHandlers(handlers);

try {
	Client.setCallback(bubbledUp);

	init = async () =>{
  		maxApi.setDict('internalIPs', await Client.init());
  		// send default settings
  		bubbledUp("bus", ["broker", "connected", 0]);
  		bubbledUp("bus", ["peer", "joined", 0]);
  		bubbledUp("bus", [ "rooms", "menu", "clear"]);
  		bubbledUp("bus", [ "rooms", "menu", "list"]);
  		bubbledUp("bus", [ "peers", "menu", "clear"]);
  		bubbledUp("bus", [ "peers", "menu", "list"]);
  		bubbledUp("bus", [ "ready"]);
	}

	init();

} catch (err) {
	bubbledUp("bus", [ 'error', 'script', "Required libraries not installed. Please check [config] > debug and install libraries."])
}
