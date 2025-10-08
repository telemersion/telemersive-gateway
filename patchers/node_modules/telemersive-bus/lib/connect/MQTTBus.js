const mqtt = require('async-mqtt');

class MqttNetBus {
    isConnected = false;

    constructor() {
        this.host = null;
        this.port = null;
        this.clientID = null;
        this.userName = null;
        this.passWord = null;
        this.mqttClient = null;
     };

    /**
     * connect to the broker
     * @param {*} _host
     * @param {*} _port
     * @param {*} _username optional
     * @param {*} _password optional
     * @param _peerId
     * @param :clientID
     */
    configure = (_host, _port, _username, _password, _clientID) => {
        this.host = _host;
        this.port = _port;
        this.clientID = _clientID;
        this.userName = _username;
        this.passWord = _password;
    };

    setClientID = (_clientID) => {
        this.clientID = _clientID;
    }

    setMessageCallbackFunction = (_callback) => {
        this.onMessage = _callback;
    }

    connect= async (lastWillMessage) => {
        if(this.isConnected){
            await this.disconnect();
        }

        if(this.host === null){
            throw "configuration incomplete";
        }
        const brokerURL = this.host + ":" + this.port;
        const options = {};

        options.cmd= 'connect';
        if(this.clientID != null){
            options.clientId = this.clientID;
        }

        if (this.userName != null) {
            options.username = this.userName;
            options.password = this.passWord;
        }

        if (lastWillMessage != null) {
            const will = {};
            will.topic = lastWillMessage.topic;
            will.payload = lastWillMessage.payload;
            will.qos = lastWillMessage.QoS;
            will.retain = lastWillMessage.retain;

            options.will = will;
        }

        this.mqttClient = await mqtt.connectAsync(brokerURL, options);
        if(this.onMessage != null){
            this.mqttClient.on('message', this.onMessage);
        }
        this.mqttClient.on('error', function (err){
            if(err){
                console.log(`an error has occurred (${err})`);
                throw err;
            }
        });
        this.isConnected = true;
    };

    disconnect = async () => {
        if(this.isConnected){
            // we need to force end the connection
            // probably because of subscriptions with QoS = 2
            await this.mqttClient.end(true);
        }
        this.isConnected = false;
    };

    /**
     * publish on this topic
     * @param {*} _topic 
     * @param {*} _payload 
     * @param {*} _QoS 
     * @param {*} _retain 
     */
    publish = async (_topic, _payload, _QoS, _retain) => {
        const options = {};
        if (_QoS != null){
            options.qos = _QoS;
        }

        if (_retain != null){
            //console.log(`publishing retained message : ${_topic}`);
            options.retain = _retain;
        }

        try{
            if(this.isConnected){
                //console.log(`MQTTBus: publish (${_topic}, ${_payload}, ${JSON.stringify(options)})`)
                await this.mqttClient.publish(_topic, _payload, options);
                return true;    
            }
        } catch (e) {
            console.error(`publishing failed: ${_topic}, ${_payload}. ${e.name}, ${e.message}`);
        }
        return false;
    };

    /**
     * subscribe topic
     * @param {*} _QoS quality of service 0..2
     * @param {*} _topics string - single topic or array of topics
     */
    subscribe = async (_QoS, ..._topics) => {
        const options = {};
        if (_QoS != null){
            options.qos = _QoS;
        }

        try{
            //console.log(`MQTTBus: subscribe (${_topics}) (${_QoS})`);
            await this.mqttClient.subscribe(_topics, options)
            return true;
        } catch (e) {
            console.error(`subscribe failed: ${_topics}. ${e.name}, ${e.message}`);
        }
        return false;
    };

    /**
     * unsubscribe from client
     * @param {*} _topics string - single topic or array of topics
     */
    unsubscribe = async (..._topics) => {
        try{
            //console.log(`MQTTBus: unsubscribe (${_topics})`);
            await this.mqttClient.unsubscribe(_topics)
            return true;    
        } catch (e) {
            console.error(`unsubscribe failed: ${_topic}. ${e.name}, ${e.message}`);
        }
        return false;
    };

    /**
     * clears the retain of the specified topics
     * @param  {...any} _topics string - single topic or array of topics
     */
    clearRetain = async (..._topics) => {
        const payload = '';
        try{
            await Promise.all(
                _topics.filter(async t => await this.publish(t, payload, 0, true))
            );
            return true;
        } catch (e) {
            console.error(`clearRetain failed: ${_topic}. ${e.name}, ${e.message}`);
        }
        return false;
    };

}

module.exports = MqttNetBus;