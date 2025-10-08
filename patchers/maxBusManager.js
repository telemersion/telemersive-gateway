let maxApi = require("max-api");
const sha1 = require('sha1');

const telemersion = require("telemersive-bus");
const BusManager = telemersion.BusManager;
const Manager = new BusManager();

const handlers = {
  getRooms: async () => {
    maxApi.outlet('rooms', manager.rooms);
  },
  addRoom: async (_roomName, _roomPwd) => {
    // sending the double hashed password - this function is for debugging only anyway
    await Manager.publishNewRoom(_roomName, sha1(sha1(_roomPwd).substr(0, 10)).substr(0, 10));
  },
  delRoom: async (_roomName) => {
    await Manager.deleteRoom(_roomName);
  },
  ping: async () => {
    await Manager.startHousekeeping();
  },
  connect: async () => {
    await Manager.connectServer();
  },
  disconnect: async () => {
    await Manager.disconnectServer();
  },
  configure: async (_serverHost, _brokerPort, _sbPort, _serverUser, _serverPwd, _peerName) => {
    await Manager.configureServer(_serverHost, _brokerPort, _sbPort, _serverUser, _serverPwd, _peerName);
  },
  configureSwitchBoard: async (_sbHost, _sbPort) => {
    await Manager(_serverHost, _serverPort);
  }
};

maxApi.addHandlers(handlers);
