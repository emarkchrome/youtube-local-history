let port;

function connected(p) {
    port = p;
    port.postMessage({message: 'Hello! I am the background script!'});
    port.onMessage.addListener(function(data) {
        console.log('Received communication: >>' + data.message);
    });
}

browser.runtime.onConnect.addListener(connected);
