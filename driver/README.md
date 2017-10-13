# Introduction
This part part contains everything needed to install the printer driver  
I worked from [this](https://community.ubnt.com/t5/UniFi-Wireless/RPI-Dashbutton-Turn-RaspberryPI-with-Dymo-LabelWriter-into-a/td-p/1667513)  
Everything within the folder and subfolders is under **GPL V2** because it is built with the Dymo® Driver which is under GPL V2

It is made of three steps:
- Install the printing system (CUPS)
- Download, compile, install and configure Dymo Drive
-Download and compile the command line

# Install Cups
    sudo apt-get update
    sudo apt-get install libcups2-dev libcupsimage2-dev g++ cups cups-client

# Install Dymo® Driver
## Download
Create the following folders on the pi:

    |_ home
      |_ pi
        |_ label
          |_ driver

Get the printer driver from dymo:

    wget http://download.dymo.com/Download%20Drivers/Linux/Download/dymo-cups-drivers-1.4.0.tar.gz

or from here:

    wget https://github.com/dominique-roux/label-printing/raw/master/driver/src/dymo-cups-drivers-1.4.0.tar.gz

## Unpack and compile:

    tar xvf dymo-cups-drivers-1.4.0.tar.gz
    cd dymo-cups-drivers-1.4.0.5/
    sudo ./configure
    sudo make
    sudo make install

## Configure the driver:

    sudo apt-get install links2
    sudo usermod -a -G lpadmin pi
    links2 http://localhost:631/admin

# Install command line
Get the file:

    cd
    cd label
    cd driver
    wget https://raw.githubusercontent.com/dominique-roux/label-printing/master/driver/src/labelPrint.cpp

Compile:

    g++ `cups-config --cflags` labelPrint.cpp `cups-config --libs` -o labelPrint
    chmod +x labelPrint

This is now ready
