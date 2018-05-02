let magicButton = document.getElementById('magicButton');

magicButton.onclick = function (element) {
  chrome.tabs.executeScript({
    file: 'breakout.js'
  })
};