// --- websockets ---
let socket;

function connect() {
    console.log('connecting');
    message.innerText = 'connecting to ip';

    let ipElem = document.querySelector('#ip');
    let ip = ipElem.value

    // Create WebSocket connection.
    socket = new WebSocket(ip);
    // socket = new WebSocket('ws://localhost:8080/');

    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log('connected to server');
        message.innerText = 'connected to server';
        socket.send('Hello Server!');
    });

    // errors
    socket.addEventListener('error', function (event) {
        console.log('error from server');
        message.innerText = 'error from server';
        console.log('closing socket');
        socket.close();
    });
}

function disconnect() {
    console.log('disconnected');
    message.innerText = 'disconnected from server';
    socket.close();
}



// --- orientation ---
function deviceOrientationListener(event) {

    const ori = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
    };
    oriElem.innerText = JSON.stringify(ori);

    // if socket is open send orientation
    if (socket && socket.readyState == 1) {
        socket.send(JSON.stringify(ori));
    } else {
        message.innerText = 'socket connection not open';
    }

}

// start it up
// window.addEventListener("deviceorientation", deviceOrientationListener);
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", deviceOrientationListener);
} else {
    alert("Sorry, your browser doesn't support Device Orientation");
}


let message;
let oriElem;
// on load
document.addEventListener("DOMContentLoaded", function (event) {
    message = document.querySelector('#message');
    oriElem = document.querySelector('#ori');
});