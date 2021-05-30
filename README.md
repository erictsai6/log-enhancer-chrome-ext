# log-enhancer-chrome-ext
Chrome extension to allow for special highlighting and filtering to make log parsing easier. 

<img width="1159" alt="Screen Shot 2021-05-30 at 2 11 43 PM" src="https://user-images.githubusercontent.com/1450578/120115618-75a29380-c152-11eb-8674-4c3a2160304c.png">

## Core concepts
Chrome extensions use the terminology for "content" and "popup" in their documentation.  
* Content refers to the script that loads onto the page - this will be responsible for applying the styles on the log file.  
* Popup refers to the small "popup" that shows when you click on the extension.  This is responsible for user defined regex to highlight or remove log lines. 
* Background refers to the service worker that runs in the background and listens to a message from the popup to initialize the content script and proxy that message as well. 

## Develop
* `npm run dev`
    * This will only render the popup HTML

## Build
* `npm run build`
    * This will build the assets for content, background and popup.  Everything should be packaged in the dist/ folder

## Testing
You can load in a chrome extension locally to see your changes.  Please load the dist folder.  There is no automatic reload so you'll have to click "reload" to see your changes applied. 
