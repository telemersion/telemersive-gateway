/*
Author : Onur Atam
Created At : 2017-05-24
Github : https://github.com/onur2677/get-internal-ip
*/
'use strict';
const getInternalIp = (() => {

    /**
    @returns {Object}
    */
    function _getInternalIp(family) {
        const networkInterfaces = require('os').networkInterfaces();
        let matches = {};
        Object.keys(networkInterfaces).forEach(function (item) {
            networkInterfaces[item].forEach(function (address) {
                if (address.internal === false && address.family === family) {
                    matches[item] = address;
                }
            });
        });
        return matches;
    }

    function v4() {
        return _getInternalIp("IPv4");
    }

    function v6() {
        return _getInternalIp("IPv6");
    }

    return {
        v4: v4,
        v6: v6
    }

})();

module.exports = getInternalIp;