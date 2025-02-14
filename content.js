console.log("Email writer Extension - Content Script Loaded");


// resambling the exact gmail button
function createAIButton(){
   const button = document.createElement('div');
   button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
   button.style.marginRight = '8px';
   button.innerHTML = 'AI Reply'; // this is what user will see
   button.setAttribute('role','button');
   button.setAttribute('data-tooltip','Generate AI Reply');
   return button;

    }


function findComposeToolbar(){
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        'gU.Up'
    ];
    for (const selector in selectors) {
        const toolbar = document.querySelector(selector);
        if(toolbar){
            return toolbar;
        }
        return null;
            
    }
}


function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
   if(existingButton) existingButton.remove();

   const toolbar = findComposeToolbar();
   if(toolbar){
    console.log("Toolbar not found");
    return;
   }

   console.log("Toolbar found, creating AI button");
   const button = createAIButton();
   button.classList.add('.ai-reply-button');

   button.addEventListener('click', async () => {

   });

   toolbar.insertBefore(button, toolbar.firstChild);

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