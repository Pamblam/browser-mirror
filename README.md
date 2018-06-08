




<p align="center">
<img src="https://i.imgur.com/R2966La.png" height="300">
<h1 align="center">Browser-Mirror v1.1.22</h1>
</p>

Browser-Mirror allows two (or more) remote browsers visiting the same web page to share state without the overhead of screen sharing.

## Requirements

 - **Server**
    - A modern version of Node & NPM
  - **Clients**
    - HTML5 browsers with support for ECMA6 & Websockets 

## Quickstart (For Mac & Linux)

#### Install the server

 1) Navigate to where ever you want to install the server.
 2) Create a new directory for the server:
```
mkdir bm-server && cd bm-server
```
 3) Login as root and run the installer:
```
sudo -s # Login as root if needed
source /dev/stdin <<< "$(curl -s https://raw.githubusercontent.com/Pamblam/browser-mirror/master/installer)"
```
 4) Run `bm server start` to start the websocket server. You can give it a port number if you want it to run a port other than 1337 (eg, `bm server start 1223`)
 5) Run `bm server stop` to stop the server
 6) Run `bm server logs` to view the server logs
 
#### Update the server

 1) Stop the server `bm server stop`
 2) Update the server `bm server update`
 3) Check that you have the latest version with `bm --version`
 4) restart the server `bm server start`

Run `man bm` or `bm --help` for further uses & info.
 
#### Implement it
  
 Add the client side JS file to your project, either by running `bm client install /path/to/project` or download it manually from the [git repo](https://raw.githubusercontent.com/Pamblam/browser-mirror/master/bm-client.js), then put in a script tag.

**-> Important: This script must be included above all other Javascripts <-**

    <script src='bm-client.js'></script>

The master page will control all the "slave" pages.

##### Set up the constructor.

    const mirror = BMClient(1, '127.0.0.1', 'master'); 

The parameters are..

 1. Any developer specified session identifier. Can be a number or a string.
 2. The host where the server is installed.
 3. 'master' or 'slave' - there can only be one master per session, but unlimited slaves.
 4. If using a port other than 1337, pass it in as the 4th argument.

##### Listen for errors

    mirror.onError(err=>{ 
        // do something with the err
        alert(err.message);
    }); 
    
##### Listen for session changes

This is mainly called when someone leaves or joins the session.

    mirror.onSessionUpdate(data=>{
        document.getElementById("count").innerHTML = `${data.members} people in the current session`;
    });

##### Connect to the Server

You can optionally pass `true` into the connect method if you wish to force all members to use the same browser as the Master. If your page does a CSS reset this might not be necessary, but if your page renders different on different browsers it's helpful to use this option.

    mirror.connect();

##### Start the Session

Only the master should call the `start` method, and it should only be called when the session has all it's members. Monitor the `data.members` on each session update and call `start` when everyone has joined. Once the `start` method is called, no others will be allowed to join.

You can optionally pass `true` into the start method to resize all browsers to match the size of the smallest browser in the session. This is helpful if the page being viewed is responsive or uses percentages for positioning by making sure the mouse cursor is always over the same elements for each of the members.

    mirror.start()

##### Custom session data

You can also broadcast custom data fro the master to each client.

In the master....

    mirror.setState({ anything: anything });

in the client....

    mirror.onStateChange(state=>console.log(state.anything));

### TODO

 - screencast gif (demo) for readme page
