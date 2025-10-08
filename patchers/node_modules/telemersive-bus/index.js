/*
 * Copyright (c) 2020 ZHdK - Martin Froehlich.
 *
 * See LICENSE for more information
 */

const BusClient = require('./lib/BusClient');
const BusManager = require('./lib/BusManager');

// Expose Client and Server
module.exports = {
    BusClient: BusClient,
    BusManager: BusManager
}
