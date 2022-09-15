autowatch = 1;

outlets = 2;

var myval=0;

var ugPort = 5004;
var ugRouter = "gitlab.zhdk.ch/telemersion";
var ugLANip = "1.0.0.127";
var ugFilePath = "ug.exe";
var ugFPS_attribute = "fps";
var ugTexture_capture = "texture";
var ugTexture_fps = 60;
var ugCustomFlags_capture = "empty";
var ugCustomFlags_display = "empty";
var ugTestcard = "testcard:80:60:1:UYVY";
var ugNDI_capture = "ndi";
var ugDisplay_flag_prefix = "syphon";
var ugDisplayMode = 0;
var ugVideoCaptureMode = "testcard";
var ugLibAv_codec = "NONE";
var ugLibAv_codec_bitrate = 10;
var ugMode = "none";
var ugJoined = false;
var ugEnabled = false;
var isRunning = false;
var ugVerboseExecute = false;
var ugNDI_display = "NDIChannel";

var ugCLIcommand = "";

if (jsarguments.length>1)
	myval = jsarguments[1];

function loadbang(){
    //post("gathering information on the patcher hierarchy..\n");
}

function ug_printoutCLI(){
	post("ultragrid CLI: " + ugCLIcommand.toString() + "\n");
}

function ug_verboseExecute(_verbose){
    ugVerboseExecute = _verbose;
	post("ugVerboseExecute: " + ugVerboseExecute + "\n");
}

function dpost(_post){
	//post("peerList: " + _post + "\n");
}

function ugf_port(_portNumber){
    ugPort = _portNumber;
	post("ugPort: " + ugPort + "\n");
}

function ugf_router(_serverName){
    ugRouter = _serverName;
	post("ugRouter: " + ugRouter + "\n");
}

function ugf_lanIP(_lanIP){
    ugLANip = _lanIP;
	post("ugLANip: " + ugLANip + "\n");
}

function ugf_filePath(_filePath){
    ugFilePath = _filePath;
	post("ugFilePath: " + ugFilePath + "\n");
}

function ug_videoCaptureMode(_videoCaptureMode){
    ugVideoCaptureMode = _videoCaptureMode;
	post("ugVideoCaptureMode: " + ugVideoCaptureMode + "\n");
}

function ugf_fps_attribute(_fps_attribute){
    ugFPS_attribute = _fps_attribute;
	post("ugFPS_attribute: " + ugFPS_attribute + "\n");
}

function ugf_texture_fps(_texture_fps){
    ugTexture_fps = _texture_fps;
	post("ugTexture_fps: " + ugTexture_fps + "\n");
}

function ugf_texture_capture(_texture_capture){
    ugTexture_capture = _texture_capture;
	post("ugTexture_capture: " + ugTexture_capture + "\n");
}

function ugf_customFlagsCapture(_customFlagsCapture){
    ugCustomFlags_capture = _customFlagsCapture;
	post("ugCustomFlags_capture: " + ugCustomFlags_capture + "\n");
}

function ugf_customFlags_display(_customFlags_display){
    ugCustomFlags_display = _customFlags_display;
	post("ugCustomFlags_display: " + ugCustomFlags_display + "\n");
}

function ugf_ndi_capture(_ndiCapture){
    ugNDI_capture = _ndiCapture;
	post("ugNDI_capture: " + ugNDI_capture + "\n");
}

function ug_displayMode(_displayMode){
    ugDisplayMode = _displayMode;
	post("ugDisplayMode: " + ugDisplayMode + "\n");
}

function ugf_display_flag_prefix(_display_flag_prefix){
    ugDisplay_flag_prefix = _display_flag_prefix;
	post("ugDisplay_flag_prefix: " + ugDisplay_flag_prefix + "\n");
}

function ugf_texture_display(_texture_display){
    ugTexture_display = _texture_display;
	post("ugTexture_display: " + ugTexture_display + "\n");
}

function ugf_ndi_display(_ndi_display){
    ugNDI_display = _ndi_display;
	post("ugNDI_display: " + ugNDI_display + "\n");
}

function ugf_display_window_show(_display_window_show){
    ugDisplay_window_show = _display_window_show;
	post("ugDisplay_window_show: " + ugDisplay_window_show + "\n");
}

function ugf_LibAv_codec(_video_codec){
    ugLibAv_codec = _video_codec;
	post("ugLibAv_codec: " + ugLibAv_codec + "\n");
}

function ugf_LibAv_codec_bitrate(_video_codec_bitrate){
    ugLibAv_codec_bitrate = _video_codec_bitrate;
	post("ugLibAv_codec_bitrate: " + ugLibAv_codec_bitrate + "\n");
}

function ug_mode(_ugMode){
    ugMode = _ugMode;
	post("ugMode: " + ugMode + "\n");
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
            outlet(0, "start", ugCLIcommand);
        }
    } else {
        if(isRunning){
            isRunning = false;
            outlet(0, "pkill");
        }
    }   
}

function cliClear(){
    ugCLIcommand = [];
}

function cliADD_path(){
    ugCLIcommand.push(ugFilePath);
}

function cliADD_videoCapture(){
    if(ugVideoCaptureMode == "testcard"){
        ugCLIcommand.push("-t");
        ugCLIcommand.push(ugTestcard);
    } else if(ugVideoCaptureMode == "texture"){
        ugCLIcommand.push("-t");
        if (ugTexture_fps > 0){
            ugCLIcommand.push(ugTexture_capture+ugFPS_attribute+ugTexture_fps);
        } else {
            ugCLIcommand.push(ugTexture_capture);                              
        }
    } else if(ugVideoCaptureMode == "ndi"){
        ugCLIcommand.push("-t");
        ugCLIcommand.push(ugNDI_capture);
    } else if(ugVideoCaptureMode = "custom"){
        ugCLIcommand.push(ugCustomFlags_capture);
    }
}

function cliADD_testcard(){
    ugCLIcommand.push("-t");
    ugCLIcommand.push(ugTestcard);
}

function cliADD_port(_offset){
    ugCLIcommand.push("-P" + ugPort);
}

function cliADD_videoCodec(){
    if(ugLibAv_codec != "NONE"){
        ugCLIcommand.push("-c");
        if(ugLibAv_codec != "MJPEG" && ugLibAv_codec_bitrate > 0){
            ugCLIcommand.push("libavcodec:codec=" + ugLibAv_codec + ":bitrate=" + ugLibAv_codec_bitrate + "M");
        } else {
            ugCLIcommand.push("libavcodec:codec=" + ugLibAv_codec);
        }
    }
}

function cliADD_display(){
    if(ugDisplayMode != "NONE"){
        ugCLIcommand.push("-d");
        if(ugDisplayMode == "texture"){
            ugCLIcommand.push(ugDisplay_flag_prefix + "'" + ugTexture_display + "'");
        } else if(ugDisplayMode == "ndi"){
            ugCLIcommand.push("ndi:" + "'" + ugNDI_display + "'");
        } else if(ugDisplayMode == "custom"){
            ugCLIcommand.push(ugCustomFlags_display);
        }
    }
}

function cliADD_router(){
    ugCLIcommand.push(ugRouter);
}

function cliADD_LANip(){
    ugCLIcommand.push(ugLANip);
}

function generate(){
    cliClear();
    if(ugMode == "send to router"){
        cliADD_path();
        cliADD_videoCapture();
        cliADD_videoCodec();
        cliADD_port(0);
        cliADD_router();
    } else if(ugMode == "receive from router"){
        cliADD_path();
        cliADD_testcard(); // to open proxy
        cliADD_display();
        cliADD_port(1);
        cliADD_router();
    }else if(ugMode == "send to LAN IP"){
        cliADD_path();
        cliADD_videoCapture();
        cliADD_videoCodec();
        cliADD_port(0);
        cliADD_LANip();
    }else if(ugMode == "receive from LAN"){
        cliADD_path();
        cliADD_display();
        cliADD_port(1);
        cliADD_LANip();        
    }else if(ugMode == "capture to local texture"){
        cliADD_path();
        cliADD_videoCapture();
        cliADD_display();        
    }
    ug_printoutCLI();
}

function anything()
{
	var a = arrayfromargs(messagename, arguments);
	post("received message " + a + "\n");
	//myval = a;
	//bang();
}
