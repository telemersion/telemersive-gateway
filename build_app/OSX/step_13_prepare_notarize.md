# Notarization 

How to Notarize the Telemersive Gateway

in general, follow this instrucitons:

https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution/customizing_the_notarization_workflow


Create App-specific password https://support.apple.com/en-us/102654
you need to login into https://appleid.apple.com/

execute in the terminal:

xcrun notarytool store-credentials "Telemersive-Notarization" --apple-id "<apple_id>" --team-id "<teamid>" --password „<password>“

this creates a keychain profile inside the keychain app:

com.apple.gke.notary.tool

and then execute next steps