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

// avio
var ugAV_mode = 0;
var ugConnection_mode = 0;

// video capture
var ugVideoCaptureMode = "texture";
var ugFPS_attribute = "fps";
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
var ugVerbose =false;

var ugCLIcommand = "";

if (jsarguments.length>1)
	ugChannelNr = jsarguments[1];

function loadbang(){
    ugVerbose = tgGlobals.verboseExecute;
    dpost("gathering information on the patcher hierarchy..\n");
}

function ug_printoutCLI(){
    generate();
	post("ultragrid CLI: " + ugCLIcommand.toString() + "\n");
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
function ug_av_mode(_mode){
    ugAV_mode = _mode;
	dpost("ugAV_mode: " + ugAV_mode + "\n");
}

// 0= send (TX) >>, 1= >> receive (RX), 2= >> both (RX+TX) >>
function ug_connection_mode(_mode){
    ugConnection_mode = _mode;
	dpost("ugConnection_mode: " + ugConnection_mode + "\n");
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
    ugAudio_channel_mapping = _mapping;
	dpost("ugAudio_channel_mapping: " + ugAudio_channel_mapping + "\n");
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
            outlet(0, "start", get_path(), ugCLIcommand);
        }
    } else {
        if(isRunning){
            isRunning = false;
            outlet(0, "pkill");
        }
    }   
}

function cliClear(){
    ugCLIcommand = "";
}

function get_path(){
    return ugFilePath;
}

function cliADD_videoCapture(){
    if(ugVideoCaptureMode == "custom"){
        if(ugCustomFlagsVideo_capture != NONE){
            ugCLIcommand += " " + ugCustomFlagsVideo_capture;
        }
    } else {
        ugCLIcommand += " -t";
        if(ugVideoCaptureMode == "ndi"){
            ugCLIcommand += " ndi";
            if(ugTexture_capture != DEFAULT){
                ugCLIcommand += ":" + ugNDI_capture;
            }
        } else if(ugVideoCaptureMode == "syphon"){
            ugCLIcommand += " syphon";
            if(ugTexture_capture != DEFAULT){
                ugCLIcommand += ":" + ugTexture_capture;
            }
            if (ugTexture_fps > 0){
                ugCLIcommand += ":override_fps=" + ugTexture_fps;
            }
        } else if(ugVideoCaptureMode == "spout"){
            ugCLIcommand += " spout";
            if(ugTexture_capture != DEFAULT){
                ugCLIcommand += ":" + ugTexture_capture;
            }
            if (ugTexture_fps > 0){
                ugCLIcommand += ":fps=" + gTexture_fps;            
            }
        }    
    }
 }

// portaudio, jack, coreaudio, wasapi, embedded, analog, AESEBU, custom, testcard
function cliADD_audioCapture(){
    if(ugAudioCaptureMode == "custom"){
        if(ugCustomFlagsAudio_capture != NONE){
            ugCLIcommand += " " + ugCustomFlagsAudio_capture;
        }
    } else {
        ugCLIcommand += " -s";
        if(ugAudioCaptureMode == "portaudio"){
            ugCLIcommand += " portaudio";
            if(ugPortaudio_capture != DEFAULT){
                ugCLIcommand += ":" + ugPortaudio_capture;
            }
        } else if(ugAudioCaptureMode == "coreaudio"){
            ugCLIcommand += " coreaudio";
            if(ugCoreaudio_capture != DEFAULT){
                ugCLIcommand += ":" + ugCoreaudio_capture;
            }
        } else if(ugAudioCaptureMode == "wasapi"){
            ugCLIcommand += " wasapi";
            if(ugWasapi_capture != DEFAULT){
                ugCLIcommand += ":" + ugWasapi_capture;
            }
        } else if(ugAudioCaptureMode == "jack"){
            ugCLIcommand += " jack";
            if(ugJack_capture != DEFAULT){
                ugCLIcommand += ":" + ugJack_capture;
            }

        } else if(ugAudioCaptureMode == "embedded"){
            ugCLIcommand += " embedded";

        } else if(ugAudioCaptureMode == "analog"){
            ugCLIcommand += " analog";

        } else if(ugAudioCaptureMode == "AESEBU"){
            ugCLIcommand += " AESEBU";

        } else if(ugAudioCaptureMode == "testcard"){
            ugCLIcommand += " testcard:volume=" + ugAudio_testcard_capture_vol + ":frequency=" + ugAudio_testcard_capture_freq;
        }
    }
}

function cliADD_videoCodec(){
    if(ugVideoCaptureMode != "custom"){
        if(ugLibAv_codec != NONE){
            ugCLIcommand += " -c ";
            if(ugLibAv_codec != "MJPEG" && ugLibAv_codec_bitrate > 0){
                ugCLIcommand += "libavcodec:codec=" + ugLibAv_codec + ":bitrate=" + ugLibAv_codec_bitrate + "M";
            } else {
                ugCLIcommand += "libavcodec:codec=" + ugLibAv_codec;
            }
        }
    }
}

// NONE, OPUS, speex, FLAC, AAC, MP3, G.722, u-law, A-law, PCM

function cliADD_audioCodec(){
    if(ugAudioCaptureMode != "custom" && ugAudioCaptureMode != "testcard"){
        // codecs
        if(ugAudio_codec != NONE){
            ugCLIcommand += " --audio-codec ";
            ugCLIcommand += ugAudio_codec;  
            if(ugAudio_codec == "OPUS"){
                if(ugAudio_codec_bitrate > 0){
                    ugCLIcommand += ":bitrate=" + ugAudio_codec_bitrate;
                }
            } else {
                if(ugAudio_codec_sample_rate > 0){
                    ugCLIcommand += ":sample_rate=" + ugAudio_codec_sample_rate;
                }
            }
        }   
        // audio mapping
        if(ugAudio_channels > 0){
            ugCLIcommand += " --audio-capture-format channels=" + ugAudio_channels;
        }
        if(ugAudio_channel_mapping != NONE && ugAudio_channel_mapping != "bang" && ugAudio_channel_mapping.length > 2){
            ugCLIcommand += " --audio-channel-map " + ugAudio_channel_mapping;
        }
    }
}
        
function cliADD_videoTestcard(){
    ugCLIcommand += " -t ";
    ugCLIcommand += ugVideoTestcard;
}

function cliADD_audioTestcard(){
    ugCLIcommand += " -s ";
    ugCLIcommand += ugAudioTestcard;
}

function cliADD_port(_port){
    if(ugAV_mode != 2){
        ugCLIcommand += " -P" + _port;
    } else {
        ugCLIcommand += " -P" + _port + ":" + _port + ":" + (_port+2) + ":" + (_port+2);
    }
}

function cliADD_videoReceive(){
    if(ugVideoReceiverMode == "custom"){
        if(ugCustomFlagsVideo_receive != NONE){
            ugCLIcommand += " " + ugCustomFlagsVideo_receive;
        }
    } else {
        ugCLIcommand += " -d ";
        if(ugVideoReceiverMode == "texture" || ugVideoReceiverMode == "spout" || ugVideoReceiverMode == "syphon"){
            ugCLIcommand += ugDisplay_flag_prefix + "'" + ugTexture_display + "'";
            if(ugDisplay_window_show){
                ugCLIcommand += ":hide-window";
            }
        } else if(ugVideoReceiverMode == "ndi"){
            ugCLIcommand += "ndi:name=" + "'" + ugNDI_display + "'";
        }        
    }
}

function cliADD_audioReceive(){
    ugCLIcommand += " audio receive not implemented yet";
}

// portaudio, jack, coreaudio, wasapi, embedded, analog, AESEBU, custom, testcard
function cliADD_audioReceive(){
    if(ugAudioReceiveMode == "custom"){
        if(ugCustomFlagsAudio_receive != NONE){
            ugCLIcommand += " " + ugCustomFlagsAudio_receive;
        }
    } else {
        ugCLIcommand += " -r";
        if(ugAudioReceiveMode == "portaudio"){
            ugCLIcommand += " portaudio";
            if(ugPortaudio_receive != DEFAULT){
                ugCLIcommand += ":" + ugPortaudio_receive;
            }
        } else if(ugAudioReceiveMode == "coreaudio"){
            ugCLIcommand += " coreaudio";
            if(ugCoreaudio_receive != DEFAULT){
                ugCLIcommand += ":" + ugCoreaudio_receive;
            }
        } else if(ugAudioReceiveMode == "wasapi"){
            ugCLIcommand += " wasapi";
            if(ugWasapi_receive != DEFAULT){
                ugCLIcommand += ":" + ugWasapi_receive;
            }
        } else if(ugAudioReceiveMode == "jack"){
            ugCLIcommand += " jack";
            if(ugJack_receive != DEFAULT){
                ugCLIcommand += ":" + ugJack_receive;
            }

        } else if(ugAudioReceiveMode == "embedded"){
            ugCLIcommand += " embedded";

        } else if(ugAudioReceiveMode == "analog"){
            ugCLIcommand += " analog";

        } else if(ugAudioReceiveMode == "AESEBU"){
            ugCLIcommand += " AESEBU";

        } 
    }
}

function cliADD_router(){
    ugCLIcommand += " " + ugRouter;
}

function cliADD_LANip(){
    ugCLIcommand += " " + ugLANip;
}

function cliADD_holePunching(){
    ugCLIcommand += " -Nholepunch";
    ugCLIcommand += ":room=" + ugRoomName +"_ch_" + ugChannelNr;
    ugCLIcommand += ":coord_srv='" + ugHolePuncherURL + ":" + ugHolePuncherPort + "'";
    ugCLIcommand += ":stun_srv='" + ugStunServerURL + ":" + ugStunServerPort + "'";
}

function cliADD_captureFilter(){
    if(ugCapture_filter != NONE){
        ugCLIcommand += " --capture-filter " + ugCapture_filter;
    }
}

function cliADD_postprocessing(){
    if(ugReceive_postprocessor != NONE){
        ugCLIcommand += " -p " + ugReceive_postprocessor;
    }
}


function generate(){
    cliClear();
    if(ugNetworkMode == "send to router"){
        if(ugAV_mode != 1){
            cliADD_captureFilter();
            cliADD_videoCapture();
            cliADD_videoCodec();            
        }
        if(ugAV_mode != 0){
            cliADD_audioCapture();
            cliADD_audioCodec();            
        }
        cliADD_port(ugPort);
        cliADD_router();
    } else if(ugNetworkMode == "receive from router"){
        if(ugAV_mode != 1){
            cliADD_videoTestcard(); // to open proxy
            cliADD_postprocessing();
            cliADD_videoReceive();
        }
        if(ugAV_mode != 0){
            cliADD_audioTestcard(); // to open proxy
            cliADD_audioReceive();
        }
        cliADD_port(ugPort);
        cliADD_router();
    }else if(ugNetworkMode == "peer to peer (manual)"){
        cliADD_port(ugLANPort);
        if(ugConnection_mode != 0){
            if(ugAV_mode != 1){
                cliADD_postprocessing();
                cliADD_videoReceive();
            }
            if(ugAV_mode != 0){
                cliADD_audioReceive();
            }
        }
        if(ugConnection_mode != 1){
            if(ugAV_mode != 1){
                cliADD_captureFilter();
                cliADD_videoCapture();
                cliADD_videoCodec();            
            }
            if(ugAV_mode != 0){
                cliADD_audioCapture();
                cliADD_audioCodec();            
            }
            cliADD_LANip();
        }
    }else if(ugNetworkMode == "peer to peer (automatic)"){
        if(ugConnection_mode != 1){
            if(ugAV_mode != 1){
                cliADD_captureFilter();
                cliADD_videoCapture();
                cliADD_videoCodec();            
            }
            if(ugAV_mode != 0){
                cliADD_audioCapture();
                cliADD_audioCodec();            
            }
        }
        if(ugConnection_mode != 0){
            if(ugAV_mode != 1){
                cliADD_postprocessing();
                cliADD_videoReceive();
            }
            if(ugAV_mode != 0){
                cliADD_audioReceive();
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
