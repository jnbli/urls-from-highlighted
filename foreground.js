// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

// console.log("This prints to the console of the page (injected only if the page url matched)")


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");

    var selection = window.getSelection();
    if (!selection.isCollapsed) {
      var range = selection.getRangeAt(0);
      var selectionContents = range.cloneContents();
      var hrefs = [];
      function doSomethingToNode(node) { if (node.href != undefined ) {hrefs.push(node.href)} }
      function allDescendants (node) {node.childNodes.forEach(child => { allDescendants(child); doSomethingToNode(child); }); }
      allDescendants(selectionContents);
      hrefs = hrefs.filter((item, index) => hrefs.indexOf(item) === index);
      hrefs = hrefs.join("\n")
      // copy(hrefs)
      // console.log(hrefs)

      navigator.clipboard.writeText(hrefs).then(() => {
        //clipboard successfully set
        // console.log("clipboard successfully set");
      }, () => {
        //clipboard write failed, use fallback
        // console.log("clipboard write failed, use fallback");
      });
    }

    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
  }
);
