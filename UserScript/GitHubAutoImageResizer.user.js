// ==UserScript==
// @name         GitHub Auto Image Resizer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto resize images in the active GitHub Markdown editor
// @author       Keisuke Kawhara (ktansai)
// @match        https://github.com/*
// @homepage     https://github.com/ktansai/GitHub-Image-Resizer
// ==/UserScript==

(function() {
  'use strict';

  const IMAGE_WIDTH = "30%";
  const INTERVAL_MS = 1000; // ms

  // Regularly check the focused text area
  function checkAndReplaceImagesInActiveTextArea() {
      const activeElement = document.activeElement;

      // Confirm that the focused element is a textarea
      if (activeElement && activeElement.tagName.toLowerCase() === 'textarea') {
          // Regular expression for conversion target (target image tags that do not have the data-converted attribute)
          const regex = /<img.*?"(http.*?)".*?>|!\[.*\]\((https.*?)\)/g;

          // Check converted images
          if (activeElement.value.includes('data-converted="true"')) {
              return; // Skip the process if it has already been converted
          }

          activeElement.value = activeElement.value.replace(regex, (match, p1, p2) => {
              const url = p1 || p2;
              return `<img width="${IMAGE_WIDTH}" src="${url}" data-converted="true" />`;
          });
      }
  }

  // Regularly check the contents of the currently focused text area
  setInterval(checkAndReplaceImagesInActiveTextArea, INTERVAL_MS);
})();