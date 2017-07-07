# Node.js
Check processor type and version:

    uname -m

We should normally have:

    armv7l

If not, check how to have the correct version of node.js

Install node.js

	curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
	sudo apt-get install nodejs

Then we need to install the following libs:

	npm install request
	npm install express
	npm install body-parser
	npm install child_process

copy the following files to dymo folder of the pi:  
- [labelPrinter.js](src/labelPrinter.js)
- [conf.json](src/conf.json)

# pm2
Install pm2

	sudo npm install pm2 -g

Start the service and save the configuration

    pm2 start /home/pi/dymo/labelPrinter.js --name labelPrinter --watch -- /home/pi/dymo/conf.json
    pm2 save

Update pm2 startup configration

    sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi

    sudo vi /etc/systemd/system/pm2-pi.service

    Restart=always
    RestartSec=5
    Environment=PM2_HOME=/home/pi/.pm2
    PIDFile=/home/pi/.pm2/pm2.pid
