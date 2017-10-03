# Node.js
Node.js is used to host the printing service  
Here are the steps to install it  
Check processor type and version:

    uname -m

We should normally have:

    armv7l

If not, check how to have the correct version of node.js

Install node.js

	curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
	sudo apt-get install nodejs


# pm2
pm2 is used to manage the services
## Installation
Install pm2

	sudo npm install pm2 -g


## Configuration
Update pm2 startup configration

    sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi

    sudo vi /etc/systemd/system/pm2-pi.service

    Restart=always
    RestartSec=5
    Environment=PM2_HOME=/home/pi/.pm2
    PIDFile=/home/pi/.pm2/pm2.pid

# Printing Service
## Copy files
Create the following folders on the pi:

    |_ home
      |_ pi
        |_ label
          |_ service


Copy the following files to "service" folder:  
- [labelPrinter.js](src/labelPrinter.js)
- [conf.json](src/conf.json)
- TODO: Driver

## Install Dependancies
Then we need to install the following libs:

	npm install request
	npm install express
	npm install body-parser
	npm install child_process
  npm install console-stamp


Start the service and save the configuration

    pm2 start /home/pi/label/service/labelPrinter.js --name labelPrinter --watch -- /home/pi/label/service/conf.json
    pm2 save
