

<p align="center">
<img src="https://i.imgur.com/R2966La.png" height="300">
<h1 align="center">Browser-Mirror</h1>
</p>

Browser-Mirror allows two (or more) remote browsers visiting the same web page to share state without the overhead of screen sharing.

## Requirements

 - **Server**
    - A modern version of Node (I'm using 8)
    - NPM is preferred for installing the server
  - **Clients**
    - HTML5 browsers with support for ECMA6 & Websockets 

## Quickstart

#### Install the server

 1) Navigate to where ever you want to install the server.
 2) Create a new directory for the server 
```
mkdir browser-mirror && cd browser-mirror
```
 3) Run the installer 
 ```
 curl -L https://raw.githubusercontent.com/Pamblam/browser-mirror/master/installer | bash
```
 4) Run `./bm-server` to output everything to the console as it runs **OR**
      - Run `./bm-server > bmlogs.txt 2>&1 &` to run in background and output to a log file **OR**
      - Run `./bm-server > /dev/null 2>&1 &` to run it in the background and ignore all output.
 5) To stop server cmd-c (or ctrl-c) if running in foreground, else `killall bm-server`
 
 #### Implement it
  
 The master page will control all the "slave" pages.

##### Set up the constructor.

    const mirror = BMClient(1, '127.0.0.1', 'master', 1337); 

The parameters are..

 1. Any developer specified session identifier. Can be a number or a string.
 2. The host where the server is installed.
 3. 'master' or 'slave' - there can only be one master per session, but unlimited slaves.
 4. The port the server is running on. It defaults to 1337.

##### Listen for errors

    mirror.onError(err=>{ 
        // do something with the err
        alert(err.message);
    }); 
    
##### Listen for session changes

This is mainly called when someone leaves or joins the session.

    mirror.onSessionUpdate(data=>{
        document.getElementById("count").html = `${data.members}` people in the current session";
    });

##### Connect to the Server

    mirror.connect();

##### Start the Session

Only the master should call the `start` method, and it should only be called when the session has all it's members. Monitor the `data.members` on each session update and call `start` when everyone has joined. Once the `start` method is called, no others will be allowed to join.

    mirror.start()

##### Custom session data

You can also broadcast custom data fro the master to each client.

In the master....

    mirror.setState({ anything: anything });

in the client....

    mirror.onStateChange(state=>console.log(state.anything);

### TODO

 - Scroll Event
 - Decent Real-world screencast