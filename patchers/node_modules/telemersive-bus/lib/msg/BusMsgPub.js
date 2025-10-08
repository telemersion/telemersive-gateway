var BusMsg = require("./BusMsg");


class BusMsgPub extends BusMsg
{
    QoS;
    retain;
    /**
     * generate the payload with the 'encode(_content)' message
     */
    payload;

    /**
     * Bus Message for publishing data
     * @param {*} _topic 
     * @param {*} _class 
     * @param {*} _QoS 
     * @param {*} _retain 
     */
    constructor(_topic, _class, _QoS, _retain){
        super(_topic, _class);
        this.QoS = _QoS;
        this.retain = _retain;
    };

    /**
     * returns this instance
     * @param {*} _content the Object to be sent. String, Dictionary or Protobuffer
     */
    encode(_content){
        //console.log(`this.type: ${this.type}`);
        if(this.type == 0){
            this.payload = _content;
        }else if(this.type == 1){ // it is a protbuffer class
             // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
            var errMsg = this.class.verify(_content);
            //if (errMsg)
            //    throw(`error: ${errMsg}`);
                
            // Create a new message
            var message = this.class.create(_content); 
            
            // Encode a message to an Uint8Array (browser) or Buffer (node)
            this.payload = this.class.encode(message).finish();
        } else if(this.type == 2){ // it is a javascript object
            this.payload = JSON.stringify(_content);
        } else if(this.type == 3){
            this.payload = _content;
        }
        return this;
    };
}

module.exports = BusMsgPub;
