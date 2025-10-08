# API
```sh
$ npm install --save get-internal-ip
```
# USAGE
```sh
var getInternalIp = require("get-internal-ip");
getInternalIp.v4();
/*
 {
    eth0:
    {
        address: '192.168.0.14',
        netmask: '255.255.255.0',
        family: 'IPv4',
        mac: '00:0a:95:9d:68:16',
        internal: false
    }
}
*/
getInternalIp.v6();
/*
 {
    eth0:
    {
        address: 'fe80::200:f8ff:fe21:67cf',
         netmask: 'ffff:ffff:ffff:ffff::',
         family: 'IPv6',
         mac: '00:0a:95:9d:68:16',
         scopeid: 3,
         internal: false 
    }
}
*/
```
