# Telemersive Gateway 0.1.0

Telemersive Gateway is a peer application implementing the telemersive-bus protocol. It communicates with the telemersive-router to connect all peers inside a telemersive room.

## Installation

### Requirements
You need to have [MaxMSP](https://cycling74.com/) installed. There is no need for a license.


### Download
To install the Telemersive Gateway: clone the gitlab repository into a directory called 'telemersive-gateway'. It is important, that the directory is called this way, otherwise the MaxProject will not work:

```
git clone https://gitlab.zhdk.ch/telemersive-bus/telemersive-gateway.git
```

### Startup for the first time
1. open MaxMSP
2. Go to File > Open.. and navigate to 'telemersive-gateway.maxproj'
3. Inside the new Project Window locate 'TelemersiveGateway.maxpat' and double click it
4. You might be confronted with different popup windows mentioning missing dependencies:
    * Missing MaxPackages like
    ![Dependencies](/media/GUI_Dependencies.png "Dependencies")
      * Spout (on Windows) or Syphon (on OSX)
      * Sadam Libraries
      -> simply follow the 'install' button.
    * Missing NodeJS Libraries -> the [config] window should be already open > go to tab 'debug' and press 'script npm install'. Once the debug tool turns from blue to green, you are good to go.
    ![Debug](/media/GUI_Debug.png "Debug")

5. If you want to get videostreams or synchronize your files: set paths to externals > tab 'externals'.
    *  For enabling videostreams you need to download Ultragrid and point the app to the ultragrid app.
    * **Windows only:** For synching files on windows you need to have cygwin installed. During the installation process, make sure you install 'rsync', which is not installed by default. On OSX this is installed by default.
    * **Windows only:** If you want to send Mocap data from Motive (Optitrack), you need the NatNet2OSC apps. Motive 2.x will work with NatNet3. If you only want to receive data, there is no need for this external.
    ![Externals](/media/GUI_Externals.png "Externals")


### Login

![Login](/media/GUI_Login.png "Login")

1. Enter your credentials under the tab 'login'. This infos are confidential and are only provided on a need to know basis.
    * Router URL:  e.g. 'telematics.zhdk.com'
    * Router Port: e.g. '1883'
    * Router User: e.g. 'peer'
    * Router Pwd: e.g. '*******'
2. Network Card: If your machine has more than one network card available, you will have to choose which one you want to use.
3. press 'connect'

If the connection is successful, the red 'disconnect' button gets highlighted and the green 'connect' button greyed-out.

4. Once you are connected, you can now see all the available rooms to join.
5. Enter your room credentials.
    * Enter your PeerName
    * Select a room from the menu or enter a room name.
    * Enter the room password

If the room you enter doesn't exist, a new room will be created and the password will be set as the room password. The password cannot be changed anymore, only once every peer has left the room, the room manager (a service of the telemersive-router) removes the room and again a new room with the same name but with a new password can be created.

6. press 'join'

If the room join is successful, the red 'leave' button gets highlighted and the green 'join' button greyed-out.

7. press 'save' to save all the credentials for your next login. Save also stores your local device settings.

press 'close' to close the [config]-window.

### Closing the app
press the 'quit' button in the upper right corner

![Login](/media/GUI_Quit.png "Login")

You will be presented with a choice:

'cancel' will cancel the process.
'No' will quit the app **without** saving the current state.
'Yes' will quit the app **after** saving the current state.
