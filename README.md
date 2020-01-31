# orientation-websocket
sends device orientation data to another device via websockets

note: 
device orientation requires https... and websockets cant function w mismatched secure and not secure, so a self signed https certificate is requred, but dont worry it's easy 👍🏼

---
## install
```
npm i
```

---
## creating a self-signed HTTPS certificates
run from the command line:
```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```
then place the `cert.pem` + `key.pem` files in the root of this directory (peer w this file)

---
## start server
```
npm run server
```
on your DEVICE navigate to the SERVER's IP + port to accept the backend self-signed certificates (that's https://192.168.1.14:9000 or your local IP address). in Chrome you click advanced, then proceed to (unsafe) site, then if appears that nothing happens because the server isnt serving anything.

---
## serve client 
```
npm run client
```
on your DEVICE navigate to the CLIENT's IP + port, accept those self-signed certificates (that's https://192.168.1.14:8000 or similar)

---
## normal setup
- 1 server (computer)
- 2 clients (device + computer)
---
## usage
1. input the IP + port of the server in the input field, then click connect. (something like: wss://192.168.1.14:9000)
2. monitor your device's orientation in the server console. the server simply broadcasts this data back out to any other clients listening
