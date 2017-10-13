# Overview
You can find a lot of documentation on Internet. For example [here](https://www.raspberrypi.org/documentation/)  
You need to:
- Install Raspbian
- Configure it:
 - Enable ssh
 - Obtain IP address
 - Change server name
 - Change password
 - Configure Samba
- Create an image

# Install Raspbian
Download [Noobs](https://www.raspberrypi.org/downloads/noobs/) and unzip it on the sd card.

For headless setup, SSH can be enabled by placing a file named ssh, without any extension, onto the boot partition of the SD card. When the Pi boots, it looks for the ssh file. If it is found, SSH is enabled, and the file is deleted. The content of the file does not matter: it could contain text, or nothing at all.

Boot the raspberry and follow the instructions.

# Configure
## Enable ssh
As of the November 2016 release, Raspbian has the SSH server disabled by default.  
It can be enabled using raspi-config:
1. Enter **sudo raspi-config** in a terminal window
2. Select **Interfacing Options**
3. Navigate to and select **SSH**
4. Choose **Yes**
5. Select **Ok**
6. Choose **Finish**

## Get IP Address
Open a terminal window and type:  

    hostname -I


## Change server name
The default hostname is **raspberrypi**.  
If you have multiple Pi on your network you must change its name to make sure the name is unique.  
You can do it using  raspi-config:
1. Enter **sudo raspi-config** in a terminal window
2. Select **Hostname**
3. Select **Ok**
4. Enter the name you want
5. Select **Ok**


## Change password
The default user is **pi**  
The default password is **raspberry**  
You can use the default user but it is highly recommended to change the password.  
You can do it using  raspi-config:  
1. Enter **sudo raspi-config** in a terminal window
2. Select **Change User Password**
3. Select **Ok**
4. Enter the name you password you want (twice)
5. Select **Ok**

**MAKE SURE YOU REMEMBER THE PASSWORD YOU ENTERED**

# Samba
## Installation
    sudo-apt-get update
    sudo apt-get install samba samba-common-bin

## Configuration
Edit the configuration files

    sudo nano /etc/samba/smb.conf

Make sure the wins support is activated:

    wins support = yes

add the following section:

    [pihome]
      comment= Pi Home
      path=/home/pi
      browseable=Yes
      writeable=Yes
      only guest=no
      create mask=0777
      directory mask=0777
      public=no

Set the password:

	sudo smbpasswd -a pi

And restart the service

	sudo smbd restart




# Create an image
Once the configuration is finished, it is recommended to make an image of the SD card to facilitate restoration.
