# Telemersive Gateway 1.0.0

Telemersive Gateway is a peer to peer application based on MaxMSP. It allows to converse with multiple peers in different networks. A central server (called the [telemersive-router](https://gitlab.zhdk.ch/telemersion/telemersive-router)) allows to create virtual rooms inside which all peers can share their available resources.

![Diagram](media/DiagramUserView.svg "Solution")

For more information please visit  the [documentation](https://gitlab.zhdk.ch/telemersion/telemersive-gateway/-/wikis/Welcome).

## Installation

### Requirements
You need to have [MaxMSP](https://cycling74.com/) installed. There is no need for a license if you just want to work with telemersive-gateway.

### Download
To install the Telemersive Gateway: install the [latest release](https://gitlab.zhdk.ch/telemersion/telemersive-gateway/-/releases) inside the [MaxMSP package folder](https://docs.cycling74.com/max8/vignettes/packages) and call it 'telemersive-gateway'. It is not important that the directory is called this way, but otherwise the MaxProject will not work.

Restart Max. Now you should be able to find the telemersive-gateway package inside the package manager.

### Dependencies
The easy way to install all dependencies: open the package launcher and follow the instructions.

The telemersive-gateway requires additional MaxMSP packages.

* Sadam Objects
* Zero
* Spout / Syphon
* shell

It also needs a local installation of

* [Ultragrid](https://www.ultragrid.cz/), an opensource video networking framework with extremely low latency.
* [NatNetThree2OSC](https://github.com/tecartlab/app_NatNetThree2OSC),  an opensource app to convert native [optitrack](https://optitrack.com/software/) tracking data to OSC. (windows only)

Make sure MaxMSP has read-write access rights on the folders ultragrid and NatNet2OSC reside.

## Credits

Martin Froehlich (c) 2022 [Immersive Arts Space](http://immersive-arts.ch)

This project was only realized thanks to the generous support of the swiss national science foundation and the telematic project.
