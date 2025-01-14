autowatch = 1;

outlets = 2;

var myval=0;
var DEFAULT = "-default-";
var NONE = "-none-";
// network
var ugNetworkMode = "none";
var ugPort = 5004;
var ugRouter = "gitlab.zhdk.ch/telemersion";
var ugLANip = "1.0.0.127";
var ugLANport = "10000";
var ugFilePath = "ug.exe";
var ugHolePuncherURL = "gitlab.zdhk.ch/telemersion";
var ugHolePuncherPort = 9418;
var ugStunServerURL = "gitlab.zdhk.ch/telemersion";
var ugStunServerPort = 3478;
var ugRoomName = "unkonwn";
var ugChannelNr = 0;

var ugParams = NONE;
var ugCustomFlagsAdvanced = NONE;
var ugAdv_encryption = NONE;

// avio
var ugTransmission_mode = 0;
var ugConnection_type = 0;

// video capture
var ugVideoCaptureMode = "texture";
var ugFPS_attribute = "fps";
var ugTexture_display = NONE;
var ugTexture_capture = DEFAULT;
var ugTexture_fps = 60;
var ugCustomFlagsVideo_capture = NONE;
var ugVideoTestcard = "testcard:80:60:1:UYVY";
var ugNDI_capture = DEFAULT;
var ugLibAv_codec = NONE;
var ugLibAv_codec_bitrate = 10;
var ugCapture_filter = NONE;

// audio capture
var ugAudioCaptureMode = "portaudio";
var ugCustomFlagsAudio_capture = NONE;
var ugAudio_testcard_capture_vol = -18;
var ugAudio_testcard_capture_freq = 440;
var ugAudio_codec = "OPUS";
var ugAudio_codec_bitrate = 64000;
var ugAudio_channels = 0; // 0 = all
var ugAudio_channel_mapping = NONE;
var ugAudioTestcard = "testcard:frequency=440";
var ugAudio_codec_sample_rate = 0;
var ugPortaudio_capture = DEFAULT;
var ugCoreaudio_capture = DEFAULT;
var ugWasapi_capture = DEFAULT;
var ugJack_capture = DEFAULT;

// video receive
var ugVideoReceiverMode = "texture";
var ugCustomFlagsVideo_receive = NONE;
var ugDisplayMode = 0;
var ugDisplay_flag_prefix = "syphon";
var ugNDI_display = "NDIChannel";
var ugDisplay_window_show = 0;
var ugReceive_postprocessor = NONE;

// audio receive
var ugAudioReceiveMode = "portaudio";
var ugCustomFlagsAudio_receive = NONE;
var ugPortaudio_receive = DEFAULT;
var ugCoreaudio_receive = DEFAULT;
var ugWasapi_receive = DEFAULT;
var ugJack_receive = DEFAULT;

// other
var ugJoined = false;
var ugEnabled = false;
var isRunning = false;

var tgGlobals = new Global("tg_globals");
var ugVerbose = tgGlobals.verboseExecute;

var ugCLIcommand = "";
var ugCLIargs = [];
var ugCLIarg = "";

if (jsarguments.length>1)
	ugChannelNr = jsarguments[1];

function loadbang(){
    dpost("gathering information on the patcher hierarchy..\n");
}

function ug_printoutCLI(_enable){
	if(_enable){
    	generate();
		post("ultragrid - channel# " + ugChannelNr + ": CLI: " + ugCLIcommand.toString() + "\n");
		outlet(1, "cli_command", ugCLIcommand.toString());
	}
}

function ug_verboseExecute(_verbose){
    ugVerbose = _verbose;
	dpost("ugVerbose: " + ugVerbose + "\n");
}

function dpost(_post){
    if(ugVerbose){
        post("ultragrid - channel# " + ugChannelNr + ": " + _post);
    }
}

function ugf_adv_params(_params){
    ugParams = _params.replace(/\s/g, ""); // removing white spaces;
	dpost("ugParams: " + ugParams + "\n");
}

function ugf_customFlagsAdvanced(_adv_flags){
    ugCustomFlagsAdvanced = _adv_flags;
	dpost("ugCustomFlagsAdvanced: " + ugCustomFlagsAdvanced + "\n");
}

function ugf_adv_encryption(_encryption){
    ugAdv_encryption = _encryption;
	dpost("ugAdv_encryption: " + ugAdv_encryption + "\n");
    
}

/************* NETWORK ***************/

function ug_roomName(_roomName){
    ugRoomName = _roomName;
	dpost("ugRoomName: " + ugRoomName + "\n");
}

// send to router, receive from router, peer to peer (internet), peer to peer (LAN), capture to local
function ug_networkMode(_ugNetworkMode){
    ugNetworkMode = _ugNetworkMode;
	dpost("ugNetworkMode: " + ugNetworkMode + "\n");
}

function ugf_port(_portNumber){
    ugPort = _portNumber;
	dpost("ugPort: " + ugPort + "\n");
}

function ugf_router(_serverName){
    ugRouter = _serverName;
	dpost("ugRouter: " + ugRouter + "\n");
}

function ugf_lanIP(_lanIP){
    ugLANip = _lanIP;
	dpost("ugLANip: " + ugLANip + "\n");
}

function ugf_lanPort(_lanPort){
    ugLANPort = _lanPort;
	dpost("ugLANPort: " + ugLANPort + "\n");
}

function ugf_filePath(_filePath){
    ugFilePath = _filePath;
	dpost("ugFilePath: " + ugFilePath + "\n");
}

function ugf_holePuncherURL(_holePuncher){
    ugHolePuncherURL = _holePuncher;
	dpost("ugHolePuncherURL: " + ugHolePuncherURL + "\n");
}

function ugf_holePuncherPort(_holePuncher){
    ugHolePuncherPort = _holePuncher;
	dpost("ugHolePuncherPort: " + ugHolePuncherPort + "\n");
}

function ugf_stunServerURL(_stun_url){
    ugStunServerURL = _stun_url;
	dpost("ugStunServerURL: " + ugStunServerURL + "\n");
}

function ugf_stunServerPort(_stun_port){
    ugStunServerPort = _stun_port;
	dpost("ugStunServerPort: " + ugStunServerPort + "\n");
}

/************* AV & Connection ***************/

// 0=video, 1=audio, 2=video & audio
function ug_transmission_mode(_mode){
    ugTransmission_mode = _mode;
	dpost("ugTransmission_mode: " + ugTransmission_mode + "\n");
}

// 0= send (TX) >>, 1= >> receive (RX), 2= >> both (RX+TX) >>
function ug_connection_type(_mode){
    ugConnection_type = _mode;
	dpost("ugConnection_type: " + ugConnection_type + "\n");
}


/************* VIDEO CAPTURE ***************/

// texture, spout, syphon, ndi, custom
function ug_videoCaptureMode(_videoCaptureMode){
    ugVideoCaptureMode = _videoCaptureMode;
	dpost("ugVideoCaptureMode: " + ugVideoCaptureMode + "\n");
}

function ugf_fps_attribute(_fps_attribute){
    ugFPS_attribute = _fps_attribute;
	dpost("ugFPS_attribute: " + ugFPS_attribute + "\n");
}

function ugf_texture_fps(_texture_fps){
    ugTexture_fps = _texture_fps;
	dpost("ugTexture_fps: " + ugTexture_fps + "\n");
}

function ugf_texture_capture(_texture_capture){
    ugTexture_capture = _texture_capture;
	dpost("ugTexture_capture: " + ugTexture_capture + "\n");
}

function ugf_customFlagsVideoCapture(_customFlags){
    ugCustomFlagsVideo_capture = _customFlags;
	dpost("ugCustomFlagsVideo_capture: " + ugCustomFlagsVideo_capture + "\n");
}

function ugf_ndi_capture(_ndiCapture){
    ugNDI_capture = _ndiCapture;
	dpost("ugNDI_capture: " + ugNDI_capture + "\n");
}

function ugf_LibAv_codec(_video_codec){
    ugLibAv_codec = _video_codec;
	dpost("ugLibAv_codec: " + ugLibAv_codec + "\n");
}

function ugf_LibAv_codec_bitrate(_video_codec_bitrate){
    ugLibAv_codec_bitrate = _video_codec_bitrate;
	dpost("ugLibAv_codec_bitrate: " + ugLibAv_codec_bitrate + "\n");
}

function ugf_capture_filter(_capture_filter){
    ugCapture_filter = _capture_filter;
	dpost("ugCapture_filter: " + ugCapture_filter + "\n");
}


/************* AUDIO CAPTURE ***************/

// portaudio, jack, coreaudio, wasapi, embedded, analog, AESEBU, custom, testcard
function ugf_audioCaptureMode(_audioCaptureMode){
    ugAudioCaptureMode = _audioCaptureMode;
	dpost("ugAudioCaptureMode: " + ugAudioCaptureMode + "\n");
}

function ugf_customFlagsAudioCapture(_customFlags){
    ugCustomFlagsAudio_capture = _customFlags;
	dpost("ugCustomFlagsAudio_capture: " + ugCustomFlagsAudio_capture + "\n");
}

function ugf_audio_testcard_capture_vol(_capture_vol){
    ugAudio_testcard_capture_vol = _capture_vol;
	dpost("ugAudio_testcard_capture_vol: " + ugAudio_testcard_capture_vol + "\n");
}

function ugf_audio_testcard_capture_freq(_capture_freq){
    ugAudio_testcard_capture_freq = _capture_freq;
	dpost("ugAudio_testcard_capture_freq: " + ugAudio_testcard_capture_freq + "\n");
}

function ugf_portaudio_capture(_portaudio_capture){
    ugPortaudio_capture = _portaudio_capture;
	dpost("ugPortaudio_capture: " + ugPortaudio_capture + "\n");
}

function ugf_coreaudio_capture(_coreaudio_capture){
    ugCoreaudio_capture = _coreaudio_capture;
	dpost("ugCoreaudio_capture: " + ugCoreaudio_capture + "\n");
}

function ugf_wasapi_capture(_wasapi_capture){
    ugWasapi_capture = _wasapi_capture;
	dpost("ugWasapi_capture: " + ugWasapi_capture + "\n");
}

function ugf_jack_capture(_jack_capture){
    ugJack_capture = _jack_capture;
	dpost("ugJack_capture: " + ugJack_capture + "\n");
}

// NONE, OPUS, speex, FLAC, AAC, MP3, G.722, u-law, A-law, PCM
function ugf_audio_codec(_codec){
    ugAudio_codec = _codec;
	dpost("ugAudio_codec: " + ugAudio_codec + "\n");
}

function ugf_audio_codec_bitrate(_bitrate){
    ugAudio_codec_bitrate = _bitrate;
	dpost("ugAudio_codec_bitrate: " + ugAudio_codec_bitrate + "\n");
}

function ugf_audio_channels(_channels){ // 0 = all
    ugAudio_channels = _channels;
	dpost("ugAudio_channels: " + ugAudio_channels + "\n");
}

function ugf_audio_channel_mapping(_mapping){
	if (typeof _mapping === 'string' || _mapping instanceof String){
    	ugAudio_channel_mapping = _mapping.replace(/\s/g, ""); // removing white spaces
		dpost("ugAudio_channel_mapping:  fff" + ugAudio_channel_mapping + "\n");
	}
}

function ugf_audio_codec_sample_rate(_sample_rate){
    ugAudio_codec_sample_rate = _sample_rate;
	dpost("ugAudio_codec_sample_rate: " + ugAudio_codec_sample_rate + "\n");
}

/************* VIDEO RECEIVE ***************/

function ug_videoReceiveMode(_videoReceiveMode){
    ugVideoReceiverMode = _videoReceiveMode;
	dpost("ugVideoReceiverMode: " + ugVideoReceiverMode + "\n");
}

function ug_displayMode(_displayMode){
    ugDisplayMode = _displayMode;
	dpost("ugDisplayMode: " + ugDisplayMode + "\n");
}

function ugf_customFlagsVideoReceive(_customFlags){
    ugCustomFlagsVideo_receive = _customFlags;
	dpost("ugCustomFlagsVideo_receive: " + ugCustomFlagsVideo_receive + "\n");
}

function ugf_display_flag_prefix(_display_flag_prefix){
    ugDisplay_flag_prefix = _display_flag_prefix;
	dpost("ugDisplay_flag_prefix: " + ugDisplay_flag_prefix + "\n");
}

function ugf_texture_display(_texture_display){
    ugTexture_display = _texture_display;
	dpost("ugTexture_display: " + ugTexture_display + "\n");
}

function ugf_ndi_display(_ndi_display){
    ugNDI_display = _ndi_display;
	dpost("ugNDI_display: " + ugNDI_display + "\n");
}

function ugf_display_window_show(_display_window_show){
    ugDisplay_window_show = _display_window_show;
	dpost("ugDisplay_window_show: " + ugDisplay_window_show + "\n");
}

function ugf_receive_postprocessor(_receive_postprocessor){
    ugReceive_postprocessor = _receive_postprocessor;
	dpost("ugReceive_postprocessor: " + ugReceive_postprocessor + "\n");
}


/************* AUDIO RECEIVE ***************/

// portaudio, jack, coreaudio, wasapi, embedded, analog, AESEBU, custom, testcard
function ugf_audioReceiveMode(_audioReceiveMode){
    ugAudioReceiveMode = _audioReceiveMode;
	dpost("ugAudioReceiveMode: " + ugAudioReceiveMode + "\n");
}

function ugf_portaudio_receive(_portaudio_receive){
    ugPortaudio_receive = _portaudio_receive;
	dpost("ugPortaudio_receive: " + ugPortaudio_receive + "\n");
}

function ugf_coreaudio_receive(_coreaudio_receive){
    ugCoreaudio_receive = _coreaudio_receive;
	dpost("ugCoreaudio_receive: " + ugCoreaudio_receive + "\n");
}

function ugf_wasapi_receive(_wasapi_receive){
    ugWasapi_receive = _wasapi_receive;
	dpost("ugWasapi_receive: " + ugWasapi_receive + "\n");
}

function ugf_jack_receive(_jack_receive){
    ugJack_receive = _jack_receive;
	dpost("ugJack_receive: " + ugJack_receive + "\n");
}

function ugf_customFlagsAudioReceive(_customFlags){
    ugCustomFlagsAudio_receive = _customFlags;
	dpost("ugCustomFlagsAudio_receive: " + ugCustomFlagsAudio_receive + "\n");
}


function ug_joined(_joined){
    ugJoined = _joined;
    evaluate();
}

function ug_enable(_enable){
    ugEnabled = _enable;
    evaluate();
}

function evaluate(){
    if(ugEnabled && ugJoined){
        if(!isRunning){
            isRunning = true;
            generate();
            outlet(0, "start", get_path(), ugCLIargs);
        }
    } else {
        if(isRunning){
            isRunning = false;
            outlet(0, "stop");
        }
    }   
}

function cliClear(){
    ugCLIcommand = "";
	ugCLIargs = [];
}

function get_path(){
    return ugFilePath;
}

function cliADD_params(){
    ugCLIcommand += " --param ";
	ugCLIarg = "log-color=no"
    if(ugParams != NONE){
        ugCLIarg += "," + ugParams;
    }
	ugCLIcommand += ugCLIarg;
	
	ugCLIargs.push("--param");
	ugCLIargs.push(ugCLIarg);
}

function cliADD_advancedFlags(){
    if(ugCustomFlagsAdvanced != NONE){
        ugCLIcommand += " " + ugCustomFlagsAdvanced;

		ugCLIargs = ugCLIargs.concat(ugCustomFlagsAdvanced.split(" "));
    }
}

function cliADD_encryption(){
    if(ugAdv_encryption != NONE){
        ugCLIcommand += " --encryption " + ugAdv_encryption;

		ugCLIargs.push("--encryption");
		ugCLIargs.push(ugAdv_encryption);
    }
}

function cliADD_videoCapture(){
    if(ugVideoCaptureMode == "custom"){
        if(ugCustomFlagsVideo_capture != NONE){
            ugCLIcommand += " " + ugCustomFlagsVideo_capture;
			ugCLIargs = ugCLIargs.concat(ugCustomFlagsVideo_capture.split(" "));
        }
    } else {
        ugCLIcommand += " -t";
		ugCLIargs.push("-t");
        if(ugVideoCaptureMode == "ndi"){
			ugCLIarg = "ndi"
            if(ugNDI_capture != DEFAULT){
                ugCLIarg += ":" + ugNDI_capture;
            }
        } else if(ugVideoCaptureMode == "syphon"){
            ugCLIarg = "syphon";
            if(ugTexture_capture != DEFAULT){
                ugCLIarg += ":" + ugTexture_capture;
            }
            if (ugTexture_fps > 0){
                ugCLIarg += ":override_fps=" + ugTexture_fps;
            }
        } else if(ugVideoCaptureMode == "spout"){
            ugCLIarg =  "spout";
            if(ugTexture_capture != DEFAULT){
                ugCLIarg += ":" + ugTexture_capture;
            }
            if (ugTexture_fps > 0){
                ugCLIarg += ":fps=" + ugTexture_fps;            
            }
        }    
        ugCLIcommand += " " + ugCLIarg;
		ugCLIargs.push(ugCLIarg);
    }
 }

// portaudio, jack, coreaudio, wasapi, embedded, analog, AESEBU, custom, testcard
function cliADD_audioCapture(){
    if(ugAudioCaptureMode == "custom"){
        if(ugCustomFlagsAudio_capture != NONE){
            ugCLIcommand += " " + ugCustomFlagsAudio_capture;
			ugCLIargs = ugCLIargs.concat(ugCustomFlagsAudio_capture.split(" "));
        }
    } else {
        ugCLIcommand += " -s";
		ugCLIargs.push("-s");
        if(ugAudioCaptureMode == "portaudio"){
            ugCLIarg = "portaudio";
            if(ugPortaudio_capture != DEFAULT){
                ugCLIarg += ":" + ugPortaudio_capture;
            }
        } else if(ugAudioCaptureMode == "coreaudio"){
            ugCLIarg = "coreaudio";
            if(ugCoreaudio_capture != DEFAULT){
                ugCLIarg += ":" + ugCoreaudio_capture;
            }
        } else if(ugAudioCaptureMode == "wasapi"){
            ugCLIarg = "wasapi";
            if(ugWasapi_capture != DEFAULT){
                ugCLIarg += ":" + ugWasapi_capture;
            }
        } else if(ugAudioCaptureMode == "jack"){
            ugCLIarg = "jack";
            if(ugJack_capture != DEFAULT){
                ugCLIarg += ":" + ugJack_capture;
            }

        } else if(ugAudioCaptureMode == "embedded"){
            ugCLIarg = "embedded";

        } else if(ugAudioCaptureMode == "analog"){
            ugCLIarg = "analog";

        } else if(ugAudioCaptureMode == "AESEBU"){
            ugCLIarg = "AESEBU";

        } else if(ugAudioCaptureMode == "testcard"){
            ugCLIarg = "testcard:volume=" + ugAudio_testcard_capture_vol + ":frequency=" + ugAudio_testcard_capture_freq;
        }
        ugCLIcommand += " " + ugCLIarg;
		ugCLIargs.push(ugCLIarg);

    }
}

function cliADD_videoCodec(){
	if(ugLibAv_codec != NONE){
        ugCLIcommand += " -c";
		ugCLIargs.push("-c");
         if(ugLibAv_codec != "MJPEG" && ugLibAv_codec_bitrate > 0){
        	ugCLIarg = "libavcodec:codec=" + ugLibAv_codec + ":bitrate=" + ugLibAv_codec_bitrate + "M";
        } else {
        	ugCLIarg = "libavcodec:codec=" + ugLibAv_codec;
        }
        ugCLIcommand += " " + ugCLIarg;
		ugCLIargs.push(ugCLIarg);
    }
}

// NONE, OPUS, speex, FLAC, AAC, MP3, G.722, u-law, A-law, PCM

function cliADD_audioCodec(){
    if(ugAudioCaptureMode != "testcard"){
        // codecs
        if(ugAudio_codec != NONE){
            ugCLIcommand += " --audio-codec";
			ugCLIargs.push("--audio-codec");
            ugCLIarg = ugAudio_codec;  
            if(ugAudio_codec == "OPUS"){
                if(ugAudio_codec_bitrate > 0){
                    ugCLIarg += ":bitrate=" + ugAudio_codec_bitrate;
                }
            } else {
                if(ugAudio_codec_sample_rate > 0){
                    ugCLIarg += ":sample_rate=" + ugAudio_codec_sample_rate;
                }
            }
        	ugCLIcommand += " " + ugCLIarg;
			ugCLIargs.push(ugCLIarg);
        }   
        // audio mapping
        if(ugAudio_channels > 0){
            ugCLIcommand += " --audio-capture-format";
			ugCLIargs.push("--audio-capture-format");

            ugCLIarg = "channels=" + ugAudio_channels;
			
			ugCLIcommand += " " + ugCLIarg;
			ugCLIargs.push(ugCLIarg);
        }
    }
}

function cliADD_audioMapping(){
    // audio mapping
    if(ugAudio_channel_mapping != NONE && ugAudio_channel_mapping != "bang" && ugAudio_channel_mapping.length > 2){
        ugCLIcommand += " --audio-channel-map " + ugAudio_channel_mapping;
		ugCLIargs.push("--audio-channel-map");
		ugCLIargs.push(ugAudio_channel_mapping);
    }
}
        
function cliADD_videoTestcard(){
    ugCLIcommand += " -t ";
    ugCLIcommand += ugVideoTestcard;
	ugCLIargs.push("-t");
	ugCLIargs.push(ugVideoTestcard);
}

function cliADD_audioTestcard(){
    ugCLIcommand += " -s ";
    ugCLIcommand += ugAudioTestcard;
	ugCLIargs.push("-s");
	ugCLIargs.push(ugAudioTestcard);
}

function cliADD_port(_port){
    if(ugTransmission_mode != 2){
		ugCLIarg = "-P" + _port;
    } else {
        ugCLIarg = "-P" + _port + ":" + _port + ":" + (_port+2) + ":" + (_port+2);
    }

    ugCLIcommand += " " + ugCLIarg;
	ugCLIargs.push(ugCLIarg);
}

function cliADD_videoReceive(){
    if(ugVideoReceiverMode == "custom"){
        if(ugCustomFlagsVideo_receive != NONE){
            ugCLIcommand += " " + ugCustomFlagsVideo_receive;
			ugCLIargs = ugCLIargs.concat(ugCustomFlagsVideo_receive.split(" "));
        }
    } else {
        ugCLIcommand += " -d ";
		ugCLIargs.push("-d");
        if(ugVideoReceiverMode == "texture" || ugVideoReceiverMode == "spout" || ugVideoReceiverMode == "syphon"){
            ugCLIarg = ugDisplay_flag_prefix + "'" + ugTexture_display + "'";
            if(ugDisplay_window_show){
                ugCLIarg += ":hide-window";
            }
        } else if(ugVideoReceiverMode == "ndi"){
            ugCLIarg = "ndi:name=" + "'" + ugNDI_display + "'";
        }

        ugCLIcommand += " " + ugCLIarg;
		ugCLIargs.push(ugCLIarg);      
    }
}

// portaudio, jack, coreaudio, wasapi, embedded, analog, AESEBU, custom, testcard
function cliADD_audioReceive(){
    if(ugAudioReceiveMode == "custom"){
        if(ugCustomFlagsAudio_receive != NONE){
            ugCLIcommand += " " + ugCustomFlagsAudio_receive;
			ugCLIargs = ugCLIargs.concat(ugCustomFlagsAudio_receive.split(" "));
        }
    } else {
        ugCLIcommand += " -r";
 		ugCLIargs.push("-r");
       	if(ugAudioReceiveMode == "portaudio"){
            ugCLIarg = "portaudio";
            if(ugPortaudio_receive != DEFAULT){
                ugCLIarg += ":" + ugPortaudio_receive;
            }
        } else if(ugAudioReceiveMode == "coreaudio"){
            ugCLIarg = "coreaudio";
            if(ugCoreaudio_receive != DEFAULT){
                ugCLIarg += ":" + ugCoreaudio_receive;
            }
        } else if(ugAudioReceiveMode == "wasapi"){
            ugCLIarg = "wasapi";
            if(ugWasapi_receive != DEFAULT){
                ugCLIarg += ":" + ugWasapi_receive;
            }
        } else if(ugAudioReceiveMode == "jack"){
            ugCLIarg = "jack";
            if(ugJack_receive != DEFAULT){
                ugCLIarg += ":" + ugJack_receive;
            }

        } else if(ugAudioReceiveMode == "embedded"){
            ugCLIarg = "embedded";

        } else if(ugAudioReceiveMode == "analog"){
            ugCLIarg = "analog";

        } else if(ugAudioReceiveMode == "AESEBU"){
            ugCLIarg = "AESEBU";

        } 
        ugCLIcommand += " " + ugCLIarg;
		ugCLIargs.push(ugCLIarg);      
    }
}

function cliADD_router(){
    ugCLIcommand += " " + ugRouter;
	ugCLIargs.push(ugRouter);      
}

function cliADD_LANip(){
    ugCLIcommand += " " + ugLANip;
	ugCLIargs.push(ugLANip);      
}

function cliADD_holePunching(){
    ugCLIarg = "-Nholepunch";
    ugCLIarg += ":room=" + ugRoomName +"_ch_" + ugChannelNr;
    ugCLIarg += ":coord_srv='" + ugHolePuncherURL + ":" + ugHolePuncherPort + "'";
    ugCLIarg += ":stun_srv='" + ugStunServerURL + ":" + ugStunServerPort + "'";

    //ugCLIcommand += " " + ugLANip;
	//ugCLIargs.push(ugLANip);      
}

function cliADD_captureFilter(){
    if(ugCapture_filter != NONE){
        ugCLIcommand += " --capture-filter " + ugCapture_filter;
		ugCLIargs.push("--capture-filter");      
		ugCLIargs.push(ugCapture_filter);      
    }
}

function cliADD_postprocessing(){
    if(ugReceive_postprocessor != NONE){
        ugCLIcommand += " -p " + ugReceive_postprocessor;
		ugCLIargs.push("-p");
		ugCLIargs.push(ugReceive_postprocessor);
    }
}


function generate(){
    cliClear();
    cliADD_params();
    cliADD_advancedFlags();
    cliADD_encryption();
    if(ugNetworkMode == "send to router"){
        if(ugTransmission_mode != 1){
            cliADD_captureFilter();
            cliADD_videoCapture();
            cliADD_videoCodec();            
        }
        if(ugTransmission_mode != 0){
            cliADD_audioCapture();
            cliADD_audioCodec();            
        }
        cliADD_port(ugPort);
        cliADD_router();
    } else if(ugNetworkMode == "receive from router"){
        if(ugTransmission_mode != 1){
            cliADD_videoTestcard(); // to open proxy
            cliADD_postprocessing();
            cliADD_videoReceive();
        }
        if(ugTransmission_mode != 0){
            cliADD_audioTestcard(); // to open proxy
            cliADD_audioReceive();
            cliADD_audioMapping();
        }
        cliADD_port(ugPort);
        cliADD_router();
    }else if(ugNetworkMode == "peer to peer (manual)"){
        cliADD_port(ugLANPort);
        if(ugConnection_type != 0){
            if(ugTransmission_mode != 1){
                cliADD_postprocessing();
                cliADD_videoReceive();
            }
            if(ugTransmission_mode != 0){
                cliADD_audioReceive();
                cliADD_audioMapping();
            }
        }
        if(ugConnection_type != 1){
            if(ugTransmission_mode != 1){
                cliADD_captureFilter();
                cliADD_videoCapture();
                cliADD_videoCodec();            
            }
            if(ugTransmission_mode != 0){
                cliADD_audioCapture();
                cliADD_audioCodec();            
            }
            cliADD_LANip();
        }
    }else if(ugNetworkMode == "peer to peer (automatic)"){
        if(ugConnection_type != 1){
            if(ugTransmission_mode != 1){
                cliADD_captureFilter();
                cliADD_videoCapture();
                cliADD_videoCodec();            
            }
            if(ugTransmission_mode != 0){
                cliADD_audioCapture();
                cliADD_audioCodec();            
            }
        }
        if(ugConnection_type != 0){
            if(ugTransmission_mode != 1){
                cliADD_postprocessing();
                cliADD_videoReceive();
            }
            if(ugTransmission_mode != 0){
                cliADD_audioReceive();
                cliADD_audioMapping();
            }
        }        
        cliADD_holePunching()
    }else if(ugNetworkMode == "capture to local"){
        cliADD_captureFilter();
        cliADD_videoCapture();
        cliADD_postprocessing();
        cliADD_videoReceive();        
    }
    //ug_printoutCLI();
}

function anything()
{
	var a = arrayfromargs(arguments);
	post("tg.ultragrid.js: received an unknown message " + messagename + " -> "+ a + "\n");
	//myval = a;
	//bang();
}
