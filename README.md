# Telemersive Gateway 0.1.0

Telemersive Gateway is a peer application implementing the telemersive-bus protocol. It communicates with the telemersive-router to connect all peers inside a telemersive room.

## Installation

### Requirements
You need to have [MaxMSP](https://cycling74.com/) installed. There is no need for a license.


### Download
To install the Telemersive Gateway: clone the gitlab repository into a directory called 'TeSApp'. It is important, that the directory is called this way, otherwise the MaxProject will not work:

```
git clone https://gitlab.zhdk.ch/TPF/tesapp.git
```

### Startup
1. open MaxMSP
2. Go to File > Open.. and navigate to 'TeSApp.maxproj'
3. Inside the new Project Window locate 'TeSApp.maxpat' and double click it
4. You might be confronted with different popup windows mentioning missing dependencies:
    * Missing MaxPackages like Spout (on Windows) or Syphon (on OSX) -> simply follow the 'install' button.
    * Missing NodeJS Libraries -> the [config] window should be already open > go to tab 'debug' and press 'script npm install'. Once the debug tool turns from blue to green, you are good to go.
5. If you want to get videostreams or synchronize your files: set paths to externals > tab 'externals'.
    *  For enabling videostreams you need to donwload ultragrid and point the app to the ultragrid app.
    * For synching files on windows you need to have cygwin installed. During the installation process, make sure you install 'rsync', which is not installed by default. On OSX this is installed by default.
    * **Windows only:** If you want to send Mocap data from Motive (Optitrack), you need the NatNet2OSC apps. Motive 2.x will work with NatNet3. If you only want to receive data, there is no need for this external.


### login
1. Enter your credentials under the tab 'login'. This infos are confidential and are only provided on a need to know basis.
    * Broker URL:  e.g. 'telematics.zhdk.com'
    * Broker Port: e.g. '1883'
    * Broker User: e.g. 'peer'
    * Broker Pwd:
    * Network Card: If your machine has more than one network card available, you will have to choose which one you want to use.
    * press 'connect'

If the connection is successful, the red 'disconnect' button gets highlighted and the green 'connect' button greyed-out.

2. Once you are connected, you can either create a room or join an already existing room. In any case, the procedure is the same:
    * Enter your PeerName
    * Select a room from the menu or enter a room name.
    * Enter the room password
    * press 'join'

If the room join is successful, the red 'leave' button gets highlighted and the green 'join' button greyed-out.

3. press 'save' to save all the credentials for your next login.

4. press 'close' to close the [config]-window.
