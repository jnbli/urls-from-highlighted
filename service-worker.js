// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.
console.log("This prints to the console of the service worker (background script)")

// Importing and using functionality from external files is also possible.
importScripts('service-worker-utils.js')

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-urls",
    title: "Copy URLs from Highlighted Selection",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "copy-urls") {
    console.log("send request");
    var request = {
      greeting: "hello"
    };
    console.log(request)
    chrome.tabs.sendMessage(tab.id, request, function(response) {
      if (!chrome.runtime.lastError) {
        // if you have any response
        console.log('received response')
        console.log(response)
      } else {
        console.log('received lastError')
        console.log(chrome.runtime.lastError)
        // if you don't have any response it's ok but you should actually handle
        // it and we are doing this when we are examining chrome.runtime.lastError
      }
    });
  }
});