document.addEventListener('DOMContentLoaded', function() {
    var openBtn = document.getElementById('openBtn');
    openBtn.addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: 'openHackerNews' });
    });
  });
  