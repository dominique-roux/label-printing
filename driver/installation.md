# Cups
Make sure the repository is up to date:

    sudo apt-get update


Install cups:

    sudo apt-get install libcups2-dev libcupsimage2-dev g++ cups cups-client



# Dymo driver
Create a folder:

    mkdir dymo
    cd dymo/

Download and unpack the driver

    wget http://download.dymo.com/Download%20Drivers/Linux/Download/dymo-cups-drivers-1.4.0.tar.gz
    tar xvf dymo-cups-drivers-1.4.0.tar.gz

> You can check for newer version of the driver directly from [Dymo](http://www.dymo.com/en-US/online-support/dymo-user-guides)  
You can also get it from [here](dymo-cups-drivers-1.4.0.tar.gz)


Compile and install the driver:

    cd dymo-cups-drivers-1.4.0.5/
    sudo ./configure
    sudo make
    sudo make install


Configure the driver:

    sudo apt-get install links2
    sudo usermod -a -G lpadmin pi
    links2 http://localhost:631/admin

    #Add the printer

    #Not sure if the following line is needed
    sudo /etc/init.d/cups start


# Command line
We'll now create a CLI that will be used by our web service  
Copy [labelPrint.cpp](labelPrint.cpp) to the dymo folder

Compile the CLI:

    g++ `cups-config --cflags` labelPrint.cpp `cups-config --libs` -o labelPrint

The command line is now ready. You can test it , copy a picture to the dymo folder and run the following command line:

    ./PrintLabel <ImageName> <pagesize>
      # Where
      #  <ImageName> is the name of the image file you want to print
      #  <pagesize> is the format of the label (e.g. w118h252)

    # Example:
    ./PrintLabel example.png  w118h252
