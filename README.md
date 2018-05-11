
<p align="center">
<img src="https://i.imgur.com/R2966La.png">
<h1 align="center">Browser-Mirror</h1>
</p>

Browser-Mirror allows two (or more) remote browsers visiting the same web page to share state without the overhead of screen sharing.

![Browser Mirror Demo](https://i.imgur.com/Pabb0DW.gif)

![Browser Mirror Demo](https://i.imgur.com/535uysg.gif)

## Requirements

 - **Server**
    - A modern version of Node (I'm using 8)
    - NPM is preferred for installing the server
  - **Clients**
    - HTML5 browsers with support for ECMA6 & Websockets 

## Quickstart

#### Install the server

 1) Navigate to where ever you want to install the server.
 2) `npm install browser-mirror`
 3) Might need to `chmod +x bm-server`
 4) Run `./bm-server` to output everything to the console as it runs **OR**
      - Run `./bm-server > bmlogs.txt 2>&1 &` to run in background and output to a log file **OR**
      - Run `./bm-server > /dev/null 2>&1 &` to run it in the background and ignore all output.
 5) To stop server cmd-c (or ctrl-c) if running in foreground, else `killall bm-server`
 
 #### Run the examples
  
  1) Change the host in the `BMClient` constructors in the `slave.html` and `master.html` files in the examples folder to the host where the server is running.
  2) Open `master.html` in one browser, and open `slave.html` in another browser (or on another computer).

Still a work in progress, check back later for docs.
