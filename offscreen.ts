// This script is loaded in the offscreen document to play audio.

chrome.runtime.onMessage.addListener((message) => {
  if (message.target === 'offscreen' && message.command === 'playSound') {
    const audio = new Audio(message.url);
    audio.play();
  }
});
