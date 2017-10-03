# Update apt
Update apt-get database:

    sudo apt-get update  


# Apache httpd
Install Apache and mod_proxy:

    sudo apt-get install apache2
    sudo apt-get install libapache2-mod-proxy-html

Activate mod_proxy

    sudo a2enmod proxy_http

Proxify node js (on port 8080)

    sudo nano  /etc/apache2/sites-enabled/000-default.conf

Add the configuration:
    #Route /print to node.js ws
    ProxyPreserveHost On

    ProxyPass /print http://0.0.0.0:8082/api/
    ProxyPassReverse /print http://0.0.0.0:8082/api/


    Add the configuration:

Restart httpd:

    sudo service apache2 restart


# Samba
This is not required but very convenient

## Installation
    sudo apt-get install samba samba-common-bin

## Configuration
Edit the configuration files

    sudo vi /etc/samba/smb.conf

Make sure the wins support is activated:

    wins support = yes

add the following section:

	[www]
		comment= www Home
		path=/var/www/html
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

# TODO
  sudo chmod  -R a+x www/
  sudo chmod  -R a+r www/
  chmod o+x /home/pi/
  chmod o+x /home/pi/label/
