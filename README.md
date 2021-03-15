# log-enhancer-chrome-ext
Chrome extension to allow for special highlighting and filtering to make log parsing easier. 

## Core concepts
Chrome extensions use the terminology for "content" and "popup" in their documentation.  
* Content refers to the script that loads onto the page - this will be responsible for applying the styles on the log file.  
    * In the future this will have navigation controls 
* Popup refers to the small "popup" that shows when you click on the extension.  This is responsible for user defined regex to highlight or remove log lines. 

## Develop
* `npm run dev`
    * This will only render the popup HTML

## Build
* `npm run build`
    * This will build the assets for content and popup.  You can see how the manifest.json loads in the files. 

## Testing
You can load in a chrome extension locally to see your changes.  There is no automatic reload so you'll have to click "reload" to see your changes applied. 