# TROUBLESHOOTING 

in case of an invalid notarization you can download the logfile with the following command:

'''
xcrun notarytool log <id> --keychain-profile "Telemersive-Notarization" developer_log.json
'''