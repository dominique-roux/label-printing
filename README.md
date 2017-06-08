# Introduction
The purpose of this project is to allow to easily generate labels (including QR codes) and print them directly on a [Dymo® LabelWriter® 450 printer](http://www.dymo.com/en-US/labelwriter-450-label-printer)

The solution is using a [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) as server and is then accessible as a web service


# Overall architecture
## Schema
    --------------------------------+--------------------------------+-----
                                    |                                |
                                 Ethernet                       Wi-Fi / Ethernet
                                    |                                |
    +-------------------------------+----------------------+   +-----+------+
    | Raspberry Pi 3 / Raspbian                            |   |            |
    |                                                      |   |            |
    |                                                      |   |  Client    |
    |                                                      |   |            |
    |   +---------------+     +------------------------+   |   |            |
    |   | Configuration |     | Apache httpd           |   |   |            |
    |   | File (json)   |     | +--------------------+ |   |   |            |
    |   |               |     | |                    | |   |   |            |
    |   |               <-------> Labels generation  |<--------+            |
    |   |               |     | |                    | |   |   |            |
    |   |               |     | +--------------------+ |   |   |            |
    |   +---------------+     +------------------------+   |   |            |
    |                                                      |   |            |
    |   +---------------+     +------------------------+   |   |            |
    |   | pm2           |     | Node.js                |   |   |            |
    |   |               |     |                        |   |   |            |
    |   |               |     | +--------------------+ |   |   |            |
    |   |               <-------> Print Service      |<--------+            |
    |   |               |     | |                    | |   |   |            |
    |   |               |     | +--------------------+ |   |   +------------+
    |   +---------------+     +------------------------+   |
    |                                 |                    |
    |                         +-------+--------+           |
    |                         | Command Line   |           |
    |                         |   +-------+    |           |
    |                         |   |Driver |    |           |
    |                         |   +-------+    |           |
    |                         |   +-------+    |           |
    |                         |   | CUPS  |    |           |
    |                         |   +-------+    |           |
    |                         +----------------+           |
    +---------------------------------+--------------------+
                                      |
                                     USB
                                      |
    +---------------------------------+--------------------+
    |                       Dymo® LabelWriter® 450         |
    +------------------------------------------------------+

## Printer
The printer is connected to the Pi via USB

## Pi
The Pi is running Raspbian and is connected to the network with an Ethernet cable.  
> We cannot use Wi-Fi because it requires to enter credentials and possibly to change them periodically. That would be too painful to manage with a headless device  

See [here](./pi)

## Driver
The driver provided by Dymo® is installed and an additional C++ class is added on top of it to provide a convenient command line

See [here](./driver)

## Printing Service
[Node.js®](https://nodejs.org/en/) is installed to host the printing service  
[PM2](http://pm2.keymetrics.io) is installed to manage the Service  
A web service was created to print labels  

See [here](./server)

## Labels
[Apache httpd](https://httpd.apache.org) is installed and configured to host the label generation service  
A Web page was created to generate and display labels. The data to transferred as GET parameters
The configuration of the different labels are in a json file

See [here](./labels)
