console.log("Email writer Extension - Content Script Loaded");

function injectButton(){
    
}

const observer = new MutationObserver((mutations) => {                       //helping with call back wich help us itrate with the list of changes
  for(const mutation of mutations){                                         // addNode is property- we looping it, property that are added to the tom , in form of array
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(node =>
        node.nodeType === Node.ELEMENT_NODE && 
        (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))  /// checking with gmail compose windows selectors, 
    );

    if(hasComposeElements){    // if this condition is true, call injection button at half a second, allows Gmail interface to load completely
        console.log("Compose Window Detected");   
        setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {  // starts to observe entire body,
     // passing set of options
    childList: true,    // watches additional removal of child items
     subtree: true   // watches changes in all decendence not just direct children
});