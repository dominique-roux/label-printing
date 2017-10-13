# Apache httpd
## Installation
Install Apache and mod_proxy:

    sudo apt-get update  
    sudo apt-get install apache2
    sudo apt-get install libapache2-mod-proxy-html

Activate mod_proxy

    sudo a2enmod proxy_http

## Configuration
Edit the configuration file

    sudo nano  /etc/apache2/sites-enabled/000-default.conf

Create an alias for the label pages

    Alias /label "/home/pi/label/www"
    <Directory "/home/pi/label/www">
      Options Indexes FollowSymLinks
      AllowOverride All
      Allow from all
      Require all granted
    </Directory>

Create a proxy for the service:

    #Route /print to node.js ws
    ProxyPreserveHost On

    ProxyPass /print http://0.0.0.0:8082/api/
    ProxyPassReverse /print http://0.0.0.0:8082/api/


Save the file and restart httpd:

    sudo service apache2 restart

# Labels
## Copy files
Create the following folders on the pi:

    |_ home
      |_ pi
        |_ label
          |_ www


Copy the content of the [src](src) to the "www" folder

## Configuration
Configure the labels in:

    |_ home
      |_ pi
        |_ label
          |_ www
            |_ conf

Change the permissions to make it accessible by httpd

    chmod 755 -R /home/pi/label/
