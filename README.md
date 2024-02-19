# start

install couch db

access it at localhost:5984/_utils

create the following databases:

- central
- users
- sessions

create database views

- /users/_design/_design/_view/tutti

- /sessions/_design/_design/_view/all
- /sessions/_design/_design/_view/is_active

- /central/_design/prices/_view/price_list_by_date
- /central/_design/prices/_view/all

install dependencies and start application

```
npm i ; npm run dev
```

use the price list located at /docs/prices.xlsx and upload it using the application upload prices button

## clone bizerba scale setup repository

```
git clone  https://<username>:<token>@github.com/marelsrl/bizerba-scale-setup.git
```

use the files in that repository to:

- basic dependencies
    install /bizerba-scale-setup/CRRuntime_64bit_13_0_20.msi (if your sys is 64 bits)
    install /bizerba-scale-setup/jre-8u151-windows-i586.exe

    unzip /bizerba-scale-setup/deps/WinRAR 5.30.zip

    execute /bizerba-scale-setup/deps/WinRAR 5.30/WinRAR v5.30/Setup 64 Bit.exe

- bizerba dependencies
    using the winrar  downloded in the step before,

download bizerba configured files from this link:
https://drive.google.com/file/d/1rTEuw0iQ_-De3TGJIcXY0HaZ7b2-L6pW/view?usp=sharing

or unzip /bizerba-deps/C_Bizerba_2018_02_18


### unzip all files from  visual studio sql server 16 from google drive and install on your computer using this link

<https://drive.google.com/file/d/1YGUcZoRUrN0E1RIYtJfNduOPcT4ju2FG/view>

open unzipped folder and execute setup.exe file

this will install sql server on your computer

select the first option and keep clicking next

follow the instructions to set the current user as database admin user.  

download ssms from this link to manage the sqlserver database:
<https://aka.ms/ssmsfullsetup>

### BIZERBA SCALE SECTION

open powershell as adimistrator

execute /RetailConnect/RetailConnect/RetailConnectSrv.exe -service

install nmap from this link:
<https://nmap.org/dist/nmap-7.94-setup.exe>

open terminal and retrieve scale ipAddress using nmap using this command:

```powershell
nmap 192.168.xxx.0/24 -sn
```

locate in the response the ip address with the name of the bizerba scale. Eg:

```powershell
Nmap scan report for 192.168.1.135
Host is up (0.010s latency).
MAC Address: 00:40:C1:37:DF:8E (Bizerba-werke Wilheim Kraut)
```


execute /RetailConnect/RetailConnectView/RetailConnectView.exe

~ load config file ("/RetailConnect/RetailConnect/RetailConnect.xml") : 
.RetailConnect > import > Load configuration from file

~ set scale ip  > terminals > LW_SCONTRINI_MASTER

set the following fields:

TCPIPAddress: <ip from nmap scan (192.168.1.135)>
Active: yes

execute /MultiTraceConnect/MTC Retail 4.0.exe

insert licence key: vdPvBài(&jæUTUWVrROòkju=|ZCù.$lF=|

restart /MultiTraceConnect/MTC Retail 4.0.exe

insert database string connection:
Data Source=,COMPUTER_NAME>;Initial catalog=MultitraceConnect;Persist Security Info=True;Encrypt=False;User Id=bizerba;Password=desio172;TrustServerCertificate=True

test connection and corfirm
