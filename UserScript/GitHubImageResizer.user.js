// ==UserScript==
// @name         GitHub Markdown Image Resizer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add menu command to resize images in the active GitHub Markdown editor
// @author       Keisuke Kawhara (ktansai)
// @match        https://github.com/*/*
// @grant        GM_registerMenuCommand
// @homepage     https://github.com/ktansai/GitHub-Image-Resizer
// ==/UserScript==

(function() {
    'use strict';

    // Change this value to resize images
    const IMAGE_WIDTH = "300";

    // Function: Get the currently focused textarea
    function getActiveTextArea() {
        const activeElement = document.activeElement;
        return activeElement && activeElement.tagName.toLowerCase() === 'textarea' ? activeElement : null;
    }

    // Function: Replace image URLs
    function replaceImageSize() {
        const textArea = getActiveTextArea();
        if (textArea) {
            const regex = /(?:<img.*?"(http.*?)">)|(?:!\[.*\]\((https.*?)\))/g;
            textArea.value = textArea.value.replace(regex, `<img width="${IMAGE_WIDTH}" src="$1$2" />`);
        } else {
            alert('Please focus on a textarea to resize images.');
        }
    }

    // Register the menu command
    GM_registerMenuCommand('Resize Images', replaceImageSize);
})();
