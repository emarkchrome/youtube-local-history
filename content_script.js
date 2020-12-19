let s = document.createElement('script');

s.src = browser.runtime.getURL('event_listener.js');
s.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(s);

let port = browser.runtime.connect({name: 'youtube-history'});
port.postMessage({message: 'Hello! I am a content script!'});

// create history entry for video (log at 0% watched)
// start watch for video progress on play event
// log watched video segments every 5 seconds ( allow a setting to change this)
// log watched video segments every pause, and on Window.beforeunload event
// dont log if #movie_player has class .ad-interrupting
// quit logging at Window.beforeunload event, or when #movie_player has class .ended-mode, or when there is a pause event

port.onMessage.addListener(function(data) {
    console.log('Received communication: >>' + data.message);
});

const config = { attributes: true, childList: true, subtree: true };

const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
        console.log(mutation.addedNodes[0].className || null);
    }
}

const observer = new MutationObserver(callback);

observer.observe(document, config);
